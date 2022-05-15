const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const items = data.items;
const shops = data.shops;

async function main() {
  const db = await dbConnection();
  //await db.dropDatabase();

  try {
    const toyStore = await shops.createShop("Toy Store");
    const pharmacy = await shops.createShop("Pharmacy");
    const supermarket = await shops.createShop("Supermarket");
    const ball = await items.createItem(
      "Ball",
      "It's blue and its fun!",
      20,
      10,
      30,
      -5,
      -5
    );
    await shops.addStock(toyStore._id, ball._id);
    const stuffed_animal = await items.createItem(
      "Stuffed Animal",
      "A snuggle buddy for your buddy!",
      40,
      10,
      10,
      0,
      0
    );
    await shops.addStock(toyStore._id, stuffed_animal._id);
    const bubbles = await items.createItem(
      "Bubbles",
      "Blow Bubbles for your pet!",
      10,
      3,
      20,
      0,
      -5
    );
    await shops.addStock(toyStore._id, bubbles._id);
    const sandwich = await items.createItem(
      "Sandwich",
      "A simple meal between bread.",
      10,
      1,
      5,
      20,
      -3
    );
    await shops.addStock(supermarket._id, sandwich._id);
    const sushi = await items.createItem(
      "Sushi",
      "So-fish-ticated!",
      30,
      1,
      5,
      30,
      0
    );
    await shops.addStock(supermarket._id, sushi._id);
    const steak = await items.createItem(
      "Steak",
      "The steaks are high!",
      40,
      1,
      5,
      40,
      0
    );
    await shops.addStock(supermarket._id, steak._id);
    const soap = await items.createItem(
      "Soap",
      "A bar of soap. Its good for bubbles and cleanliness.",
      10,
      5,
      5,
      0,
      30
    );
    await shops.addStock(pharmacy._id, soap._id);
    const pawfume = await items.createItem(
      "Pawfume",
      "If you wanna smell purrfect!",
      10,
      3,
      10,
      0,
      10
    );
    await shops.addStock(pharmacy._id, pawfume._id);
    const brush = await items.createItem(
      "Brush",
      "Gotta look pawsome!",
      5,
      3,
      15,
      0,
      20
    );
    await shops.addStock(pharmacy._id, brush._id);
  } catch (e) {
    console.log(e);
  }
}

main();
