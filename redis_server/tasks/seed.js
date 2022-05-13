const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const items = data.items;
const shops = data.shops;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  try {
    await users.createUser("belle", "123");
    await users.createUser("kai", "321");
    await users.changeMoney("123", 50);
    await users.addPet("123", "kuro", "dog", "black");
    await users.changeHappiness("123", "kuro", -20);
    await users.changeHunger("123", "kuro", -20);
    await users.changeHygiene("123", "kuro", -20);
    await users.changeHat("123", "kuro", "hat");

    const item = await items.createItem("milk", "milk", 20, 1, 10, 10, 10);
    const item2 = await items.createItem("notmilk", "notmilk", 20, 3, 10, 10, 10);
    await items.getItemById(item._id);
    await users.addItem("123", item._id);
    await users.addItem("123", item2._id);

    //const test = await users.updateUses("123", item._id, -1);
    await users.useItem("123", item._id, "kuro");

    const gameShop = await shops.createShop("GamesShop");
    const groomingStore = await shops.createShop("GroomingStore");
    const supermarket = await shops.createShop("Supermarket");
    await shops.addStock(supermarket._id, item._id);
    await shops.addStock(supermarket._id,item2._id);
    console.log("seeding done");

  } catch (e) {
    console.log(e);
  }

}

main();