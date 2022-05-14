const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const items = data.items;
const shops = data.shops;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  try {
    // await users.createUser("belle", "123");
    // await users.createUser("kai", "321");
    // await users.changeMoney("123", 50);
    // await users.addPet("123", "kuro", "dog", "black");
    // await users.changeHappiness("123", "kuro", -20);
    // await users.changeHunger("123", "kuro", -20);
    // await users.changeHygiene("123", "kuro", -20);
    // await users.changeHat("123", "kuro", "hat");

    // const item = await items.createItem("milk", "milk", 20, 1, 10, 10, 10);
    // await items.createItem("Sandwich", "A simple meal between bread.", 10, 1, 30, 10, -3);
    // await items.createItem("Soap", "A bar of soap. Its good for bubbles and cleanliness.", 10, 5, 10, 0, 30);
    // await items.getItemById(item._id);
    // await users.addItem("123", item._id);
    // await users.addItem("123", item._id);

    //const test = await users.updateUses("123", item._id, -1);
    // await users.useItem("123", item._id, "kuro");

    const gameShop = await shops.createShop("GamesShop");
    const groomingStore = await shops.createShop("GroomingStore");
    const supermarket = await shops.createShop("Supermarket");
    const bathbomb=await items.createItem("Bathbomb", "Bath Bomb", 10, 10, 0, 0, 10);
    await shops.addStock(groomingStore._id, bathbomb._id);
    const ball=await items.createItem("Ball", "It's blue and its fun!", 20, 10, 30, -5, -5);
    await shops.addStock(gameShop._id, ball._id);
    const box=await items.createItem("Box", "Box of endless possibilities", 10, 10, 20, 0, 0);
    await shops.addStock(gameShop._id, box._id);
    const bubbles=await items.createItem("Bubbles", "bubbles", 10, 10, 0, 0, 10);
    await shops.addStock(groomingStore._id, bubbles._id);
    const comb=await items.createItem("Comb", "comb", 10, 10, 0, 0, 10);
    await shops.addStock(groomingStore._id, comb._id);
    const lollipop=await items.createItem("Lollipop", "lollipop", 5, 1, 0, -3, 0);
    await shops.addStock(supermarket._id, lollipop._id);
    const pawfume=await items.createItem("Pawfume", "Pawfume", 10, 10, 0, 0, 20);
    await shops.addStock(groomingStore._id, pawfume._id);
    const pizza=await items.createItem("Pizza", "Pizza", 20, 1, 0, -10, 0);
    await shops.addStock(supermarket._id, pizza._id);
    const sandwich=await items.createItem("Sandwich", "Sandwich", 10, 1, 0, -5, 0);
    await shops.addStock(supermarket._id, sandwich._id);
    console.log("seeding done");

  } catch (e) {
    console.log(e);
  }

}

main();