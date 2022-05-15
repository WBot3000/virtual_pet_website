const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const xss = require('xss');
const fs = require('fs');
const path = require('path');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var wkhtmltopdf = require('wkhtmltopdf');

const mongodb_DAL = require('../data/index');

//All Pets imported here
const pets = require('../pet_assets/allPets');
const allPets = pets.GetAllPets();

router.get('/GetPetImage/:id', async(req, res) => {
    const {id} = req.params;
    let pet = allPets.find(e => {
        return e.GetId() === id;
    })
    //uid is alphanumeric
    if (!id.match(/^[0-9a-z]+$/i) || !pet){
        return res.status(400).json({message : `Invalid id`});
    }

    const image_key = id
    let image = await client.getAsync(image_key);

    //Check if image exists in redis
    //Create image and put it in redis if not
    if(!image){
        image = pet.GetImageBase64();
        await client.setAsync(image_key, image);
    }
    res.status(200).json({image});
});

router.get('/GetAllData/:id', async(req, res) => {
    const {id} = req.params;
    let pet = allPets.find(e => {
      return e.GetId() === id;
    })
    //uid is alphanumeric
    if (!id.match(/^[0-9a-z]+$/i) || !pet){
      return res.status(400).json({message : `Invalid id`});
    }

    let allData = pet.GetAllData();
    res.status(200).json({allData});
});

router.get('/GetAllPetIds', async(req, res) => {
    
    let allPetIds = allPets.map(e => {
      return e.GetId();
    });
    
    return res.status(200).json(allPetIds);
});

router.post('/CreatePet', async(req, res) => {
    if (!req.body.name || !req.body.user || !req.body.options){
      return res.status(400).json({message : `Invalid payload`});
    }

    if (!req.body.name.toLowerCase().match(/^[a-z]+$/i) || !req.body.user.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid payload`});
    }

    console.log(req.body)
    let {name, user, options, petId} = req.body;

    options.sort();

    //image key is name + all options in sorted order
    const image_key = petId+options.join('');
    let image = await client.getAsync(image_key);
    
    let pet = allPets.find(e => {
      return e.GetId() === petId;
    })

    //Validate the options
    let validOptions = pet.GetCustomizableOptions();

    for (option of req.body.options) {
      const found = validOptions.find(e => {
        return e.id === option;
      });

      if (!found) return res.status(400).json({error: "Invalid custom option"});
    }
    
    //Check if image exists in redis
    //Create image and put it in redis if not
    if(!image){
      try {
        image = await pet.CreateImageFromOptions(options);
      } catch (error) {
        return res.status(400).json({error: "Image creation failed"});
      }
      
      await client.setAsync(image_key, image);
    }
    

    //Add animal to user profile in mongodb
    try {
      await mongodb_DAL.users.addPet(user, xss(name), petId, options);
    } catch (error) {
      return res.status(400).json({error: "You already have a pet with that name!"});
    }
    
    return res.status(200).json(name);
});

router.post('/GetAnimalPdf', async(req, res) => {
  if (!req.body.data){
    return res.status(400).json({message : `Invalid payload`});
  }
  let petData = req.body.data;
  wkhtmltopdf(`<div>
  <h1>Your Pet: ${petData.petData.petName} | Happiness:${petData.petData.happiness} | Hunger:${petData.petData.hunger} | Hygiene:${petData.petData.hygiene}</h1>
  <img src="${petData.img}" alt="pet" />
  </div>`, { output: 'out.pdf' });

  const directoryPath = path.join(__dirname, `../out.pdf`);
  let bitmap = fs.readFileSync(directoryPath);
  let buf = Buffer(bitmap).toString('base64');
  res.send(buf);
});

module.exports = router;