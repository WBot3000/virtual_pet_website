//All Pets imported here
const lilcat = require('../pet_assets/lilcat/pet');
const bigdog = require('../pet_assets/bigdog/pet');
const allPets = [lilcat, bigdog];

function GetAllPets(){
  return allPets;
}

module.exports = {GetAllPets}