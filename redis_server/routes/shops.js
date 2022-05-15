const express = require('express');
const router = express.Router();

const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const xss = require('xss');


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const mongodb_DAL = require('../data/index');

//All Pets imported here
const pets = require('../pet_assets/allPets');
const allPets = pets.GetAllPets();

router.get('/allShops', async (req, res) => {
    let allShops = null;
    try {
        allShops = await mongodb_DAL.shops.getAllShops();
    } catch (error) {
        return res.status(404).json({ error: "Not Found" });
    }
    return res.status(200).json(allShops);
});

router.get('/getShop/:sid', async (req, res) => {
    const { sid } = req.params;
    //sid is alphanumeric
    if (!sid.match(/^[0-9a-z]+$/i)) {
        return res.status(400).json({ message: `Invalid sid` });
    }

    let shop = null;
    try {
        shop = await mongodb_DAL.shops.getShopById(sid);
    } catch (error) {
        return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json(shop);
});

router.post('/createShop', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: `Invalid payload` });
    }

    if (!req.body.name.toLowerCase().match(/^[a-z ]+$/i)) {
        return res.status(400).json({ message: `Invalid payload` });
    }

    let shop;
    try {
        shop=await mongodb_DAL.shops.createShop(xss(req.body.name));
    } catch (error) {
        return res.status(400).json({ message: `Could not add shop` });
    }


    return res.status(200).json(shop);
});

router.post('/addItem/:sid/:iid', async (req, res) => {
    const { sid, iid } = req.params;
    if (!sid.match(/^[0-9a-z]+$/i) || !iid.match(/^[0-9a-z]+$/i)) {
        return res.status(400).json({ message: `Invalid id` });
    }

    try {
        shop = await mongodb_DAL.shops.getShopById(sid);
    } catch (error) {
        return res.status(404).json({ error: "Not Found" });
    }

    if (!shop) {
        return res.status(404).json({ error: "Shop not Found" });
    }

    let updatedShop;
    try {
        updatedShop = await mongodb_DAL.shops.addStock(sid, iid);
    } catch (error) {
        return res.status(400).json({ message: `Could not add item` });
    }
    return res.status(200).json(updatedShop);
});

router.delete('/removeItem/:sid/:iid', async (req, res) => {
    const { sid, iid } = req.params;
    if (!sid.match(/^[0-9a-z]+$/i) || !iid.match(/^[0-9a-z]+$/i)) {
        return res.status(400).json({ message: `Invalid id` });
    }

    try {
        shop = await mongodb_DAL.shops.getShopById(sid);
    } catch (error) {
        return res.status(404).json({ error: "Not Found" });
    }

    if (!shop) {
        return res.status(404).json({ error: "Shop not Found" });
    }
    let inventory = null;
    shop.inventory.map((inventoryId) => {
        if (inventoryId == iid) {
            inventory = inventoryId;
        }
    });
    if (!inventory) {
        return res.status(404).json({ error: "Item not Found" });
    }

    let updatedShop;
    try{
        updatedShop=await mongodb_DAL.shops.deleteStock(sid,iid);
    }catch(error){
        return res.status(400).json({ message: `Could not remove item` });
    }
    return res.status(200).json(updatedShop);
});

router.get('/getShopItem/:sid/:iid',async(req,res)=>{
    const { sid, iid } = req.params;
    if (!sid.match(/^[0-9a-z]+$/i) || !iid.match(/^[0-9a-z]+$/i)) {
        return res.status(400).json({ message: `Invalid id` });
    }
    let item;
    try{
        item=await mongodb_DAL.shops.getShopItem(sid,iid);
    }catch(error){
        return res.status(404).json({ error: "Item not Found" });
    }
    return res.status(200).json(item);
});

module.exports=router;