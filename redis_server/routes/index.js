const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const flat = require('flat');
const unflatten = flat.unflatten;
const axios = require('axios');
const fs = require('fs');
const path = require('path');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const constructorMethod = (app) => {
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

  app.get('/GetAllPetIds', async(req, res) => {
    const allIdKey = 'allPetIds'
    let allIds = await client.lrangeAsync(allIdKey,0,-1);

    if (allIds.length !== 0){
      return res.status(200).json(allIds);
    }

    //Else initialize list
    const directoryPath = path.join(__dirname, '../pet_assets');

    fs.readdir(directoryPath, async function (err, files) {
      for (file of files){
        await client.lpushAsync(allIdKey, file);
      }
      return res.status(200).json(files);
    });
  });
};

module.exports = constructorMethod;
