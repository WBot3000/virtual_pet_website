const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const itemData = require("../data/items");
const {ObjectId} = require('mongodb');
const validate = require("./validation");

//nuke the collection
const removeAll = async function() {
	const usersCollection = await users();
	await usersCollection.deleteMany({ });
	return({code: 200, message: "removeAll: successfully deleted entire user database"});
}


//userfunctions

//get all the users
async function getAllUsers() {
    const userCollection = await users();
    const allUsers = await userCollection.find({}).toArray();
  
    // Change all _id values to strings
    return allUsers.map(validate.convertObjId);
}
  
//get the users by using the mongodb id/_id
async function getUserById(id) {
    if (!validate.validString(id)) throw({code: 400, message: "getUserById: User id must be a valid string."});
    let objId = ObjectId(id.trim());
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: objId });
  
    if (!user) {
        throw ({code: 404, message: `No user found with id=${id}.`});
    }
    // Convert _id field to string before returning
    return validate.convertObjId(user);
}

//create a user
async function createUser(username, googleid) {
	
    if(!validate.validString(username)) throw({code: 400, message: "createUser: Username is not a valid string"});
    if(!validate.validUsername(username)) throw({code: 400, message: "createUser: Username is not valid."});
    if(!validate.validString(googleid)) throw({code: 400, message: "createUser: gid is not a valid string"});

	const usersCollection = await users();

    const found = await usersCollection.findOne({gid: googleid});

    if(found) {
        throw({code: 400, message: "createUser: User with that google id already exists"});
    }
	
	let newUser = {
        gid: googleid,
		username: username,
        money: 90,
        pets: [],
        inventory: [],
        lastSigned: Date()
	};
	
	const added = await usersCollection.insertOne(newUser);

	if(added.insertCount === 0) {
		throw({code: 500, message: "createUser: Could not add user."});
	}
    else{
        const id = added.insertedId.toString();
        try{
            await addItemByName(googleid, "Sandwich");
            await addItemByName(googleid, "Ball");
            await addItemByName(googleid, "Soap");

        }catch(e){
            console.log(e);
        }
        return await getUserById(id);
    }
    
}

//gets the user by the google id
async function getUserByGID(gid){

    if (!validate.validString(gid)) throw({code: 400, message: "getUserByGID: User id must be a valid string."});

	const usersCollection = await users();

	const user = await usersCollection.findOne({gid: gid});

	if(!user) {
		throw({code: 404, message: `getUserByGID: No user found with gid=${gid}.`});
	}
	user._id = user._id.toString();
	return user;
	
}

//change the time of last sign in 
async function lastSigned(gid){
	if (!validate.validString(gid)) throw({code: 400, message: "lastSigned: Gid must be a valid string."});

	const usersCollection = await users();

	const user = await getUserByGID(gid);

    let currTime = Date();

	const updated = await usersCollection.updateOne({gid: gid}, {$set: {lastSigned: currTime}});
	if (updated === 0) {
		throw({code: 500, message: "lastSigned: unable to change money"});
	}
	else{
		let updatedUser = await getUserByGID(gid);
        let prevSignIn = user.lastSigned;
        return {updatedUser, prevSignIn};
	} 
}

//change the amount of money the user has. if subtracting please use a negative number
async function changeMoney(gid, difference){
	if (!validate.validString(gid)) throw({code: 400, message: "changeMoney: Gid must be a valid string."});
	if (!validate.validNum(difference)) throw({code: 400, message: "changeMoney: Difference is not a valid number."});

	const usersCollection = await users();

	const user = await getUserByGID(gid);

	let newBalance = user.money + difference;

	const updated = await usersCollection.updateOne({gid: gid}, {$set: {money: newBalance}});
	if (updated === 0) {
		throw({code: 500, message: "changeMoney: unable to change money"});
	}
	else{
		return newBalance;
	} 
}

//pet functions

