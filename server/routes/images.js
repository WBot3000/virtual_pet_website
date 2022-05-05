const express = require('express');
const router = express.Router();
const gm = require("gm");
const path = require("path");

//Convert write callback into promise to avoid callback hell
const addLayer = (img, newLayer, resultPath) => {
    return new Promise((resolve, reject) => {
        img.composite(newLayer).write(resultPath, err => {
            if(err) {
                return reject(err);
            }
            else {
                return resolve(img);
            }
        })
    })
}

async function createPetImage(base, layers, resultPath) {
    let image = gm(base);
    for(let layer of layers) {
        if(layer.substring(layer.length-8) != "null.png") { //Add layer if it isn't null 
            let dirLocation = __dirname.substring(0, __dirname.length-6)
            await addLayer(image, dirLocation + layer, resultPath);
            image = gm(resultPath);
        }
    }
}

//Route for getting pet images for display
router.get('/fetch/:userID/:petID', async (request, response) => {
    const {userID, petID} = request.params;
    if(!userID) {
        return response.status(400).json({message: "User ID not provided"});
    }
    if(!petID) {
        return response.status(400).json({message: "Pet ID not provided"});
    }
    if (!userID.match(/^[0-9a-z]+$/i)){
        return response.status(400).json({message : `Invalid user ID`});
    }
    if (!petID.match(/^[0-9a-z]+$/i)){
        return response.status(400).json({message : `Invalid pet ID`});
    }
    const petImgPath = `public/petImages/pet${userID}_${petID}.png`;
    response.sendFile(path.resolve(petImgPath));
});

router.put('/updateClothing/:userID/:petID', async (request, response) => {
    const {userID, petID} = request.params;
    if(!userID) {
        return response.status(400).json({message: "User ID not provided"});
    }
    if(!petID) {
        return response.status(400).json({message: "Pet ID not provided"});
    }
    if (!userID.match(/^[0-9a-z]+$/i)){
        return response.status(400).json({message : `Invalid user ID`});
    }
    if (!petID.match(/^[0-9a-z]+$/i)){
        return response.status(400).json({message : `Invalid pet ID`});
    }
    const {petObj} = request.body;
    if(!petObj) {
        return response.status(400).json({message: "New pet options not provided"});
    }
    //TODO: Check for pet's existence in the database?
    const layers = [`public/pieces/shirt/${petObj.shirt}.png`, 
    `public/pieces/pants/${petObj.pants}.png`, 
    `public/pieces/shoes/${petObj.shoes}.png`, 
    `public/pieces/face/${petObj.face}.png`, 
    `public/pieces/hat/${petObj.hat}.png`];
    const petImgPath = `public/petImages/pet${userID}_${petID}.png`;
    //let dirLocation = __dirname.substring(0, __dirname.length-5);
    await createPetImage(path.resolve(`public/pieces/species/${petObj.species}.png`), layers, path.resolve(petImgPath));
    return response.json({message: "Pet successfully updated"});
});

module.exports = router;