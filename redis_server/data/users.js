const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const itemData = require("../data/items");
const {ObjectId} = require('mongodb');
const validate = require("./validation");

const removeAll = async function() {
	const usersCollection = await users();
	await usersCollection.deleteMany({ });
	return({code: 200, message: "removeAll: successfully deleted entire user database"});
}


//userfunctions

async function getAllUsers() {
    const userCollection = await users();
    const allUsers = await userCollection.find({}).toArray();
  
    // Change all _id values to strings
    return allUsers.map(validate.convertObjId);
}
  
async function getUserById(id) {
    if (!validate.validString(id)) throw({code: 400, message: "User id must be a valid string."});
    let objId = ObjectId(id.trim());
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: objId });
  
    if (!user) {
        throw ({code: 404, message: `No user found with id=${id}.`});
    }
    // Convert _id field to string before returning
    return validate.convertObjId(user);
}

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
        money: 50,
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
        return await getUserById(id);
	}
}

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

async function lastSigned(gid){
	if (!validate.validString(gid)) throw({code: 400, message: "lastSigned: Gid must be a valid string."});

	const usersCollection = await users();

	const user = await getUserByGID(gid);

	const updated = await usersCollection.updateOne({gid: gid}, {$set: {lastSigned: Date()}});
	if (updated === 0) {
		throw({code: 500, message: "lastSigned: unable to change money"});
	}
	else{
		return await getUserByGID(gid);
	} 
}

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

async function addPet(gid, petName, species) {//, color) {

	if (!validate.validString(gid)) throw({code: 400, message: "addPet: gid must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "addPet: petname must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "addPet: species must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "addPet: color must be a valid string."});

    if(!validate.validUsername(petName)) throw({code: 400, message: "addPet: petName is not valid."});

	const usersCollection = await users();

	const user = await getUserByGID(gid);

    let foundPet = false;
    for(i = 0; i < user.pets.length; i++){
        if (user.pet[i].petName == petName) {
            foundPet = true;
        }
    }

    if(foundPet){
        throw({code: 400, message: "addPet: A pet with that name already exists"});
    }

	newPet = {
		petName: petName,
        species: species,
        //color: color,
        clothing:
            {
                hat: "",
                shirt: "",
                face: "",
                pants: "",
                shoes: "",
            },
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

async function deleteItem(gid, iid){
    if (!validate.validString(gid)) throw({code: 400, message: "addItem: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "addItem: item id must be a valid string."});

    const user = await getUserByGID(gid);
  
    const usersCollection = await users();
    const updatedInfo = await usersCollection.updateOne(
      { gid: gid },
      { $pull: { inventory: {itemId: iid}}}
    );
    if (updatedInfo.modifiedCount === 0) {
      throw ({code: 500, message: "addItem: could not add item"});
    }
}
async function addItem(gid, iid){
    if (!validate.validString(gid)) throw({code: 400, message: "addItem: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "addItem: item id must be a valid string."});

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
      throw ({code: 500, message: "addItem: could not add item"});
    }

}
async function getItem(gid, iid){

    if (!validate.validString(gid)) throw({code: 400, message: "getItem: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "getItem: item id must be a valid string."});

    const user = await getUserByGID(gid);

    let foundItem = false;
    for(i = 0; i < user.inventory.length; i++){
        if (user.inventory[i].itemId == iid) {
            foundItem = true;
            return user.inventory[i];
        }
    }
    if(!foundItem){
        throw({code: 404, message: "getItem: item not found"});
    }

}

async function getAllItems(gid){
    if (!validate.validString(gid)) throw({code: 400, message: "addPet: gid must be a valid string."});

	const user = await getUserByGID(gid);

    return user.inventory;

}

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

async function useItem(gid, iid, petName) {
    if (!validate.validString(gid)) throw({code: 400, message: "useItem: gid must be a valid string."});
    if (!validate.validString(iid)) throw({code: 400, message: "useItem: item id must be a valid string."});
    if (!validate.validString(petName)) throw({code: 400, message: "useItem: petName id must be a valid string."});

    const user = await getUserByGID(gid);
    const pet = await getPet(gid, petName);
    const item = await getItem(gid, iid);

    const itemInfo = await itemData.getItemById(iid);
    const updated = updateUses(gid, iid, -1);

    if(updated.useCount <= 0){
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
    addItem,
    getItem,
    getAllItems,
    useItem,
    updateUses
}