//create a pet and push to user pet array
async function addPet(gid, petName, petId, options){//, color) {

	if (!validate.validString(gid)) throw({code: 400, message: "addPet: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "addPet: petname must be a valid string."});
    if (!validate.validString(petId)) throw({code: 400, message: "addPet: petId must be a valid string."});
    for (option of options) {
        if (!validate.validString(option)) throw({code: 400, message: "addPet: option must be a valid string."});
    }

	const usersCollection = await users();

	const user = await getUserByGID(gid);

    let foundPet = false;
    for(i = 0; i < user.pets.length; i++){
        if (user.pets[i].petName == petName) {
            foundPet = true;
        }
    }

    if(foundPet){
        throw({code: 400, message: "addPet: A pet with that name already exists"});
    }

	newPet = {
		petName: petName,
        petId: petId,
        options: options,
        clothing:
            {
                hat: "",
                shirt: "",
                face: "",
                pants: "",
                shoes: "",
            },
        dateLastFed: Date(),
        dateLastCleaned: Date(),
        dateLastPet: Date(),
        hunger: 100,
        happiness: 100,
        hygiene: 100
	};

	const added = await usersCollection.updateOne({gid: gid}, {$push: {pets: newPet }});
	if (added === 0) {
		throw({code: 500, message: "addPet: unable to add pet to user"});
	}
	else{
		return await getUserByGID(gid);
	}
}

//find a pet in the user obj using the pet name
async function getPet(gid, petName){
    if (!validate.validString(gid)) throw({code: 400, message: "addPet: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "addPet: petname must be a valid string."});

	const user = await getUserByGID(gid);

    let foundPet = false;
    for(i = 0; i < user.pets.length; i++){
        if (user.pets[i].petName == petName) {
            foundPet = true;
            return user.pets[i];
        }
    }
    if(!foundPet){
        throw({code: 404, message: "getPet: pet not found"});
    }

}

async function getAllPets(gid) {
    if (!validate.validString(gid)) throw({code: 400, message: "addPet: gid must be a valid string."});

	const user = await getUserByGID(gid);

    return user.pets;
}

//change the happiness level of pet belonging to user with gid
async function changeHappiness(gid, petName, difference) {
    if (!validate.validString(gid)) throw({code: 400, message: "changeHappinesst: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeHappiness: petname must be a valid string."});
    if (!validate.validNum(difference)) throw({code: 400, message: "changeHappiness: Difference is not a valid number."});

    //check if exists
    const user = await getUserByGID(gid);
    const pet = await getPet(gid, petName);

    let index = -1;
    for(i = 0; i < user.pets.length; i++){
        if (user.pets[i].petName === petName) {
            index = i;
        }
    }

    let newBalance = user.pets[index].happiness + difference;
    if(newBalance > 100){
        newBalance = 100;
    }
    else if(newBalance < 0){
        newBalance = 0;
    }

    const usersCollection = await users();
	const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].happiness" :newBalance}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeHappiness: unable to change happiness"});
	}
	else{
		return await getPet(gid, petName);
	} 

}

//change the hunger level of pet belonging to user with gid
async function changeHunger(gid, petName, difference) {
    if (!validate.validString(gid)) throw({code: 400, message: "changeHunger: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeHunger: petname must be a valid string."});
    if (!validate.validNum(difference)) throw({code: 400, message: "changeHunger: Difference is not a valid number."});

    //check if exists
    const user = await getUserByGID(gid);
    const pet = await getPet(gid, petName);

    let index = -1;
    for(i = 0; i < user.pets.length; i++){
        if (user.pets[i].petName === petName) {
            index = i;
        }
    }

    let newBalance = user.pets[index].hunger + difference;
    if(newBalance > 100){
        newBalance = 100;
    }
    else if(newBalance < 0){
        newBalance = 0;
    }

    const usersCollection = await users();
	const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].hunger" :newBalance}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeHunger: unable to change hunger"});
	}
	else{
		return await getPet(gid, petName);
	}
}

