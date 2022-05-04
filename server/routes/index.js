const images = require("./images");
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const flat = require('flat');
const unflatten = flat.unflatten;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const constructorMethod = (app) => {
    app.use("/images", images);
    
    app.get('/user/:uid', async(req, res) => {
        const {uid} = req.params;
        //uid is alphanumeric
        if (!uid.match(/^[0-9a-z]+$/i)){
        return res.status(400).json({message : `Invalid uid`});
        }

        //Check redis
        let user = await client.getAsync(`user${uid}`);
        if(user){
        return res.status(200).json(unflatten(JSON.parse(user)));
        }

        //Initialize user if not found
        let newUser = {uid, pet: null, money: 100, lastLoginTime: -1, inventory: []}
        await client.setAsync(`user${uid}`, JSON.stringify(flat(newUser)))

        return res.status(200).json(newUser);
    });
};

module.exports = constructorMethod;
