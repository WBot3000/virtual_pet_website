//All Pets imported here
const lilcat = require('../pet_assets/lilcat/pet');
const evillilcat = require('../pet_assets/evillilcat/pet');
const bigdog = require('../pet_assets/bigdog/pet');
const evilbigdog = require('../pet_assets/evilbigdog/pet');
const allPets = [lilcat, evillilcat, bigdog, evilbigdog];

function GetAllPets(){
  return allPets;
}

module.exports = {GetAllPets}