//change the hygiene level of pet belonging to user with gid
async function changeHygiene(gid, petName, difference) {
    if (!validate.validString(gid)) throw({code: 400, message: "changeHygiene: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeHygiene: petname must be a valid string."});
    if (!validate.validNum(difference)) throw({code: 400, message: "changeHygiene: Difference is not a valid number."});

    //check if exists
    const user = await getUserByGID(gid);
    const pet = await getPet(gid, petName);

    let index = -1;
    for(i = 0; i < user.pets.length; i++){
        if (user.pets[i].petName === petName) {
            index = i;
        }
    }

    let newBalance = user.pets[index].hygiene + difference;
    if(newBalance > 100){
        newBalance = 100;
    }
    else if(newBalance < 0){
        newBalance = 0;
    }

    const usersCollection = await users();
	const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].hygiene" :newBalance}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeHygiene: unable to change hygiene"});
	}
	else{
		return await getPet(gid, petName);
	}
}

//pet clothing functions
async function changeHat(gid, petName, img){
    if (!validate.validString(gid)) throw({code: 400, message: "changeClothing: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeClothing: petname must be a valid string."});
    if (!validate.validString(img)) throw({code: 400, message: "changeClothing: img must be a valid string."});

    const pet = await getPet(gid, petName);

    const usersCollection = await users();
    const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].clothing.hat": img}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeClothing: unable to change clothing"});
	}
	else{
		return await getPet(gid, petName);
	} 

}
async function changeFace(gid, petName, img){
    if (!validate.validString(gid)) throw({code: 400, message: "changeClothing: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeClothing: petname must be a valid string."});
    if (!validate.validString(img)) throw({code: 400, message: "changeClothing: img must be a valid string."});

    const pet = await getPet(gid, petName);

    const usersCollection = await users();
    const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].clothing.face": img}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeClothing: unable to change clothing"});
	}
	else{
		return await getPet(gid, petName);
	} 

}

async function changeShirt(gid, petName, img){
    if (!validate.validString(gid)) throw({code: 400, message: "changeClothing: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeClothing: petname must be a valid string."});
    if (!validate.validString(img)) throw({code: 400, message: "changeClothing: img must be a valid string."});

    const pet = await getPet(gid, petName);

    const usersCollection = await users();
    const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].clothing.shirt": img}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeClothing: unable to change clothing"});
	}
	else{
		return await getPet(gid, petName);
	} 

}

async function changePants(gid, petName, img){
    if (!validate.validString(gid)) throw({code: 400, message: "changeClothing: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeClothing: petname must be a valid string."});
    if (!validate.validString(img)) throw({code: 400, message: "changeClothing: img must be a valid string."});

    const pet = await getPet(gid, petName);

    const usersCollection = await users();
    const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].clothing.pants": img}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeClothing: unable to change clothing"});
	}
	else{
		return await getPet(gid, petName);
	} 

}

