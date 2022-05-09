const mongoCollections = require('../config/mongoCollections');
const shops = mongoCollections.shops;
const itemData = require("../data/items");
const {ObjectId} = require('mongodb');
const validate = require("./validation");

async function getAllShops() {
    const shopCollection = await shops();
    const allShops = await shopCollection.find({}).toArray();
  
    // Change all _id values to strings
    return allShops.map(validate.convertObjId);
}
  
async function getShopById(id) {
    if (!validate.validString(id)) throw({code: 400, message: "getshopById: shop id must be a valid string."});
    let objId = ObjectId(id.trim());
    const shopCollection = await shops();
    const shop = await shopCollection.findOne({ _id: objId });
  
    if (!shop) {
        throw ({code: 404, message: `No shop found with id=${id}.`});
    }
    // Convert _id field to string before returning
    return validate.convertObjId(shop);
}

async function createShop(name){
    if(!validate.validString(name)) throw({code: 400, message: "createShop: shop name is not a valid string"});

	const shopCollection = await shops();

    const found = await shopCollection.findOne({name: name});

    if(found) {
        throw({code: 400, message: "createshop: shop with that name already exists"});
    }
	
	let newshop = {
        name: name,
        inventory: []
	};
	
	const added = await shopCollection.insertOne(newshop);

	if(added.insertCount === 0) {
		throw({code: 500, message: "createshop: Could not add user."});
	}
	else{
        const id = added.insertedId.toString();
        return await getshopById(id);
	}
}

async function addStock(shopId, itemId){
    if (!validate.validString(shopId)) throw({code: 400, message: "addStock: shop id must be a valid string."});
    if (!validate.validString(itemId)) throw({code: 400, message: "addStock: item id must be a valid string."});

    const shop = getShopById(shopId);
    const item = itemData.getItemById(itemId);

    let sid = ObjectId(shopId.trim());

    const shopCollection = await shops();
    const added = await shopCollection.updateOne({_id: sid}, {$push: {inventory: itemId }});
	if (added === 0) {
		throw({code: 500, message: "addStock: unable to add item to shop"});
	}
	else{
		return await getShopById(shopId);
	}

}

async function deleteStock(shopId, itemId){
    if (!validate.validString(shopId)) throw({code: 400, message: "deleteStock: shop id must be a valid string."});
    if (!validate.validString(itemId)) throw({code: 400, message: "deleteStock: item id must be a valid string."});

    const shop = getShopById(shopId);
    const item = itemData.getItemById(itemId);

    let sid = ObjectId(shopId.trim());

    const shopCollection = await shops();
    const deleted = await shopCollection.updateOne({_id: sid}, {$pull: {inventory: itemId }});
	if (deleted === 0) {
		throw({code: 500, message: "deleteStock: unable to remove item from shop"});
	}
	else{
		return await getShopById(shopId);
	}

}

module.exports = {
    getAllShops,
    getShopById,
    createShop,
    addStock,
    deleteStock
}

