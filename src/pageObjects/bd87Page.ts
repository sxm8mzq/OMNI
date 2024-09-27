/* eslint-disable */
import { faker } from "@faker-js/faker";
let randomEmail: string;
let environment: string;
import { Key } from "webdriverio";
import fs from 'fs';
import { browser, $, $$, expect } from '@wdio/globals';


/* eslint-enable */
class bd87{
  async getIdocDetails()
  {
    
    let jsonData = [];
      try {
        const fileContents = fs.readFileSync('./src/resources/data/SAP.json', 'utf8');
        jsonData = JSON.parse(fileContents);
      } catch (error) {
       // console.error('Error reading JSON file:', error);
      }
      const CCDetails = [];
      const valueSet1 = fs.readFileSync('./src/resources/data/SAP.json', 'utf8');
      const a = valueSet1.split('\n');      
      for (let i = 0; i < a.length; i++) {
        CCDetails.push(a[i]);
      }  
      const idocNum = CCDetails[1];
      return idocNum ; 
  }


}

export default new bd87();
                                                                                                                                                                               