async function changeShoes(gid, petName, img){
    if (!validate.validString(gid)) throw({code: 400, message: "changeClothing: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "changeClothing: petname must be a valid string."});
    if (!validate.validString(img)) throw({code: 400, message: "changeClothing: img must be a valid string."});

    const pet = await getPet(gid, petName);

    const usersCollection = await users();
    const updated = await usersCollection.updateOne({gid: gid}, {$set: {"pets.$[elem].clothing.shoes": img}}, {arrayFilters:[ {"elem.petName": petName}]});
	if (updated === 0) {
		throw({code: 500, message: "changeClothing: unable to change clothing"});
	}
	else{
		return await getPet(gid, petName);
	} 

}

//inventory functions

//delete item from user inventory
async function deleteItem(gid, iid){
    if (!validate.validString(gid)) throw({code: 400, message: "deleteItem: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "deleteItem: item id must be a valid string."});

    const user = await getUserByGID(gid);
  
    const usersCollection = await users();
    const updatedInfo = await usersCollection.updateOne(
      { gid: gid },
      { $pull: { inventory: {itemId: iid}}}
    );
    if (updatedInfo.modifiedCount === 0) {
      throw ({code: 500, message: "deleteItem: could not delete item"});
    }
}

//adds item to user inventory with use count and subtracts item price from user wallet
async function addItemById(gid, iid){
    if (!validate.validString(gid)) throw({code: 400, message: "addItemById: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "addItemById: item id must be a valid string."});

    const user = await getUserByGID(gid);
    const item = await itemData.getItemById(iid);
    const uses = item.useCount;
    const price = item.price*-1;

    changeMoney(gid, price);
  
    const usersCollection = await users();
    const updatedInfo = await usersCollection.updateOne(
      { gid: gid },
      { $push: { inventory: {itemId:iid, useCount: uses} }}
    );
    if (updatedInfo.modifiedCount === 0) {
      throw ({code: 500, message: "addItemById: could not add item"});
    }

}

//adds item to user inventory with use count and subtracts item price from user wallet
async function addItemByName(gid, name){
    if (!validate.validString(gid)) throw({code: 400, message: "addItemByName: gid must be a valid string."});
    if (!validate.validString(name)) throw({code: 400, message: "addItemByName: item id must be a valid string."});

    const user = await getUserByGID(gid);
    const item = await itemData.getItemByName(name);
    const uses = item.useCount;
    const price = item.price*-1;

    changeMoney(gid, price);
  
    const usersCollection = await users();
    const updatedInfo = await usersCollection.updateOne(
      { gid: gid },
      { $push: { inventory: {itemId:item._id, useCount: uses} }}
    );
    if (updatedInfo.modifiedCount === 0) {
      throw ({code: 500, message: "addItemByName: could not add item"});
    }

}

//get the item from user inventory
async function getItem(gid, iid){
    if (!validate.validString(gid)) throw({code: 400, message: "getItem: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "getItem: item id must be a valid string."});

    const user = await getUserByGID(gid);

    let foundItem = false;
    console.log(user.inventory);
    for(i = 0; i < user.inventory.length; i++){
        if (user.inventory[i].itemId === iid) {
            foundItem = true;
            console.log(user.inventory[i]);
            return user.inventory[i];
        }
    }
    if(!foundItem){
        throw({code: 404, message: "getItem: item not found"});
    }

}

//get all the items in inventory
async function getAllItems(gid){
    if (!validate.validString(gid)) throw({code: 400, message: "addPet: gid must be a valid string."});

	const user = await getUserByGID(gid);

    return user.inventory;

}

//update the use count of the item
async function updateUses(gid, iid, diff){
    if (!validate.validString(gid)) throw({code: 400, message: "updateUses: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "updateUses: item id must be a valid string."});

    if (!validate.validNum(diff)) throw({code: 400, message: "updateUses: diff must be a valid int."});

    const user = await getUserByGID(gid);
    const item = await getItem(gid, iid);

    let index = -1;
    for(i = 0; i < user.inventory.length; i++){
        if (user.inventory[i].itemId == iid) {
            index = i;
        }
    }
    let count = user.inventory[index].useCount + diff;

    
    const usersCollection = await users();
    const updated = await usersCollection.updateOne({gid: gid}, {$set: {"inventory.$[elem].useCount": count}}, {arrayFilters:[ {"elem.itemId": iid}]});
	if (updated === 0) {
		throw({code: 500, message: "updateUses: unable to change uses"});
	}
	else{
		return await getItem(gid, iid);
	} 

}

//uses the item, changing pet stats and item use count
async function useItem(gid, iid, petName) {
    if (!validate.validString(gid)) throw({code: 400, message: "useItem: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "useItem: item id must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "useItem: petName id must be a valid string."});

    const user = await getUserByGID(gid);
    const pet = await getPet(gid, petName);
    const item = await getItem(gid, iid);

    const itemInfo = await itemData.getItemById(iid);
    const updated = await updateUses(gid, iid, -1);

    if(updated.useCount === 0){
        deleteItem(gid, iid);
    }

    const hap = itemInfo.happinessChange;
    changeHappiness(gid, petName, hap);
    const hun = itemInfo.hungerChange;
    changeHunger(gid, petName, hun);
    const hyg = itemInfo.hygieneChange;
    changeHygiene(gid, petName, hyg);

    return await getUserByGID(gid);
    
}


module.exports = {
	getUserByGID,
	createUser,
	getUserById,
	getAllUsers,
    lastSigned,
	changeMoney,
    addPet,
    getAllPets,
    getPet,
    changeHappiness,
    changeHunger,
    changeHygiene,
    changeHat,
    changeShirt,
    changeFace,
    changePants,
    changeShoes,
    deleteItem,
    addItemById,
    addItemByName,
    getItem,
    getAllItems,
    useItem,
    updateUses
}