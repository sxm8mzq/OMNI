
import axios from 'axios';
import home from '../../home.js'
let environment: string;

class AisleandBay{
async checkAisleLocation(store, sku, language) {
    environment = process.env.Env.toUpperCase();
    const lang: string = language.toLowerCase().split(" ")[0].substring(0, 2);
    const qpURI = `https://www.qp-gcp.homedepot.ca/api/productsvc/v1/products/${sku}/store/${store}?fields=BASIC_SPA&lang=${lang}`;
    const prodURI = `https://www.homedepot.ca/api/productsvc/v1/products/${sku}/store/${store}?fields=BASIC_SPA&lang=${lang}`;
    const qaURI = `https://www.qa-gcp.homedepot.ca/api/productsvc/v1/products/${sku}/store/${store}?fields=BASIC_SPA&lang=${lang}`;
    var uri: string;
    if ((environment = "QP")) {
      uri = qpURI;
    } else if ((environment = "PROD")) {
      uri = prodURI;
    } else if ((environment = "QA")) {
      uri = qaURI;
    }
    const response = await axios.get(uri);
    var text;
    try {
      const config = await home.loadConfig("./src/resources/data/aisleBayData.json");
      const data = response.data.aisleBay;
      Object.entries(config).forEach(([key, values]) => {
        const keyConfig = values as { Aisle: string; Bay: string; English: string; French: string };
        const regexA = new RegExp(keyConfig.Aisle);
        const regexB = new RegExp(keyConfig.Bay);
        const matchA = regexA.test(data.aisleLocation);
        const matchB = regexB.test(data.bayLocation);
        if (matchA === true && matchB === true && lang ==='en') {
          text = keyConfig.English;
          return text;
        }
        else if (matchA === true && matchB === true && lang ==='fr'){
          text = keyConfig.French;
          return text;
        }
      });
    } catch (error) {
      console.error("Error in processing the data:", error);
    }
    await expect($(`//*[@data-qa='wdio-find-in-store-component-container']`)).toHaveText(expect.stringContaining(text));
  }

}

export default new AisleandBay();