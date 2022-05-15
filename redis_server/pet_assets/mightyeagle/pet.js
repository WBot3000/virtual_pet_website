//https://techpiezo.com/linux/install-imagemagick-in-ubuntu-20-04-lts/
const fs = require('fs');
const path = require('path');
const id = 'mightyeagle';
const species = "Eagle";

const customItems = [{screen_name: "Evil?", image_name: null, id: "evil"},
  {screen_name: "Bowler Hat", image_name: "bowler-hat.png", id: "bowler-hat"},
  {screen_name: "Monocle", image_name: "monocle.png", id: "monocle"},];

function CreateImage(options){
  //If no options provided, just return the image
  if (options.length === 0) {
    return GetImageBase64();
  }

  var im = require('imagemagick');

  let allOptions = [];
  if(options.includes('bowler-hat') ){
    const glassesPath = path.join(__dirname, `bowler-hat.png`);
    allOptions.push.apply(allOptions, [glassesPath, '-gravity', 'Center', '-geometry', '2000x2000-500-1000', '-composite'])
  }
  if(options.includes('monocle') ){
    const bowPath = path.join(__dirname, `monocle.png`);
    allOptions.push.apply(allOptions, [bowPath, '-gravity', 'Center', '-geometry', '2000x2000+30+1000', '-composite'])
  }

  const directoryPath = path.join(__dirname, `image.png`);
  const outputPath = path.join(__dirname, `output.png`);
  let magickOptions = [directoryPath];
  magickOptions.push.apply(magickOptions, allOptions);
  magickOptions.push.apply(magickOptions, ['-resize', '2000x2000']);
  if(options.includes('evil')) {
    magickOptions.push.apply(magickOptions, ['-negate'])
  }
  magickOptions.push.apply(magickOptions, [outputPath])

  return new Promise((resolve, reject) => {
    im.convert(magickOptions, function(err, stdout){
            if(err) {
                reject(err)
            }
            resolve(GetImageBase64('output.png'));
        });
  });
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

async function CreateImageFromOptions(options){
  let base64Image = await CreateImage(options);
  return base64Image;
}

function GetSpecies(){
  return species;
}

module.exports = {GetId, GetCustomizableOptions, CreateImageFromOptions, GetAllData, GetImageBase64, GetSpecies}