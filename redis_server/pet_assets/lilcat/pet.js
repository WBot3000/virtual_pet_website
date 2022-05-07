//https://techpiezo.com/linux/install-imagemagick-in-ubuntu-20-04-lts/
const id = 'lilcat';

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

function GetCustomizableOptions(){
  //TODO
  return null;
}

function CreateImageFromOptions(){
  //TODO
  return null;
}

module.exports = {GetId, GetCustomizableOptions, CreateImageFromOptions}