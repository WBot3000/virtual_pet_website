const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const mongodb_DAL = require('../data/index');

//All Pets imported here
const pets = require('../pet_assets/allPets');
const allPets = pets.GetAllPets();

router.get('/user/:uid', async(req, res) => {
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

router.get('/GetAllUsers', async(req, res) => {

  let users = null;
  try {
    users = await mongodb_DAL.users.getAllUsers();
  } catch (error) {
    return res.status(404).json({error: "Not Found"});
  }

  //Remove gid to protect from attackers
  users.map(e => delete e['gid']);

  return res.status(200).json(users);
});

router.get('/CheckIfDailyReward/:uid', async(req, res) => {
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
      try {
        await mongodb_DAL.users.changeMoney(uid, 100);
      } catch (error) {
        return res.status(400).json({error: "Failed to update money"});
      }
      
      await client.setAsync(key, Date());
      return res.status(200).json({reward: true, amount: 100});
    }

    return res.status(200).json({reward: false});
});

router.get('/GetAllUserPetIds/:uid', async(req, res) => {
    const {uid} = req.params;
    //uid is alphanumeric
    if (!uid.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid uid`});
    }

    let pets = null;

    try {
      pets = await mongodb_DAL.users.getAllPets(uid);
    } catch (error) {
      return res.status(404).json({error: "Not Found"});
    }
    
    return res.status(200).json(pets);
});

router.post('/OnGoogleLogin/:id/:displayName', async(req, res) => {
    const {id, displayName} = req.params;
    if (!id.match(/^[0-9a-z]+$/i) || !displayName.match(/^[ a-z]+$/i)){
      return res.status(400).json({message : `Invalid id`});
    }

    let user = null;
    try {
      user = await mongodb_DAL.users.getUserByGID(id);  
    } catch (error) {
      user = await mongodb_DAL.users.createUser(displayName, id);
    }

    //upate last signed in
    let data = null;
    try {
      data = await mongodb_DAL.users.lastSigned(id);
    } catch (error) {
      return res.status(404).json({error: "Failed to get last sign in"});
    }
    
    
    //put it in redis
    let key = `lastSigned${id}`
    await client.setAsync(key, data.prevSignIn);
    res.status(200).json({data});
});

router.get('/GetPetImage/:uid/:pid', async(req, res) => {
    const {uid, pid} = req.params;
    if (!uid.match(/^[0-9a-z]+$/i) || !pid.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid id`});
    }

    let pet = null;
    try {
      pet = await mongodb_DAL.users.getPet(uid, pid);
    } catch (error) {
      return res.status(404).json({error: "Not Found"});
    }

    let options = pet.options.sort();

    //image key is name + all options in sorted order
    const image_key = pet.petId+options.join('');
    let image = await client.getAsync(image_key);
    
    let petObj = allPets.find(e => {
      return e.GetId() === pet.petId;
    })
    //Check if image exists in redis
    //Create image and put it in redis if not
    if(!image){
      image = await petObj.CreateImageFromOptions(options);
      await client.setAsync(image_key, image);
    }
    
    return res.status(200).json({image});
});

router.get('/GetUserPet/:uid/:pid', async(req, res) => {
    const {uid, pid} = req.params;
    if (!uid.match(/^[0-9a-z]+$/i) || !pid.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid id`});
    }

    let pet = null;
    try {
      pet = await mongodb_DAL.users.getPet(uid, pid);
    } catch (error) {
      return res.status(404).json({error: "Not Found"});
    }
    
    return res.status(200).json(pet);
});

router.get('/GetUserItems/:uid', async(req, res) => {
  const {uid} = req.params;
  if (!uid.match(/^[0-9a-z]+$/i)){
    return res.status(400).json({message : `Invalid id`});
  }

  let items = null;
  try {
    items = await mongodb_DAL.users.getAllItems(uid);
  } catch (error) {
    return res.status(404).json({error: "Not Found"});
  }
  
  return res.status(200).json({items});
});

router.get('/GetUserItem/:uid/:iid', async(req, res) => {
  const {uid, iid} = req.params;
  if (!uid.match(/^[0-9a-z]+$/i)){
    return res.status(400).json({message : `Invalid id`});
  }

  let items = null;
  try {
    items = await mongodb_DAL.users.getItem(uid, iid);
  } catch (error) {
    return res.status(404).json({error: "Not Found"});
  }
  
  return res.status(200).json({items});
});

router.post('/useItem', async(req, res) => {
  const data = req.body;
  if(data.uid === null || data.iid === null || data.petName === null){
    return res.status(400).json({message : `Data cannot be null in request body`});
  }

  if (!data.uid.match(/^[0-9a-z]+$/i)){
    return res.status(400).json({message : `Invalid id`});
  }

  const used = null;
  try {
    used = await mongodb_DAL.users.useItem(data.uid, data.iid, data.petName);
    
  } catch (error) {
    return res.status(500).json({error: "Could not use item"});
  }
  
  return res.status(200).json({used});
});
  
router.patch('/AddToInv/:gid/:iid',async (req,res)=>{
  const {gid, iid} = req.params;
    if (!gid.match(/^[0-9a-z]+$/i) || !iid.match(/^[0-9a-z]+$/i)){
      return res.status(400).json({message : `Invalid id`});
    }
    try{
      const user=await mongodb_DAL.users.getUserByGID(gid);
      const item=await mongodb_DAL.items.getItemById(iid);
      if(user.money<item.price){
        return res.status(400).json({message:'Not enough money'});
      }else{
        await mongodb_DAL.users.addItemById(gid,iid);
        return res.status(200).json({userMoney:parseInt(user.money)-parseInt(item.price)});
      }      
    }catch(error){
      return res.status(400).json({message : `Unable to complete transaction`});
    }
});

router.patch('/AddPetBucks/:gid',async(req,res)=>{
  const gid=req.params.gid;
  if (!gid.match(/^[0-9a-z]+$/i)){
    return res.status(400).json({message : `Invalid id`});
  }
  try{
    await mongodb_DAL.users.changeMoney(gid,req.body.money);
  }catch(error){
    return res.status(400).json({message : `Unable to complete transaction`});
  }
});
module.exports = router;