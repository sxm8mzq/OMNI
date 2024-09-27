import * as fs from 'fs';

let keys;

class JsonData {
  async skuReplacer(oldsku, newsku) {
    function jsonReader(filePath, jsonVariable) {
      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          return jsonVariable && jsonVariable(err);
        }
        try {
          const object = JSON.parse(fileData.toString());
          return jsonVariable && jsonVariable(null, object);
        } catch (err) {
          return jsonVariable && jsonVariable(err);
        }
      });
    }
    jsonReader('./src/resources/data/skuData.json', (err, skuData) => {
      if (err) {
        /* eslint-disable */
        console.log('Error reading file:', err);
        /* eslint-enable */
      } else {
        for (let i = 0; i < Object.keys(skuData).length; i += 1) {
          keys = Object.keys(skuData)[i];
          if (skuData[keys].sku === oldsku) {
            skuData[keys].sku = newsku;
            fs.writeFileSync('./src/resources/data/cart/skuData.json', JSON.stringify(skuData, null, 2));
          }
        }
      }
    });
  }
}

export default new JsonData();
