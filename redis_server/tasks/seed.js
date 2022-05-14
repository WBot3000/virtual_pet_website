const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const items = data.items;
const shops = data.shops;

async function main() {
  const db = await dbConnection();
  //await db.dropDatabase();

  try{       
      await items.createItem("Sandwich", "A simple meal between bread.", 10, 1, 30, 10, -3);
      await items.createItem("Ball", "It's blue and its fun!", 20, 10, 30, -5, -5);
      await items.createItem("Soap", "A bar of soap. Its good for bubbles and cleanliness.", 10, 5, 10, 0, 30);

  }catch(e){
      console.log(e);
  }
}

main();