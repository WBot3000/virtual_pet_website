//All Pets imported here
const lilcat = require('../pet_assets/lilcat/pet');
const bigdog = require('../pet_assets/bigdog/pet');
const mightyeagle = require('../pet_assets/mightyeagle/pet');
const allPets = [lilcat, bigdog, mightyeagle];

function GetAllPets(){
  return allPets;
}

module.exports = {GetAllPets}