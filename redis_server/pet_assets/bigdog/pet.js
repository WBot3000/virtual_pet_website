//https://techpiezo.com/linux/install-imagemagick-in-ubuntu-20-04-lts/
const fs = require('fs');
const path = require('path');
const id = 'bigdog';
const customItems = [{screen_name: "Boss Glasses", image_name: "boss-glasses.png"},
  {screen_name: "Bow Tie", image_name: "bow-tie.png"},];

function CreateImage(){
  var im = require('imagemagick');

  im.readMetadata('lilcat.png', function(err, metadata){
  if (err) throw err;
    console.log(metadata);
  })

  try {
    im.convert(['lilcat.png', 'boss-glasses.png', '-gravity', 'Center', '-geometry', '2000x2000+30+5', '-composite', '-resize', '2000x2000', 'output.png'], 
    function(err, stdout){
    if (err) throw err;
    console.log('stdout:', stdout);
  });  
  } catch (error) {
    console.log(error)
  } 
}

function GetId(){
  return id;
}

function GetAllData(){
  let allData = {
    id: GetId(),
    custom_items: GetCustomizableOptions(),
    base64_img: GetImageBase64()
  }

  return allData;
}

function GetImageBase64(){
  const directoryPath = path.join(__dirname, `image.png`);
  let bitmap = fs.readFileSync(directoryPath);
  let base64 = Buffer(bitmap).toString('base64');
  base64 = `data:image/png;base64, ${base64}`;
  return base64;
}

function GetCustomizableOptions(){
  return customItems;
}

function CreateImageFromOptions(){
  //TODO
  return null;
}

module.exports = {GetId, GetCustomizableOptions, CreateImageFromOptions, GetAllData, GetImageBase64}