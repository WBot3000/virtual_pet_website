const mongoCollections = require('../config/mongoCollections');
const shops = mongoCollections.shops;
const {ObjectId} = require('mongodb');
const validate = require("./validation");

async function getAllShops() {
    const shopCollection = await shops();
    const allShops = await shopCollection.find({}).toArray();
  
    // Change all _id values to strings
    return allShops.map(validate.convertObjId);
}
  
async function getshopById(id) {
    if (!validate.validString(id)) throw({code: 400, message: "shop id must be a valid string."});
    let objId = ObjectId(id.trim());
    const shopCollection = await shops();
    const shop = await shopCollection.findOne({ _id: objId });
  
    if (!shop) {
        throw ({code: 404, message: `No shop found with id=${id}.`});
    }
    // Convert _id field to string before returning
    return validate.convertObjId(shop);
}

async function createShop(name, ){
    if(!validate.validString(name)) throw({code: 400, message: "createshop: shop name is not a valid string"});
    if(!validate.validString(description)) throw({code: 400, message: "createshop: shop des is not a valid string"});

    if(!validate.validNum(useCount)) throw({code: 400, message: "createshop: usecount is not a valid string"});
    if(!validate.validNum(happinessChange)) throw({code: 400, message: "createshop: happinessChange is not a valid string"});
    if(!validate.validNum(hungerChange)) throw({code: 400, message: "createshop: hungerChange is not a valid string"});
    if(!validate.validNum(hygieneChange)) throw({code: 400, message: "createshop: hygieneChange is not a valid string"});

	const shopCollection = await Shops();

    const found = await shopCollection.findOne({name: name});

    if(found) {
        throw({code: 400, message: "createshop: shop with that name already exists"});
    }
	
	let newshop = {
        name: name,
        description: description,
        useCount: useCount,
        happinessChange: happinessChange,
        hungerChange: hungerChange,
        hygieneChange: hygieneChange

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