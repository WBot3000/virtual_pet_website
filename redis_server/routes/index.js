const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const flat = require('flat');
const unflatten = flat.unflatten;
const axios = require('axios');


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//All Pets imported here
const lilcat = require('../pet_assets/lilcat/pet');
const bigdog = require('../pet_assets/bigdog/pet');
const allPets = [lilcat, bigdog];

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

  app.get('/GetPetImage/:id', async(req, res) => {
    const {id} = req.params;
    let pet = allPets.find(e => {
      return e.GetId() === id;
    })
    //uid is alphanumeric
    if (!id.match(/^[0-9a-z]+$/i) || !pet){
      return res.status(400).json({message : `Invalid id`});
    }

    let base64 = pet.GetImageBase64();
    res.status(200).json({base64});
  });

  app.get('/GetAllData/:id', async(req, res) => {
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

  app.get('/GetAllPetIds', async(req, res) => {
    
    let allPetIds = allPets.map(e => {
      return e.GetId();
    });
    
    return res.status(200).json(allPetIds);
  });
};

module.exports = constructorMethod;
