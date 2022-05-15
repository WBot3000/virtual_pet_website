const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const mongodb_DAL = require('../data/index');

router.get('/item/:iid', async(req, res) => {
    const {iid} = req.params;
    //uid is alphanumeric
    if (!iid.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid uid`});
    }

    let item = null;
    try {
      item = await mongodb_DAL.items.getItemById(iid);
    } catch (error) {
      return res.status(404).json({error: "Not Found"});
    }

    return res.status(200).json(item);
});

module.exports = router;