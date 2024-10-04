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
  async extractidocnum(idocnum)
        {
          function extractNumbers(sentence: string): number[] {
          const numbers: number[] = [];
          const regex = /\d+/g; // Regular expression to match numbers
          let match;
          while ((match = regex.exec(idocnum)) !== null) {
            numbers.push(parseInt(match[0], 10));
            return numbers;
          }  
      }
        const extractedNumbers = extractNumbers(idocnum);
        console.log(extractedNumbers);
        //write
        fs.writeFileSync('./src/resources/data/idocnum.json', JSON.stringify('', null, 2));
        fs.writeFileSync('./src/resources/data/idocnum.json', JSON.stringify(extractedNumbers, null, 2));      
    }

    async getIdocNum(){
      let jsonData = [];
      try {
        const fileContents = fs.readFileSync('./src/resources/data/idocnum.json', 'utf8');
        jsonData = JSON.parse(fileContents);
      } catch (error) {
        console.error('Error reading JSON file:', error);
      }
      const CCDetails = [];
      const valueSet1 = fs.readFileSync('./src/resources/data/idocnum.json', 'utf8');
      const a = valueSet1.split('\n');      
      for (let i = 0; i < a.length; i++) {
        CCDetails.push(a[i]);
      }
      const IdocNumber = CCDetails[0];
      return IdocNumber ;
      console.log(IdocNumber);
       }
 
           
        
}

export default new bd87();
                                                                                                                                                                               