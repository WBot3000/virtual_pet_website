const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const flat = require('flat');
const unflatten = flat.unflatten;
const axios = require('axios');
const xss = require('xss');


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const mongodb_DAL = require('../data/index');
//All Pets imported here
const lilcat = require('../pet_assets/lilcat/pet');
const bigdog = require('../pet_assets/bigdog/pet');
const { lastSigned } = require('../data/users');
const allPets = [lilcat, bigdog];

const constructorMethod = (app) => {
  app.get('/user/:uid', async(req, res) => {
    const {uid} = req.params;
    //uid is alphanumeric
    if (!uid.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid uid`});
    }

    let user = null;
    try {
      user = await mongodb_DAL.users.getUserByGID(uid);
    } catch (error) {
      return res.status(404).json({error: "Not Found"});
    }

    return res.status(200).json(user);
  });

  app.get('/CheckIfDailyReward/:uid', async(req, res) => {
    const {uid} = req.params;
    //uid is alphanumeric
    if (!uid.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid uid`});
    }

    let key = `lastSigned${uid}`
    let lastSigin = null;
    try {
      lastSigin = await client.getAsync(key);
    } catch (error) {
      return res.status(404).json({error: "Not Found"});
    }

    if (!lastSigin) return res.status(404).json({error: "Not Found"});

    let now = new Date();
    lastSigin = new Date(lastSigin);
    let differenceInDays = Math.floor((now - lastSigin) / (1000*60*60*24));
    let differenceInMinutes = Math.floor((now - lastSigin) / (1000*60));

    //use difference in seconds to test
    if (differenceInMinutes >= 1){
      await mongodb_DAL.users.changeMoney(uid, 100);
      await client.setAsync(key, Date());
      return res.status(200).json({reward: true, amount: 100});
    }

    return res.status(200).json({reward: false});
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

  app.post('/OnGoogleLogin/:id', async(req, res) => {
    const {id} = req.params;
    if (!id.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid id`});
    }

    let user = null;
    try {
      let user = await mongodb_DAL.users.getUserByGID(id);  
    } catch (error) {
      user = await mongodb_DAL.users.createUser(id, id);
    }

    //upate last signed in
    let data = await mongodb_DAL.users.lastSigned(id);
    
    //put it in redis
    let key = `lastSigned${id}`
    await client.setAsync(key, data.prevSignIn);
    res.status(200).json({data});
  });

  app.post('/CreatePet', async(req, res) => {
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
    //Check if image exists in redis
    //Create image and put it in redis if not
    if(!image){
      image = pet.CreateImageFromOptions(options);
      await client.setAsync(image_key, image);
    }
    

    //Add animal to user profile in mongodb
    await mongodb_DAL.users.addPet(user, xss(name), petId, options);
    
    //Reroute user to their new page
    return res.status(200).json(name);
  });
};

module.exports = constructorMethod;
