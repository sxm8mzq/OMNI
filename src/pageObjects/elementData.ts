import * as fs from "fs";
import { browser, $, $$, expect } from "@wdio/globals";
import { Key } from "webdriverio";

let keys;
let elements;

class ElementData {
  async dataReader(selector, text) {
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
    jsonReader("./src/resources/data/cart/placeHolder.json", async (err, data) => {
      if (err) {
        /* eslint-disable */
        console.log(err);
      } else {
        for (let i = 0; i < Object.keys(data).length; i += 1) {
          keys = Object.keys(data)[i];
          const actualKey = JSON.stringify(data[keys].key);
          if (actualKey === selector) {
            elements = data[keys].value;
            await $(`[placeholder = '${elements}']`).click();
            await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
            await $(`[placeholder = '${elements}']`).addValue(text);
          }
        }
        /* eslint-enable */
      }
    });
  }
}
export default new ElementData();
