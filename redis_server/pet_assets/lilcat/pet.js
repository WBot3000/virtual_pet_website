//https://techpiezo.com/linux/install-imagemagick-in-ubuntu-20-04-lts/
const fs = require('fs');
const path = require('path');
const id = 'lilcat';
const customItems = [{screen_name: "Boss Glasses", image_name: "boss-glasses.png", id: "boss-glasses"},
  {screen_name: "Bow Tie", image_name: "bow-tie.png", id: "bow-tie"},];

function CreateImage(options){
  //If no options provided, just return the image
  if (options.length === 0) {
    return GetImageBase64();
  }

  var im = require('imagemagick');

  let allOptions = [];
  if(options.includes('boss-glasses') ){
    const glassesPath = path.join(__dirname, `boss-glasses.png`);
    allOptions.push.apply(allOptions, [glassesPath, '-gravity', 'Center', '-geometry', '2000x2000+30+5', '-composite'])
  }
  if(options.includes('bow-tie') ){
    const bowPath = path.join(__dirname, `bow-tie.png`);
    allOptions.push.apply(allOptions, [bowPath, '-gravity', 'Center', '-geometry', '2000x2000+30+1000', '-composite'])
  }

  const directoryPath = path.join(__dirname, `image.png`);
  const outputPath = path.join(__dirname, `output.png`);
  try {
    let magickOptions = [directoryPath];
    magickOptions.push.apply(magickOptions, allOptions);
    magickOptions.push.apply(magickOptions, ['-resize', '2000x2000', outputPath]);
    im.convert(magickOptions, function(err, stdout){
      if (err) throw err;
      console.log('stdout:', stdout);
  });  
  } catch (error) {
    console.log(error)
  } 
  
  return GetImageBase64('output.png');
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

function GetImageBase64(fn='image.png'){
  const directoryPath = path.join(__dirname, fn);
  let bitmap = fs.readFileSync(directoryPath);
  let base64 = Buffer(bitmap).toString('base64');
  base64 = `data:image/png;base64, ${base64}`;
  return base64;
}

function GetCustomizableOptions(){
  return customItems;
}

function CreateImageFromOptions(options){
  //TODO
  let base64Image = CreateImage(options);
  return base64Image;
}

module.exports = {GetId, GetCustomizableOptions, CreateImageFromOptions, GetAllData, GetImageBase64}