const mongoCollections = require('../config/mongoCollections');
const items = mongoCollections.items;
const {ObjectId} = require('mongodb');
const validate = require("./validation");

async function getAllItems() {
    const itemCollection = await items();
    const allItems = await itemCollection.find({}).toArray();
  
    // Change all _id values to strings
    return allItems.map(validate.convertObjId);
}
  
async function getItemById(id) {
    if (!validate.validString(id)) throw({code: 400, message: "item id must be a valid string."});
    let objId = ObjectId(id.trim());
    const itemCollection = await items();
    const item = await itemCollection.findOne({ _id: objId });
  
    if (!item) {
        throw ({code: 404, message: `No item found with id=${id}.`});
    }
    // Convert _id field to string before returning
    return validate.convertObjId(item);
}

async function createItem(name, description, price, useCount, happinessChange, hungerChange, hygieneChange){
    if(arguments.length!=7) throw ({code :400, message:"createItem: Provide all details to create item"});
    if(!validate.validString(name)) throw({code: 400, message: "createItem: item name is not a valid string"});
    if(!validate.validString(description)) throw({code: 400, message: "createItem: item des is not a valid string"});

    if(isNaN(useCount)) throw({code: 400, message: "createItem: usecount is not a valid string"});
    if(isNaN(happinessChange)) throw({code: 400, message: "createItem: happinessChange is not a valid string"});
    if(isNaN(hungerChange)) throw({code: 400, message: "createItem: hungerChange is not a valid string"});
    if(isNaN(hygieneChange)) throw({code: 400, message: "createItem: hygieneChange is not a valid string"});

	const itemCollection = await items();

    const found = await itemCollection.findOne({name: name});

    if(found) {
        throw({code: 400, message: "createItem: item with that name already exists"});
    }
	
	let newItem = {
        name: name,
        description: description,
        price: price,
        useCount: useCount,
        happinessChange: happinessChange,
        hungerChange: hungerChange,
        hygieneChange: hygieneChange

	};
	
	const added = await itemCollection.insertOne(newItem);

	if(added.insertCount === 0) {
		throw({code: 500, message: "createItem: Could not add item."});
	}
	else{
        const id = added.insertedId.toString();
        return await getItemById(id);
	}
}

async function deleteItem(id){
    if (!validate.validString(id)) throw({code: 400, message: "deleteItem: id not valid string."});
    const item = await getItemById(id);
    
    const itemCollection = await items();
    id = ObjectId(id);
    const deletionInfo = await itemCollection.deleteOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
        throw ({code: 500, message: `Could not delete Product with id of ${id}`});
    }

    return item.id;
}

module.exports = {
    createItem,
    getItemById,
    getAllItems,
    deleteItem

}
