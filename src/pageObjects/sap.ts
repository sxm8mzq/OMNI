import { browser, $, $$, expect } from '@wdio/globals';
let randomEmail: string;
let environment: string;
import {QASAPLOGIN } from '../pageRepository/pageFactory.js'
import { Key } from "webdriverio";
import fs from 'fs';

class sap {
  async launchSAPUrl() {
    //console.log("inside pageobjects");
      if (process.env.SAPENV.toUpperCase() === "QA") {
       // console.log(process.env.QA_SAP_URL);
        await browser.deleteAllCookies();
        //console.log("cookies deleted!");
        //Using the accept insecure cert method with true as parameter to accept the untrusted certificate
	
        //await browser.url("https://vcqs7ap01.homedepot.com:8000/sap/bc/gui/sap/its/webgui?sap-client=500&sap-language=EN");
        await browser.newWindow(process.env.QA_SAP_URL);
        await browser.maximizeWindow();
        // await $('//*[text() = "OK"]').click();
        // await $('//*[text() = "Change Store"]').click();
        environment = "SAPENV";
        return environment;
      }
      if (process.env.SAPENV.toUpperCase() === "PROD") {
        await browser.url(process.env.PROD_APP_URL);
        await browser.maximizeWindow();
        // await $('//*[text() = "OK"]').click();
        // await $('//*[text() = "Change Store"]').click();
        environment = "PROD";
        return environment;
      }
      if (process.env.SAPENV.toUpperCase() === "QP") {
        console.log(process.env.QP_SAP_URL);
        await browser.url(process.env.QP_SAP_URL);
      
        await browser.maximizeWindow();
       // await $('//*[text() = "OK"]').click();
        environment = "QA";
        return environment;
      }
      if (process.env.SAPENV.toUpperCase() === "DEV") {
        await browser.url(process.env.DEV_SAP_URL);
        await browser.maximizeWindow();
        environment = "DEV";
        // await $('//*[text() = "OK"]').click();
        // await $('//*[text() = "Change Store"]').click();
        return environment;
      }
    }

    async enterTextInTextBox(selector,text) 
    {
    await this.sleep(2000);
    (await ($(`${selector}`))).click();
    await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
    (await ($(`${selector}`))).addValue(text);;
    //console.log(text);
    await this.sleep(2000);
    //console.log("username and pwd");     
    }
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async clicktheBtnXpath(selector: string) 
    {
    //console.log(selector)
    await this.sleep(4000);
    (await ($(`${selector}`))).click();
    await this.sleep(2000);
 
    }
    async getOrderNumber(){
      let jsonData = [];
      try {
        const fileContents = fs.readFileSync('./src/resources/data/SAP.json', 'utf8');
        jsonData = JSON.parse(fileContents);
      } catch (error) {
        //console.error('Error reading JSON file:', error);
      }
      const CCDetails = [];
      const valueSet1 = fs.readFileSync('./src/resources/data/SAP.json', 'utf8');
      const a = valueSet1.split('\n');      
      for (let i = 0; i < a.length; i++) {
        CCDetails.push(a[i]);
      }
      
      const order = CCDetails[0];
      return order ;
      console.log(order);
       }
       async keyboardActions (_action) {
        try {
          await browser.action("key").down(Key.Enter).perform();
         // await browser.keys(action);
        } catch (e) {
  
        }
      }
      
  async displayDocumentFlow()
  {
  
    const orderNum=await this.getOrderNumber();
    //await sapLogin.getOrderNumber();
   // await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    //await this.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   // await this.keyboardActions('Enter');
    await this.sleep(4000);
    //(await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 40000 })
   // await this.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
    console.log("VA03 order opened for checking PO");
    await this.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
    
  }
  async enterProgramName(text)
    {
    await this.sleep(2000);
    await $(QASAPLOGIN.authPageTxtBox).click();
    await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
    (await ($(QASAPLOGIN.authPageTxtBox))).addValue(text);
    //console.log(text);
    await this.sleep(2000);
    await browser.action("key").down(Key.Enter).perform();
    await this.sleep(2000); 

    }
    async extractPOnum(ponum)
    {function extractNumbers(sentence: string): number[] {
      const numbers: number[] = [];
      const regex = /\d+/g; // Regular expression to match numbers
      let match;
      while ((match = regex.exec(ponum)) !== null) {
        numbers.push(parseInt(match[0], 10));
        return numbers;
      }   
  }
    
    const extractedNumbers = extractNumbers(ponum);
    
    console.log(extractedNumbers); 
    //write
    fs.writeFileSync('./src/resources/data/poDetails.json', JSON.stringify('', null, 2));
    fs.writeFileSync('./src/resources/data/poDetails.json', JSON.stringify(extractedNumbers, null, 2));

    
}

}
export default new sap();
                                                                                                                                                                               