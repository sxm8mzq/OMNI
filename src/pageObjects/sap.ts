import { browser, $, $$, expect } from '@wdio/globals';
let randomEmail: string;
let environment: string;
import {QASAPLOGIN } from '../pageRepository/pageFactory.js'
import { Key } from "webdriverio";
import fs from 'fs';
import { waitForElement } from "../pageObjects/page.js";
import {expect1, assert } from 'chai';
import Mousetrap from 'mousetrap';


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
        environment = "QP";
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
    await browser.pause(2000);
    (await ($(`${selector}`))).click();
    await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
    (await ($(`${selector}`))).addValue(text);;
    //console.log(text);
    await browser.pause(2000);
    //console.log("username and pwd");     
    }
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async clicktheBtnXpath(selector: string) 
    {
      await browser.pause(2000);
    (await ($(`${selector}`))).click();
    await browser.pause(2000);
 
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
      async keyboardActionsF8(_action) {
        try {
          await browser.action("key").down(Key.F8).perform();
         // await browser.keys(action);
        } catch (e) {
  
        }
      }
      



      async getPONumber(){
        let jsonData = [];
        try {
          const fileContents = fs.readFileSync('./src/resources/data/poDetails.json', 'utf8');
          jsonData = JSON.parse(fileContents);
        } catch (error) {
          //console.error('Error reading JSON file:', error);
        }
        const CCDetails = [];
        const valueSet1 = fs.readFileSync('./src/resources/data/poDetails.json', 'utf8');
        const a = valueSet1.split('\n');      
        for (let i = 0; i < a.length; i++) {
          CCDetails.push(a[i]);
        }
        
        const POnum= CCDetails[1];
        const ponumtxt: string = POnum.toString();
        return ponumtxt;
        //console.log(order);
         }
       
         async extractNumberFromString (stringValue) {
          const numberValue = await Number(stringValue.replace(/[^0-9.]+/g, ""));
          return numberValue;
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
    //fs.writeFileSync('./src/resources/data/poDetails.json', JSON.stringify('', null, 2));
    fs.writeFileSync('./src/resources/data/poDetails.json', JSON.stringify(extractedNumbers, null, 2))
}
          async checkZESC(Tcode)
          {

            await this.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
            await this.keyboardActions('Enter');
            const orderNum=await this.getOrderNumber();
            //await sapLogin.getOrderNumber();
            (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
              await this.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
            await this.keyboardActions('Enter');
            //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
            console.log("VA03 order opened");
            (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
            await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
            await this.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
            console.log("Document flow is opened!");
            await browser.pause(2000);
            const POnum=await $(QASAPLOGIN.va03DisplayDocPONum).getText();
            console.log(POnum);
            await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
            console.log("POnumber is clicked");
            (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
            await browser.pause(2000);
            await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
            console.log("PO Document is opened!");
            await browser.pause(6000);

                // if ((await $(QASAPLOGIN.va03CollapseBtnItemOverview)).isDisplayed)
                // {
                //   await (await $(QASAPLOGIN.va03CollapseBtnItemOverview)).click();
                //   await browser.pause(5000);
                //   console.log("Item Details Collapsed..");
          //       // }
          // if ((await $(QASAPLOGIN.va03ItemDetailsExpand)).isDisplayed)
          //       {
          //         await $(QASAPLOGIN.va03ItemDetailsExpand).click();
          //         await browser.pause(5000);
          //         console.log("Item Details expand..");
          //         await browser.pause(5000);
          //       }

          //       await $(QASAPLOGIN.va03DIntNumForGr).scrollIntoView({ block: "center" });
          //   // await browser.pause(3000);
          //         if ((await $(QASAPLOGIN.va03arrow)).isDisplayed)
          //           {
          //             await (await $(QASAPLOGIN.va03arrow)).click();
          //             await browser.pause(5000);
          //             console.log("Arrow button clicked..");
                      
          //           }

              //  ((await $(QASAPLOGIN.va03PohistoryTab)).isDisplayed)
              // await (await $(QASAPLOGIN. va03PohistoryTab)).click();
              // await browser.pause(3000);
              // console.log("PO history Clicked!");
              
            (await $(QASAPLOGIN.va03DIntNumForGr)).waitForDisplayed({ timeout: 60000 });
            let dintNum=(await $(QASAPLOGIN.va03DIntNumForGr)).getText();
            console.log(dintNum);
            //await browser.debug();
            await $(QASAPLOGIN.va03DIntNumForGr).doubleClick();
            await browser.pause(4000);
            console.log("DINT Clicked!");
              
            (await $(QASAPLOGIN.replinishDelMenu)).waitForDisplayed({ timeout: 60000 });
            await (await $(QASAPLOGIN.replinishDelMenu)).click();
            await browser.pause(4000);
            console.log("Menu Clicked!");


            (await $(QASAPLOGIN.replinishDelMenuExtras)).waitForDisplayed({ timeout: 60000 });
            await (await $(QASAPLOGIN.replinishDelMenuExtras)).click();
            await browser.pause(4000);
            console.log("Extras Clicked!");


            (await $(QASAPLOGIN.replinishDelDeliveryOuput)).waitForDisplayed({ timeout: 60000 });
            await (await $(QASAPLOGIN.replinishDelDeliveryOuput)).click();
            await browser.pause(4000);
            console.log("Delivery Output is Clicked!");


            (await $(QASAPLOGIN.replinishHeader)).waitForDisplayed({ timeout: 60000 });
            await (await $(QASAPLOGIN.replinishHeader)).click();
            await browser.pause(4000);
            console.log("Header is clicked !");

          }

      async rsnastRun(odbNumber)
      {

        await this.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
        await this.keyboardActions('Enter');
        await browser.pause(2000);
        console.log("Before entering program name");
        //await browser.pause(6000);
        //input[@title='ABAP Program Name']`));
        (await $(QASAPLOGIN.txtProgram)).clearValue();
        await this.enterTextInTextBox(QASAPLOGIN.txtProgram,'RSNAST00');
        await browser.pause(2000);
        await this.keyboardActions('Enter');
        await waitForElement(await $(`//div[@title='Execute (F8)']`));
        await $(`//div[@title='Execute (F8)']`).click();
        await browser.pause(6000);
        
  
       // (await $(QASAPLOGIN.rsnastOutputType)).waitForDisplayed({ timeout: 60000 });
        await (await $(QASAPLOGIN.rsnastOutputType)).click();
        await browser.pause(4000);
        await (await $(QASAPLOGIN.rsnastOutputType)).addValue("V2");
        console.log("Output Application entered!");

        (await $(QASAPLOGIN.rsnastObjectKey)).waitForDisplayed({ timeout: 60000 });
        await (await $(QASAPLOGIN.rsnastObjectKey)).click();
        await browser.pause(4000);
        await $(QASAPLOGIN.rsnastObjectKey).addValue(odbNumber);
        console.log("Object Key entered!");

        (await $(QASAPLOGIN.rsnastZESCOutputType)).waitForDisplayed({ timeout: 60000 });
        await (await $(QASAPLOGIN.rsnastZESCOutputType)).click();
        await browser.pause(4000);
        await $(QASAPLOGIN.rsnastZESCOutputType).addValue('ZESC');
        console.log("Output type is entered!");

        await $(QASAPLOGIN.rsnastExecuteBtn).waitForDisplayed({ timeout: 60000 });
        await (await $(QASAPLOGIN.rsnastExecuteBtn)).click();
        await browser.pause(16000);
        console.log("Execute Button is clicked!");


        await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 60000 });
        await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
        await browser.pause(4000);
        console.log("Continue Button clicked in RSNAST POP UP!");
        await browser.pause(4000);
        

        await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 60000 });
        await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
        await browser.pause(4000);
        console.log("Continue Button clicked in RSNAST POP UP second!");
        await browser.pause(4000);
        
      }

      async checkODb(Tcode: string)
      {
        await this.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
        await this.keyboardActions('Enter');
        const orderNum=await this.getOrderNumber();
        //await sapLogin.getOrderNumber();
        (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
          await this.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await this.keyboardActions('Enter');
        //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
        console.log("VA03 order opened");
         (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
        await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
        await this.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        console.log("Document flow is opened!");
        await browser.pause(2000);

        (await $(QASAPLOGIN.va03ODB)).waitForDisplayed({ timeout: 60000 });
        await waitForElement (await $(QASAPLOGIN.va03ODB));
        let ob= await (await $(QASAPLOGIN.va03ODB)).getText();
        console.log("ODB is created!",ob );
        await browser.pause(2000);
    
      }

      async getAttribute (eleName, selector, attribute) {
        const ele = await $(selector);
        try {
          return ele.getAttribute(attribute);
        } catch (e) {
          await browser.takeScreenshot();
          //expect.fail(0, 1, `${eleName} :: Failed to get ${attribute} of ${eleName} :: ${e}`);
        }
      }
     async  isNotVisibleByEle(eleName, selector) {
        let status = true;
        try {
          status = await browser.isElementDisplayed(selector) ? false : true;
        } catch (error) {
          status = false;
          //browser.saveScreenshot();
          //expect.fail(0, 1, `Element is Visible :: ${eleName} :: ${error}`);
        }
        return status;
      }
      // async waitForPageLoad () {
      //   const status = "complete";
      //   try {
      //     browser.waitUntil(() => browser.execute("return document.readyState").value === status, 15000, 'Page is loading after 15s');
      //   } catch (e) {
      //     await browser.takeScreenshot();
      //     expect1.fail(0, 1, `Caught an exception at waitForPageLoad :: ${e}`);
      //   }
      // }
      async pageScrollTillBottomPage () {
        try {
          await browser.execute('window.scrollTo(0,document.body.scrollHeight)');
        } catch (e) {
          await browser.takeScreenshot();
         // expect.fail(0, 1, `page scroll till bottom is not working:: ${e}`);
        }
      }
      async keyboardCTRLF2()
      {
      Mousetrap.bind('ctrl+f2', () => {
        // Your custom functionality here
        console.log('Ctrl+F2 pressed!');
      });
    }
  

}
export default new sap();
                                                                                                                                                                               