import { Given, Then } from '@wdio/cucumber-framework';
import OrderSummary from '../pageObjects/cart.js';
import home from '../pageObjects/home.js';
import PipOperations from '../pageObjects/pip.js';
import checkOut from '../pageObjects/checkOut.js';
import plp from '../pageObjects/plp.js';
import proB2B from '../pageObjects/proB2B.js';
import myAccount from '../pageObjects/myAccount.js';
import HomeServices from '../pageObjects/homeServices.js';
import Aisle from '../pageObjects/api/ca/aisleAndBay.js'
import BookAnAssociate from '../pageObjects/oab.js';
import SelectDateForToolRental from '../pageObjects/toolRental.js'
import { scenarioName } from '../config/wdio.chrome.sauce.conf.js';
import { browser, $, $$, expect } from '@wdio/globals';
import skuData from '../resources/data/skuData.json' assert {type: 'json'};
import e2eData from '../resources/data/e2eData.json' assert {type: 'json'};
import sap from '../pageObjects/sap.js';
import fs from 'fs';
import bd87Page from '../pageObjects/bd87Page.js';
import {QASAPLOGIN } from '../pageRepository/pageFactory.js'
import { waitForElement } from "../pageObjects/page.js";
import { waitUntil } from 'webdriverio/build/commands/browser.js';
import * as allure from "allure-js-commons";
let obdNum ="";
let  idocnum="";
let  POnum ="";
let GI="";
let dintNum="";
let jobName="";

Given(/^the user launches the url$/, async () => {
  await home.launchOneUrl();
});

Then(/^the user enters text sku in textbox with placeholder (.*)$/, async (selector) => {
  await home.enterSkuData(selector, skuData, e2eData, scenarioName);
});

Then(/^the user validates if the time status of the located store is correct$/, async () => {
  await home.validateNowHoursStatus();
});

Then(/^the user presses browser back button$/, async () => {
  await browser.back();
});

Then(/^the user validates aisle and bay location text for store "([^"]*)?" and "([^"]*)?" in "([^"]*)?"$/, async (store, sku, language) => {
     await Aisle.checkAisleLocation(store, sku, language);
});

Then(/^the user enters random email in the textbox (.*)$/, async (selector) => {
  await (await $(`//*[contains(text(),${selector})]/following::input[1]`)).addValue(await home.emailGenerator());
});

Then(/^the user enters random number in the textbox (.*) by adding "([^"]*)?" digits$/, async(selector, digitsToAdd) =>{
  await (await $(`//*[contains(text(),${selector})]/following::input[1]`)).addValue(await home.phoneNumberGenerator(digitsToAdd));
})

Then(/^the user enters random email on the webelement with html tag "([^"]*)?" as (.*)$/, async (htmlTag, selector) => {
  await (await $(`//*[contains(@${htmlTag},${selector})]`)).addValue(await home.emailGenerator());
});

Then(/^the user enters randomly generated email in the textbox (.*)$/, async (selector) => {
  await (await $(`//*[contains(text(),${selector})]/following::input[1]`)).addValue(await home.emailGenerated());
});

Then(/^the user verifies if (.*) and (.*) are equal$/, async (selector, selectorToMatch) => {
  expect(await $(`//label[contains(text(),${selector})]/following::select`).getValue()).toEqual(await $(`//*[contains(text(),${selectorToMatch})]/following::input[@type='text']`).getValue());
});

Then(/^the user validates if shipping postal code and (.*) are equal$/, async (selector) => {
  await OrderSummary.validatePostalCode(selector);
});

Then(/^the user validates the order summary table$/, async () => {
  await OrderSummary.verifyOrderSummaryTotalValue();
});

Then(/^the user validates (.*) in datepicker$/, async (selector) => {
  await OrderSummary.verifyWeekDaysDateMonthYearofDatePicker(selector);
});
Then(/^the user validates if product totals are equal on the cart page$/, async () => {
  await OrderSummary.verifyTotalItemPriceAndOrderSubTotal();
});

Then(/^the user validates the order summary table in french$/, async () => {
  await OrderSummary.verifyOrderSummaryTotalValueFrench();
});

Then(/^the user validates if product totals are equal on the cart page in french$/, async () => {
  await OrderSummary.verifyTotalItemPriceAndOrderSubTotalFrench();
});

Then(/^the user deselect all service checkbox$/, async () => {
  await OrderSummary.deSelectAllServiceCheckBox();
});

Then(/^the user validates if total item in cart is equal to item count in cart header and mini cart$/, async () => {
  await OrderSummary.validateItemTotalCount();
});

Then(/^the user (.*) all items added to cart$/, async (selector) => {
  await OrderSummary.removeAllItemsFromCart(selector);
});

Then(/^the user validates if total item in cart is equal to item count in cart header and mini cart in French$/, async () => {
  await OrderSummary.validateItemTotalCountFrench();
});

Then(/^the user verifies if price per item equals per item total$/, async () => {
  await OrderSummary.verifyPricePerItemWithItemTotal();
});

Then(/^the user validates the order subtotal for tier of (.*)$/, async (quantity) => {
  await OrderSummary.verifyOrderSubTotalforTier(quantity);
});
Then(/^the user validates the order saving total for tier of (.*)$/, async (quantity) => {
  await OrderSummary.verifyOrderTotalSavingforTier(quantity);
});

Then(/^the user verifies if price per item equals per item total in French$/, async () => {
  await OrderSummary.verifyPricePerItemWithItemTotalFrench();
});

Then(/^the user gets the moq limit$/, async () => {
  await OrderSummary.getMoqLimit();
});

Then(/^the user validate if quantity drop down has values of 1 to MOQ limit$/, async () => {
  await OrderSummary.verifyQuantityDropdown();
});

Then(/^the user checks if cart is empty$/, async () => {
  await OrderSummary.isCartEmpty();
});

Then(/^the user add product to cart$/, async () => {
  await OrderSummary.addToCart();
});

Then(/^the user validates if delivery date is updated$/, async () => {
  await OrderSummary.validateDeliveryDateUpdated();
});

Then(/^the user clicks on the scheduled express delivery with postal code "([^"]*)?"$/, async (postalCode) => {
  await OrderSummary.expressDeliveryScheduled(postalCode);
});

Then(/^the user clicks on the express delivery same day with postal code "([^"]*)?"$/, async (postalCode) => {
  await OrderSummary.expressDeliverySameday(postalCode);
});

Then(/^the user clicks on french the express delivery same day with postal code "([^"]*)?"$/, async (postalCode) => {
  await OrderSummary.expressDeliverySamedayFrench(postalCode);
});

Then(/^the user validates that the delivery date is equal to the estimated arrival$/, async () => {
  await OrderSummary.validateDeliveryDateIsEqualToEstimatedArrival();
});

Then(/^the user validates cart header and container has same "([^"]*)?" at index "([^"]*)?"$/, async (variable, index) => {
  await OrderSummary.validateCartHeaderAndContainerHasSameVariable(variable, index);
});

Then(/^the user verifies the cart quantity is equal to "([^"]*)?" at index "([^"]*)?"$/, async (productQuantity, index) => {
  await OrderSummary.quantityVerification(productQuantity, index);
});

Then(/^the user validates savingprice wasprice and nowprice$/, async () => {
  await PipOperations.validateWasNowandSavingPriceInPIP();
});

Then(/^the user validates if the frequetly bought items count is as expected$/, async () => {
  await PipOperations.validateFBTItems();
});

Then(/^the user clicks on the all elements with html tag "([^"]*)?" as (.*)$/, async (htmlTag, selector) => {
  await PipOperations.clickAllElements(htmlTag, selector);
});

Then(/^the user validates if all frequently bought items checkboxes are checked and components are shown$/, async () => {
  await PipOperations.validateFbtCheckboxesCheckedAndFbtItemSection();
});

Then(/^the user gets the add to cart button item value$/, async () => {
  await PipOperations.getFbtAddToCartButtonItemValue();
});

Then(/^the user compares the add to cart overlay items, add to cart message and product information page item values$/, async () => {
  await PipOperations.compareAddToCartModalAndPipItems();
});

Then(/^the user validates if pill number "([^"]*)?" is selected$/, async (pillNumber) => {
  await PipOperations.validateIfPillIsSelected(Number(pillNumber));
});

Then(/^the user validates if the pill (.*) is selected$/, async (pillText) => {
  await PipOperations.validateIfPillWithTextIsSelected(pillText);
});

Then(/^the user validates if (.*) offer is present in pip$/, async (selector) => {
  await PipOperations.offerIsPresent(selector);
});

Then(/^the user validates if instock quantity is nonzero$/, async () => {
  await PipOperations.instockQuantityIsNonzero();
});

Then(/^the user verifies CUOM in PIP page is the same as in PLP page$/, async () => { 
  await PipOperations.verifyCUOM(plp.plpCUOM); 
});

Then(/^the user verifies if items added to cart is equal to (.*)$/, async (itemQuantity) => {
  await OrderSummary.itemsAddedToCartAreEqualsTo(itemQuantity);
});

Then(/^the user checks if shipping addresses exists$/, async () => {
  await myAccount.shippingAddressesExists();
});

Then(/^the user triggers semi signed state by modifying cookies$/, async () => {
  await checkOut.triggerSemiSignedInState();
});

Then(/^the signed in user selects pickup date$/, async () => {
  await checkOut.pickUpDate();
});

Then(/^the user validates if the delivery form is available$/, async () => {
  await checkOut.deliveryAddress();
});

Then(/^the user validates if the store pick up form is available$/, async () => {
  await checkOut.storePickUpFormIsAvailable();
});

Then(/^the signed in user clicks on continue button$/, async () => {
  await OrderSummary.continueButton();
});

// Then(/^the user enters the "([^"]*)?" card details$/, async (cardType) => {
//  // await checkOut.paymentMethod(cardType);
//  await checkOut.paymentMethod(cardType);
// });

Then(/^the user enters the "([^"]*)?" card details$/, async (cardType) => {
  await checkOut.paymentMethodQS(cardType);
});

Then(/^the user enters french "([^"]*)?" card details$/, async (cardType) => {
  await checkOut.paymentMethodFrench(cardType);
});

Then(/^the user enters billing details for "([^"]*)?" card$/, async (paymentType) => {
  await checkOut.hdConsumerAddress(paymentType);
});

Then(/^the user enters french billing details for "([^"]*)?" card$/, async (paymentType) => {
  await checkOut.hdConsumerAddressFrench(paymentType);
});

Then(/^the user verifies if (.*) button for (.*) is visible$/, async (buttonType, checkOutSection) => {
  await expect($(`//*[text()=${checkOutSection}]/ancestor::div[contains(@class, "acl-vertical-progress-bar__header acl-flex-grow--1")]//span[text()=${buttonType}]`)).toBeDisplayed();
});

Then(/^the user verifies if (.*) button for (.*) is not visible$/, async (buttonType, checkOutSection) => {
  await expect($(`//*[text()=${checkOutSection}]/ancestor::div[contains(@class, "acl-vertical-progress-bar__header acl-flex-grow--1")]//span[text()=${buttonType}]`)).not.toBeDisplayed();
});

Then(/^the user checks if wishlist is empty$/, async () => {
  await myAccount.emptyWishlist();
});

Then(/^the user verifies the max number of products in PLP$/, async () => {
  await plp.verifyMaxProducts();
});

Then(/^the user verifies if chevron for the filter (.*) is "([^"]*)?"$/, async (selector, status) => {
  await plp.verifyChevronStatus(selector, status);
});

Then(/^the user gets the CUOM value from PLP page at index "([^"]*)?"$/, async (index) => { 
  await plp.getCUOMText(index); 
});

Then(/^the user uploads an image$/, async () => {
  await HomeServices.uploadMockImage();
});

Then(/^the user selects the date and time for the booking appointment in book an associate$/, async () => {
  await BookAnAssociate.selectDateAndTime();
});

Then(/^the user verify and select checkbox (.*)$/, async (selector) => {
  await home.checkboxIsSelected(selector);
});

Then(/^the user saves primary details of the order$/, async() =>{
  await checkOut.saveOrderDetails();
});

Then(/^the user selects same day delivery fulfillment$/, async() =>{
  await OrderSummary.chooseSameDayDeliverOption();
});

Then(/^the registered user fills in "([^"]*)?" at checkout page$/, async (selector) =>{
  await checkOut.fillInContactPhoneForPickUp(selector);
});

Then(/^the user generates a random phone number with extension (.*)$/, async(extension) =>{
  await proB2B.generateRandomPhoneNumber(extension);
});

Then(/^the user sets the random phone number in the textbox (.*)$/, async(selector) =>{
  await proB2B.enterRandomPhoneNumberInTextbox(selector);
});

Then(/^the user selects tool rental pickup date and time$/, async() =>{
  await SelectDateForToolRental.selectDateAndTime();
});

Then(/^the user save created order number in json file$/, async () => {
  console.log("inside step to save Order no in file");
  const caOrderNo=await $(QASAPLOGIN.caOrderNumber).getText();
 console.log(caOrderNo);
  //const caOrderNo = "Order Number: 0240013257";
 
    // Extracting the order number using a regex
    const match = caOrderNo.match(/Order Number:\s*(\d+)/);
    let caOrderNumber: number | null = null;
    if (match) {
      caOrderNumber =  Number(match[1]); // Save the extracted number
    }
    console.log(caOrderNumber);
 
    //const jsonData = `"${caOrderNumber}"`; // Save as plain text in JSON format
     fs.writeFileSync('./src/resources/data/SAP.json', JSON.stringify(caOrderNumber))
   
});
//  SAP

Then(/^the user launches the SAP url and login to SAP$/, async () => {
  console.log("inside page definition");
  await sap.launchSAPUrl();
  await sap.enterTextInTextBox(QASAPLOGIN.txtSAPUserIdqs7,'sxm8mzq');
  await sap.enterTextInTextBox(QASAPLOGIN.txtSAPPaswdqs7,'Sep@2024');
  // await sap.enterTextInTextBox(QASAPLOGIN.txtSAPUserIdqs7,'TSTAUTO2');
  // await sap.enterTextInTextBox(QASAPLOGIN.txtSAPPaswdqs7,'homedepot');
  await sap.clicktheBtnXpath(QASAPLOGIN.signInqs7);
  await browser.pause(2000);
});

Then(/^the user check the order details with Tcode(.*)$/ , async(Tcode) =>{
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
  await sap.keyboardActions('Enter');
  const orderNum=await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
  await sap.keyboardActions('Enter');
 // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
  await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed();
  console.log("VA03 order opened and item category z3pl verified");
});

  Then(/^the user do the authorization$/, async () => {
    console.log("inside auth prgm");
  const orderNum=await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
  await sap.keyboardActions('Enter');
   console.log("Before entering program name");
   await browser.pause(2000);
   await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'YDCOM_BATCH_FULL_AUTH_NEW');
  //await $(`//input[@title='ABAP Program Name']`).addValue('YDCOM_BATCH_FULL_AUTH_NEW');
 // await waitForElement(await $(`//div[@title='Execute (F8)']`));
 // await $(`//div[@title='Execute (F8)']`).click();
  await waitForElement(await $(QASAPLOGIN.execute));
  await $(QASAPLOGIN.execute).click();
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.authOrderno,orderNum);
  await browser.pause(5000);
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  console.log("Clicked Execute btn");
  //await waitForElement(await $(QASAPLOGIN.authCardApprovedTxt));
 //await browser.pause(8000);

  let done=false;

  while(!done){
    console.log(done);
    console.log("Waiting for tick mark");
    if(await $(QASAPLOGIN.authSuccessTick).isDisplayed()){
      await browser.pause(500);
      await $(QASAPLOGIN.authSuccessTick).click();
    done=true;
    console.log(done);
    }else
    await browser.pause(5000);
  }
  // let l =await  browser.getWindowHandles();
  // console.log(l);
 // await browser.waitUntil(async () => await $(QASAPLOGIN.authSuccessTick).isDisplayed(), { timeout: 18000 });
//  await waitForElement(await $(`//*[contains(@lsdata,'Continue (Enter)')]`));
//  await $(`//*[contains(@lsdata,'Continue (Enter)')]`).click();
  //await sap.clicktheBtnXpath(QASAPLOGIN.authSuccessTick);

  console.log("Tick mark clicked");

let done2=false;

  while(!done2){
    console.log(done2);
    console.log("Waiting for success txt");
    if(await $(QASAPLOGIN.authCardApprovedTxt).isDisplayed()){
      await browser.pause(500);
      console.log("Pass");
    done2=true;
    console.log(done2);
    }else
    await browser.pause(5000);
}

  await expect($(QASAPLOGIN.authCardApprovedTxt)).toBeDisplayed();
 
  });
  

  Then(/^the user generate IDOC for creating PO$/, async () => {
  //   await browser.pause(2000);
  //   const orderNum = await sap.getOrderNumber();
  //   console.log("In generate idoc then statement");
  //   await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
  //   await sap.keyboardActions('Enter');
  //   await browser.pause(2000);
  //   (await $(QASAPLOGIN.txtProgram)).clearValue();
  //   await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'ydsd_order_output_process');
  //   await browser.pause(2000);
  //   await sap.keyboardActions('Enter');
  //   //put execute button code
  //   //await authorization.ExecuteBtn();
  //   await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  //  await browser.pause(4000);
  //   await sap.enterTextInTextBox(QASAPLOGIN.poSalesDocNo,orderNum);
  //   await browser.pause(4000);
  //   await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn4);
  //  await browser.pause(4000);
  //   idocnum=await $(QASAPLOGIN.idocnum).getText();
  //   await console.log(idocnum);
  // from priyanka

        await browser.pause(2000);
        const orderNum = await sap.getOrderNumber();
        console.log("In generate idoc then statement");
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        (await $(QASAPLOGIN.txtProgram)).clearValue();
        await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'ydsd_order_output_process');
        await browser.pause(2000);
        await sap.keyboardActions('Enter');
        //put execute button code
        //await authorization.ExecuteBtn();
        await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
        await browser.pause(4000);
        (await $(QASAPLOGIN.poSalesDocNo)).waitForDisplayed({ timeout: 60000 });
        await sap.enterTextInTextBox(QASAPLOGIN.poSalesDocNo,orderNum);
        await browser.pause(4000);
        (await $(QASAPLOGIN.authExecuteBtn4)).waitForDisplayed({ timeout: 60000 });
        await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn4);
        await browser.pause(4000);
        (await $(QASAPLOGIN.idocnum)).waitForDisplayed({ timeout: 60000 });
        idocnum=await $(QASAPLOGIN.idocnum).getText();
        console.log(idocnum);
    
    });

Then (/^the user process the IDOC number to generate PO with Tcode(.*)$/ , async(Tcode) =>{
//   await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
//  await browser.pause(2000);
//   await sap.keyboardActions('Enter'); 
//   await browser.pause(2000);
//   //const iDocNum=await bd87Page.getIdocDetails();
//   //console.log(iDocNum);
//   await browser.pause(2000);
//   (await $(QASAPLOGIN.bd87IdoctxtBox)).waitForDisplayed({ timeout: 60000 });
//   (await $(QASAPLOGIN.bd87IdoctxtBox)).click();
//   await browser.pause(3000);
//   await sap.enterTextInTextBox(QASAPLOGIN.bd87IdoctxtBox,idocnum);
//   await browser.pause(3000);
//    await sap.clicktheBtnXpath(QASAPLOGIN.bd87ExecuteBtn);

//     let idocStatus= await $(QASAPLOGIN.bd87idocStatus53).getText();
   
//     console.log(idocStatus);
//     if (await idocStatus==='53')
//   {
//     console.log("idoc proccessed succ");
//   }
//   else 
//   {
//     console.log("Moving to else..");
//       await browser.pause(2000);
//       await sap.clicktheBtnXpath(QASAPLOGIN.bd87QS7txt);
//       await browser.pause(2000);
//       await sap.clicktheBtnXpath(QASAPLOGIN.bd87IDCOReadyToProcesstxt);
//       await browser.pause(5000);
//       await sap.keyboardActionsF8('F8'); 
//       await browser.pause(5000);
//       console.log("presssed f8");
//       await browser.pause(5000);
//       let idocStatuNew= await $(QASAPLOGIN.bd87Successtxt).getText();
//       await browser.pause(2000);
//       console.log(idocStatuNew);
//       if (idocStatuNew ==='53')
//       {
//         console.log ("idoc is processed successfully..!!");
//       }
//     }
      // await expect(QASAPLOGIN.bd87CollapseNode).toBeDisplayed();
      // await sap.clicktheBtnXpath(QASAPLOGIN.bd87CollapseNode);
      // await sap.clicktheBtnXpath(QASAPLOGIN.bd87idocStatus53);
    // From Priyanka

    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
    await browser.pause(2000);
     await sap.keyboardActions('Enter');
     await browser.pause(2000);
     const idocTextBox = await $(QASAPLOGIN.bd87IdoctxtBox);
     await idocTextBox.waitForDisplayed({ timeout: 60000 });
     await idocTextBox.click();
     (await $(QASAPLOGIN.idocnum)).waitForDisplayed({ timeout: 60000 });
     await sap.enterTextInTextBox(QASAPLOGIN.bd87IdoctxtBox,idocnum);
     await browser.pause(3000);
     (await $(QASAPLOGIN.bd87ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
     await sap.clicktheBtnXpath(QASAPLOGIN.bd87ExecuteBtn);
     await browser.pause(2000);  
     (await $(QASAPLOGIN.bd87idocStatus53)).waitForDisplayed({ timeout: 60000 })
       let idocStatus= await $(QASAPLOGIN.bd87idocStatus53).getText();
       console.log(idocStatus);
       if (await idocStatus==='53')
          {
       console.log("idoc proccessed succ");
          }
     else
        {
         console.log("Moving to else..");
         await browser.pause(2000);
         (await $(QASAPLOGIN.bd87QS7txt)).waitForDisplayed({ timeout: 60000 });
         await sap.clicktheBtnXpath(QASAPLOGIN.bd87QS7txt);
         await browser.pause(2000);
         (await $(QASAPLOGIN.bd87IDCOReadyToProcesstxt)).waitForDisplayed({ timeout: 60000 });
         await sap.clicktheBtnXpath(QASAPLOGIN.bd87IDCOReadyToProcesstxt);
         await browser.pause(5000);
         await sap.keyboardActionsF8('F8');
         await browser.pause(5000);
         console.log("presssed f8");
         (await $(QASAPLOGIN.bd87Successtxt)).waitForDisplayed({ timeout: 60000 });
         let idocStatuNew= await $(QASAPLOGIN.bd87Successtxt).getText();
         await browser.pause(5000);
         console.log(idocStatuNew);
         if (idocStatuNew ==='53')
         {
           console.log ("idoc is processed successfully..!!");
         }
       }
       await browser.pause(3000);
});

Then(/^the user checks the PO with Tcode(.*)$/, async(Tcode)=> {

  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
  await sap.keyboardActions('Enter');
  const orderNum=await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   await sap.keyboardActions('Enter');
   //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
   console.log("VA03 order opened");
  //  await sap.sleep(6000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
   (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Display document flow is opened");
  await browser.pause(2000);
  const POnumFromDocFlow=await $(QASAPLOGIN.va03DisplayDocPONum).getText();
  console.log(POnumFromDocFlow);
  (await $(QASAPLOGIN.va03DisplayDocPONum)).doubleClick();
  await browser.pause(5000)
  POnum=await $(QASAPLOGIN.va03PONUM).getText();
  console.log(POnum);

//
  //await sap.extractPOnum(POnum);
});

Then(/^the user execute delivery creation$/, async () => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nvl10b');
  await browser.pause(2000);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  await console.log("Before clicking purchase order tab");
  await sap.clicktheBtnXpath(QASAPLOGIN.purOrdTab);
  await browser.pause(3000);
  await sap.enterTextInTextBox(QASAPLOGIN.purOrdNoInPOTab,POnum);
  //(await $(QASAPLOGIN.purOrdNoInPOTab)).setValue(PoNUM);
  await browser.pause(5000);
  await sap.keyboardActions('Enter');
  console.log("PO number entered to the text box");
  await browser.pause(5000);
  console.log("after entering PO number..");
  ////await sap.keyboardActions('Tab');
  //await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await $(QASAPLOGIN.authExecuteBtn1).click();
  await browser.pause(4000);
  console.log("after clicking execute btn..");
 await browser.pause(10000);
});
Then(/^the user check the delivery creation(.*)$/, async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  const orderNum=await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   await sap.keyboardActions('Enter');
   await browser.pause(5000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
   console.log("VA03 order opened");
  await browser.pause(8000);

  await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
   console.log("Website order Text is clicked now");
   await browser.pause(5000);
  await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
   //await $(`//div[contains(@title,'Display Document Flow (F5)')]`).click();
   
   //await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
   await browser.pause(6000);
   console.log("Display document flow is opened");
   

  await $(QASAPLOGIN.va03DisplayDocPONum).click();
  console.log("POnumber is clicked");
  //(await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(5000);
  await ( $(QASAPLOGIN.va03PODisplyDoc)).click();
  console.log("PO Document is opened!");
  await browser.pause(6000);
  
  //  await expect(QASAPLOGIN.purOrdHistTab).toBeDisplayed();
  //    console.log("Purchase order history tab available");
  //   await browser.pause(5000);
  //   await  $(QASAPLOGIN.purOrdHistTab).click();
  //   await browser.pause(5000);
  //   await  expect ($ (QASAPLOGIN.va03DIntNumForGr)).toBeDisplayed();
  //     console.log("DINT is created");
    (await $(QASAPLOGIN.va03DIntNumForGr)).waitForDisplayed({ timeout: 60000 });
    const dint=await (await $(QASAPLOGIN.va03DIntNumForGr)).getText();
    await browser.pause(3000);
    console.log(dint);
    
  });

Then(/^the user enter picked qty and mark the Picking (.*)$/, async(Tcode)=> {
  await browser.takeScreenshot();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  const orderNum=await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   await sap.keyboardActions('Enter');
   //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
   console.log("VA03 order opened");
  await browser.pause(2000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
   (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
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
  // (await $(QASAPLOGIN.va03arrow)).waitForDisplayed({ timeout: 60000 });
  // await (await $(QASAPLOGIN.va03arrow)).click();
  // await browser.pause(5000);
  // console.log("arrow!");
  // (await $(QASAPLOGIN.va03PohistoryTab)).waitForDisplayed({ timeout: 60000 });
  // await (await $(QASAPLOGIN. va03PohistoryTab)).click();
  // await browser.pause(3000);
  // console.log("PO history Clicked!");
  (await $(QASAPLOGIN.va03DIntNumForGr)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.va03DIntNumForGr)).click();
  await browser.pause(3000);
  console.log("DINT Clicked!");
  (await $(QASAPLOGIN.va03PickTab)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(3000);
  await (await $(QASAPLOGIN.va03PickTab)).click();
  console.log("Picking Clicked!");
  // (await $(QASAPLOGIN.va03PickTabItem10Checkbx)).waitForDisplayed({ timeout: 60000 });
  // await browser.pause(3000);
  // await (await $(QASAPLOGIN.va03PickTabItem10Checkbx)).click();
  // console.log("Item 10 checked!");

  (await $(QASAPLOGIN.va03ChangeMode)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(3000);
  await (await $(QASAPLOGIN.va03ChangeMode)).click();
  console.log("Change mode is enabled!");

  const DelQty=await $(QASAPLOGIN.va03DelQty).getText();
  console.log(DelQty);
  console.log("Delivery Qty");
  await browser.pause(4000);
  (await $(QASAPLOGIN.va03PickQtyClick)).click();
  await browser.pause(2000);
 //await $(QASAPLOGIN.va03PickQty).clearValue();
  await browser.pause(4000);
 //await sap.enterTextInTextBox(QASAPLOGIN.va03PickQty,DelQty);
  (await $(QASAPLOGIN.va03PickQty)).setValue(DelQty);
  console.log("Added qty");
  await browser.pause(2000);
  //await sap.keyboardActions('Enter');
  await browser.pause(2000);
  console.log("Updated picked qty..!");
  await browser.takeScreenshot();
  (await $(QASAPLOGIN.va03PickSaveBtn)).click();
  await browser.pause(3000);
  console.log("Saved");
//Come back to order no , again click on Display document flow->Purchase order->Purchase order history tab-> picking then change mode and Post goods issue


});
Then(/^the user verify GI created inside PO (.*)$/ , async(Tcode) =>{
      console.log("code to verify gi created -----before t code ");
        const orderNum=await sap.getOrderNumber();
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
        await sap.keyboardActions('Enter');
        console.log("after t code ");
        await browser.pause(2000);
        (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
        (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
        await browser.pause(2000);
        console.log(orderNum);
        await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        console.log("GI Verification VA03 order opened");
        await browser.pause(6000);
        (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
        await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
        await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        console.log("Document flow is opened!");
        await browser.pause(2000);
        await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
        console.log("PO doc is clicked");
        (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
        await browser.pause(2000);
        await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
        console.log("display Document is clicked!");
        await browser.pause(6000);
        (await $(QASAPLOGIN.GIgenerated)).waitForDisplayed({ timeout: 60000 });
        GI=await $(QASAPLOGIN.GIgenerated).getText();
       console.log(GI);
       await browser.pause(3000);
       console.log("Display Doc for GI verification done");
       await browser.pause(3000);
});

Then(/^the user clicks on post goods issue to generate GI(.*)$/ , async(Tcode) =>{
           await browser.pause(2000);
            await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
            await sap.keyboardActions('Enter');
            await browser.pause(2000);
             const orderNum=await sap.getOrderNumber();
            //await sapLogin.getOrderNumber();
            (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
              await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
            await sap.keyboardActions('Enter');
            // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
             await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed()
            console.log("VA03 order opened");
            await browser.pause(6000);
            (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
            await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
            await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
            console.log("document flow is opened");
            const POnum=await $(QASAPLOGIN.va03DisplayDocPONum).getText();
            console.log("POnum");
            await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
            console.log("PO doc is clicked");
            (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
            await browser.pause(2000);
            await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
            console.log("PO doc is open");
            await browser.pause(6000);
            (await $(QASAPLOGIN.va03DIntNumForGr)).waitForDisplayed({ timeout: 60000 });
            await (await $(QASAPLOGIN.va03DIntNumForGr)).click();
            await browser.pause(3000);
            console.log("DINT Clicked!");
            (await $(QASAPLOGIN.va03PickTab)).waitForDisplayed({ timeout: 60000 });
            await browser.pause(3000);
            await (await $(QASAPLOGIN.va03PickTab)).click();
            console.log("picking Clicked!");         
            await browser.pause(6000);
            (await $(QASAPLOGIN.va03ChangeMode)).waitForDisplayed({ timeout: 60000 });
            await (await $(QASAPLOGIN.va03ChangeMode)).click();
            console.log("display change btn clicked");
            await browser.pause(6000);
            (await $(QASAPLOGIN.postGoodsIssue)).waitForDisplayed({ timeout: 60000 });
            (await $(QASAPLOGIN.postGoodsIssue)).click();
            console.log("post goods issue btn clicked");
            await browser.pause(5000);
                // await browser.pause(2000);
                // await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
                // await sap.keyboardActions('Enter');
                // await browser.pause(2000);
                // const orderNum=await sap.getOrderNumber();
                // //await sapLogin.getOrderNumber();
                // (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
                //   await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
                // await sap.keyboardActions('Enter');
                // // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
                // await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed()
                // console.log("VA03 order opened");
                // await browser.pause(6000);
                // (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
                // await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
                // await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
                // console.log("document flow is opened");
                // const POnum=await $(QASAPLOGIN.va03DisplayDocPONum).getText();
                // console.log("POnum");
                // await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
                // console.log("PO doc is clicked");
                // (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
                // await browser.pause(2000);
                // await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
                // console.log("PO doc is open");
                // await browser.pause(6000);
                // (await $(QASAPLOGIN.va03DIntNumForGr)).waitForDisplayed({ timeout: 60000 });
                // await (await $(QASAPLOGIN.va03DIntNumForGr)).click();
                // await browser.pause(3000);
                // console.log("DINT Clicked!");
                // (await $(QASAPLOGIN.va03PickTab)).waitForDisplayed({ timeout: 60000 });
                // await browser.pause(3000);
                // await (await $(QASAPLOGIN.va03PickTab)).click();
                // console.log("picking Clicked!");
                // await browser.pause(6000);
                // await (await $(QASAPLOGIN.va03ChangeMode)).click();
                // console.log("display change btn clicked");
                // await browser.pause(2000);

                // (await $(QASAPLOGIN.postGoodsIssue)).click();
                // console.log("post goods issue btn clicked");
                // await browser.pause(2000);
});

Then(/^the user enter Goods Receipt (.*)$/, async(Tcode)=> {
  const orderNum=await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  //await sapLogin.getOrderNumber();
  await browser.pause(3000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   await sap.keyboardActions('Enter');
   //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
   console.log("VA03 order opened");
   (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
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
    
  await $(QASAPLOGIN.va03DIntNumForGr).waitForDisplayed({ timeout: 60000 });
   dintNum=await $(QASAPLOGIN.va03DIntNumForGr).getText();
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
  await browser.pause(6000);
  console.log("Delivery Output is Clicked!");


  (await $(QASAPLOGIN.replinishHeader)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.replinishHeader)).click();
  await browser.pause(2000);
  console.log("Header is clicked !");
  await browser.pause(3000);

  // await (await $(QASAPLOGIN.va03backBtn)).click();
  // await browser.pause(4000);
  // console.log("back button is clicked !");
      // ODBNum= await $(QASAPLOGIN.va03OBDNum).getText();
      // await browser.pause(3000);
       //odbNumExtracted=sap.extractPOnum(ODBNum);
      // console.log(odbNumExtracted);
    //   let title = await sap.getAttribute("get title",QASAPLOGIN.zescOutStatus2,"title");
    //  console.log(title);
     // let cond=expect(QASAPLOGIN.zescOutputStatus).toBeDisplayed();
  
        //if  (await $(`//span[contains(@title,'Not processed')]`).isDisplayed())
        // if (cond)
        //    {

          console.log("ZESC is not processed .. Processing with RSNAST..");
        // await $(QASAPLOGIN.va03backBtn).click();
        // console.log("back button is clicked !");
        // await browser.pause(6000);
        // await $(QASAPLOGIN.txtTcodeClick).click();
        
      //   await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
      //   await browser.pause(2000);
      //   await sap.keyboardActions('Enter');
      //   await browser.pause(6000);
      //   console.log("Tcode entered sa38");
      //   await waitForElement (await $(QASAPLOGIN.txtProgram));
      //   await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'RSNAST00');
      //    await browser.pause(6000);
      //   await sap.keyboardActionsF8('F8');
      //   // await waitForElement(await $(`//div[@title='Execute (F8)']`));
      //   // await $(`//div[@title='Execute (F8)']`).click();
      //   await browser.pause(6000);
        
  
      //  // (await $(QASAPLOGIN.rsnastOutputType)).waitForDisplayed({ timeout: 60000 });
      //   await (await $(QASAPLOGIN.rsnastOutputType)).click();
      //   await browser.pause(4000);
      //   await (await $(QASAPLOGIN.rsnastOutputType)).addValue("V2");
      //   console.log("Output Application entered!");

      //   (await $(QASAPLOGIN.rsnastObjectKey)).waitForDisplayed({ timeout: 60000 });
      //   await (await $(QASAPLOGIN.rsnastObjectKey)).click();
      //   await browser.pause(4000);
      //   await $(QASAPLOGIN.rsnastObjectKey).addValue(dintNum);
      //   console.log("Object Key entered!");

      //   (await $(QASAPLOGIN.rsnastZESCOutputType)).waitForDisplayed({ timeout: 60000 });
      //   await (await $(QASAPLOGIN.rsnastZESCOutputType)).click();
      //   await browser.pause(4000);
      //   await $(QASAPLOGIN.rsnastZESCOutputType).addValue('ZESC');
      //   console.log("Output type is entered!");

      //   await $(QASAPLOGIN.rsnastExecuteBtn).waitForDisplayed({ timeout: 60000 });
      //   await (await $(QASAPLOGIN.rsnastExecuteBtn)).click();
      //   await browser.pause(16000);
      //   console.log("Execute Button is clicked!");


      //   await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 60000 });
      //   await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      //   await browser.pause(4000);
      //   console.log("Continue Button clicked in RSNAST POP UP!");
      //   await browser.pause(4000);
        

      //   await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 60000 });
      //   await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      //   await browser.pause(4000);
      //   console.log("Continue Button clicked in RSNAST POP UP second!");
      //   await browser.pause(4000);

      //     //}
                  
          

      //  // else{
      //    // console.log("Entering to else..!");
      //      (await (await $(`//span[contains(@title,'Successfully processed')]`)).isDisplayed() === true)
      //       {
       
      //   console.log("ZESC is processed ..with RSNAST..");
      //   await browser.pause(5000);
      //   // await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      //   // await sap.keyboardActions('Enter');
      //   // await browser.pause(5000);
      //   // const orderNum=await sap.getOrderNumber();
      //   // //await sapLogin.getOrderNumber();
      //   // (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
      //   // await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
      //   //   await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
      //   //  await sap.keyboardActions('Enter');
      //   //  //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
      //   //  console.log("VA03 order opened");
      //   //  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
      //   // await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
      //   // await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
      //   // console.log("Document flow is opened!");
      //   // await browser.pause(2000);

      //  // await sap.checkODb("/nva03");
      //   }
    //  }
     });

     Then(/^the user process with RSNSAT$/, async() => {

      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
      await browser.pause(2000);
      await sap.keyboardActions('Enter');
      await browser.pause(6000);
      console.log("Tcode entered sa38");
      await $(QASAPLOGIN.txtProgram).clearValue();
      await browser.pause(3000);
      await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'RSNAST00');
      await browser.pause(2000);
    //await sap.keyboardActions('Enter');
      await sap.keyboardActionsF8('F8');
      // await waitForElement(await $(`//div[@title='Execute (F8)']`));
      // await $(`//div[@title='Execute (F8)']`).click();
      await browser.pause(6000);
     // (await $(QASAPLOGIN.rsnastOutputType)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.rsnastOutputType)).click();
      await browser.pause(4000);
      await (await $(QASAPLOGIN.rsnastOutputType)).addValue("V2");
      console.log("Output Application entered!");

      (await $(QASAPLOGIN.rsnastObjectKey)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.rsnastObjectKey)).click();
      await browser.pause(4000);
     // let paddedDINT=dintNum.toString().padStart(2, '0');
      //const zeroPad = String(dintNum).padStart(2, '0');
      const zeroPad =String(dintNum). padStart(10, "0");

      console.log(zeroPad);
      await $(QASAPLOGIN.rsnastObjectKey).addValue(zeroPad);
      console.log("Object Key entered!");

      (await $(QASAPLOGIN.rsnastZESCOutputType)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.rsnastZESCOutputType)).click();
      await browser.pause(4000);
      await $(QASAPLOGIN.rsnastZESCOutputType).addValue('ZESC');
      console.log("Output type is entered!");

      await $(QASAPLOGIN.rsnastExecuteBtn).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.rsnastExecuteBtn)).click();
      await browser.pause(6000);
      console.log("Execute Button is clicked!");
      let done=false;

      while(!done){
        console.log(done);
        console.log("Waiting for tick mark");
        if(await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).isDisplayed()){
          await browser.pause(500);
          await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
        done=true;
        console.log(done);
        console.log("Continue button from RSNAST is clicked!!")
        }else
        await browser.pause(5000);
    }

     // await waitForElement(await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn));
     
      // await $(QASAPLOGIN.rsnastLoading1).waitForExist({timeout:60000,reverse: true });
      // console.log("First wait for exist");
      //      // await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 120000 });
      // await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click(); 
      // //await browser.pause(6000);
      // console.log("Continue Button clicked in RSNAST POP UP!");
      // //await browser.pause(8000);

      //await $(QASAPLOGIN.rsnastLoading2).waitForExist({ reverse: true });
      await $(QASAPLOGIN.rsnastSuccMsg).waitForDisplayed({ timeout: 60000 });
      //await expect($(QASAPLOGIN.rsnastSuccMsg)).toBeDisplayed();
      console.log("rsnast succ msg-odb msg");
      await browser.pause(5000);
      // let rsnastSuccmsg=await $(QASAPLOGIN.rsnastSuccMsg).getText();
      // //await browser.pause(6000);
      // console.log(rsnastSuccmsg);
      
      //await browser.pause(2000);
      let done2=false;
      while(!done2){
        console.log(done2);
        console.log("Waiting second clsoe button in RSNAST..");
        if(await $(QASAPLOGIN.authSuccClose).isDisplayed()){
          await browser.pause(500);
          await $(QASAPLOGIN.authSuccClose).click();
          console.log("Close 2 Button clicked in RSNAST POP UP!");
          done2=true;
        console.log(done2);
        }else
        await browser.pause(5000);
    }
      // await $(QASAPLOGIN.authSuccClose).waitForDisplayed({ timeout: 60000 });
      // await $(QASAPLOGIN.authSuccClose).click(); 
      // await browser.pause(6000)
      // await $(QASAPLOGIN.rsnastSuccMsg).waitForDisplayed({ reverse: true })
      // console.log("Close 2 Button clicked in RSNAST POP UP!");
      //await browser.pause(2000);


      await $(QASAPLOGIN.rsnastInfoScreen).waitForDisplayed({ timeout: 60000 });
      console.log("Info screen displayed");


      let done3=false;
      while(!done3){
        console.log(done3);
        console.log("Waiting last close button ..");
        if(await $(QASAPLOGIN.authSuccClose).isDisplayed()){
          await browser.pause(500);
          await $(QASAPLOGIN.authSuccClose).click();
          console.log("Close 3 Button clicked in RSNAST POP UP!");
          done3=true;
        console.log(done3);
        }else
        await browser.pause(5000);
    }
    

      // await $(QASAPLOGIN.authSuccClose).waitForDisplayed({ timeout: 90000 });
      // await browser.pause(6000)
      // await $(QASAPLOGIN.authSuccClose).click();
      // // await browser.pause(8000);
       await browser.pause(2000);
      // //await $(QASAPLOGIN.rsnastInfoScreen).waitForDisplayed({ reverse: true })
      console.log("Last Continue Button clicked in RSNAST POP UP!");
      
      // while (!secondCtnBtn && (Date.now() - startTime) < MAX_WAIT_TIME) {

      //   if ((await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn)).isDisplayed)
      //     {
      //       await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      //     //await browser.pause(6000);
      //     console.log("Continue Button clicked in RSNAST POP UP second!");
      //    // await browser.pause(6000);
            
      //            console.log("SecondBTn clicked");
              
     
      //         }  
      //         secondCtnBtn = true;                
      //     }
      //     if (!secondCtnBtn) {
      //       console.log("Waiting for second continue btn, waiting...");
      //       await browser.pause(CHECK_INTERVAL);
      //   }
    

      //await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 60000 });
      // await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      // await browser.pause(6000);
      // console.log("Continue Button clicked in RSNAST POP UP second!");
      // await browser.pause(6000);


     });

     Then(/^the user check the Outbound Delivery(.*)$/, async(Tcode) => {
        await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        const orderNum=await sap.getOrderNumber();
        //await sapLogin.getOrderNumber();
        await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
          await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        await browser.pause(5000);
        // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
        console.log("VA03 order opened");
        await browser.pause(8000);

        await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
        console.log("Website order Text is clicked now");
        await browser.pause(5000);
        await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
        //await $(`//div[contains(@title,'Display Document Flow (F5)')]`).click();
        
        //await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        await browser.pause(6000);
        console.log("Display document flow is opened");
   
        await browser.pause(2000);
        //(await $(QASAPLOGIN.va03ODB)).waitForDisplayed({ timeout: 60000 });
       // await waitForElement (await $(QASAPLOGIN.va03ODB));
        if (await $(QASAPLOGIN.va03ODB).isDisplayed())
        {
          obdNum= await (await $(QASAPLOGIN.va03ODB)).getText();
          console.log("ODB is created!",obdNum);
          await browser.pause(2000);
          (await $(QASAPLOGIN.obdDocument)).doubleClick();
          obdNum=await $(QASAPLOGIN.va03PONUM).getText();
          console.log(obdNum);
          await browser.pause(2000);

        }
        else{
          console.log("ODB is not created!");
        }
        await browser.pause(2000);
  
  });

    Then(/^the user do the MIGO$/, async () => {
    //Enter PO number below to be taken from another program.Right now using order no as dont have code for it
    
      await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nva03'); 
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        const orderNum=await sap.getOrderNumber();
        //await sapLogin.getOrderNumber();
        await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
          await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        await browser.pause(5000);
        // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
        console.log("VA03 order opened");
        await browser.pause(8000);

        await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
        console.log("Website order Text is clicked now");
        await browser.pause(5000);
        await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
        //await $(`//div[contains(@title,'Display Document Flow (F5)')]`).click();
        
        //await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        await browser.pause(6000);
        console.log("Display document flow is opened");
        await browser.pause(5000);
      await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
      console.log("POnumber is clicked");
      (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
      await browser.pause(2000);
      await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
      console.log("PO Document is opened!");
      await browser.pause(6000);
   
    // //if ( expect(QASAPLOGIN.purOrdHistTab).toBeDisplayed()){
    //      console.log("Purchase order history tab available");
    //      await sap.clicktheBtnXpath(QASAPLOGIN.purOrdHistTab);
       
        if ((await $(QASAPLOGIN.gr101)).isDisplayed)
           {
           console.log("GR101 already created no need for MIGO step");
           }
        else
          {
          const orderNum = await sap.getOrderNumber();
          await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,"MIGO");
          await sap.keyboardActions('Enter');
          await browser.pause(3000);
          await console.log("before entering purchase order no");
          await sap.enterTextInTextBox(QASAPLOGIN.migoPO,orderNum);
          await browser.pause(6000);
          await console.log("Entered PO in MIGO");
          await sap.enterTextInTextBox(QASAPLOGIN.migoSite,"9775");
          await sap.keyboardActions('Enter');
          await browser.pause(4000);    
    //need order for which PO deatils are displaying to move further like clicking checkbox, posting gods issue
    //Creating code for Step 19: Verify in Purchase order history tab now GR with Mvt type 101 is created
         await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,"/nva03");
         await sap.keyboardActions('Enter');
         await browser.pause(3000);
         await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
         await sap.keyboardActions('Enter');
         await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn);
         await browser.pause(8000);
            await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
          console.log("Website order Text is clicked now");
          await browser.pause(5000);
         await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
          await browser.pause(6000);
          console.log("Display document flow is opened");
          await $(QASAPLOGIN.va03DisplayDocPONum).click();
         console.log("POnumber is clicked");
         //(await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
         await browser.pause(5000);
         await ( $(QASAPLOGIN.va03PODisplyDoc)).click();
         console.log("PO Document is opened!");
         await browser.pause(6000);
         if ((await $(QASAPLOGIN.gr101)).isDisplayed)
          {
          console.log("GR101 created after MIGO ");
          }
          else {
            console.log("GR101 not created even after MIGO");
          }
       
         };
        }
    // else {
    //           console.log("Purchase order history tab not available");
    //     }
 // }
  );
Then(/^the user removes Billing Block$/, async () => {
  //Enter Delivery number below to be taken from another program.Right now using order no as dont have code for it
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
  await sap.keyboardActions('Enter');
  console.log("before entering program name");
  await browser.pause(6000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'YDSDE_ENHD231_GI_TRIGGER');
  await browser.pause(6000);
  //await sap.sleep(5000);
  //browser.debug();
  console.log("Entered program name in Billing block");
  //await sap.keyboardActions('Enter');
  await browser.pause(6000);
  await waitForElement (await $(QASAPLOGIN.execute));
  await sap.clicktheBtnXpath(QASAPLOGIN.execute);
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.bbDeliveryType,'ZLF');
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.bbDeliveryNo,orderNum);
  await browser.pause(5000);
  await sap.clicktheBtnXpath(QASAPLOGIN.bbCheckbox);
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  //await waitForElement (await $(QASAPLOGIN.authSuccessTick));
  await browser.pause(8000);


  //  Step 24 start
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nva03');
        await sap.keyboardActions('Enter');
        //await sapLogin.getOrderNumber();
        await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn);
        console.log("VA03 order opened");
        await sap.clicktheBtnXpath(QASAPLOGIN.bbItemdoubleClick);
       // await sap.clicktheBtnXpath(QASAPLOGIN.bbItemdoubleClick);
        await browser.pause(2000);
        await sap.clicktheBtnXpath(QASAPLOGIN.bbBillingPlan);
        const bbBlock = await $(QASAPLOGIN.bbBlock).getText();
        if (bbBlock!='02')
          {
        await console.log("Billing block removed");
        }
        else
        {
        await console.log("Billing block not removed");
        }
  });

  // Release PGI
 
  Then(/^the user go to OBD PGI for releasing the delivery (.*)$/, async(Tcode) =>{
    await browser.pause(2000);
      const orderNum=await sap.getOrderNumber();
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      console.log("tcode entered");
      await sap.keyboardActions('Enter');
      await browser.pause(2000);
      (await $(QASAPLOGIN.txtProgram)).waitForDisplayed({ timeout: 60000 });
      await $(QASAPLOGIN.txtProgram).clearValue();    
      await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'WS_MONITOR_OUTB_DEL_GDSI');
     // await $(`//input[@title='ABAP Program Name']`).addValue('WS_MONITOR_OUTB_DEL_GDSI');
      //await sap.enterProgramName(QASAPLOGIN.sa38ProgramtxtBox,'RV60SBAT');
      console.log("prog name entered");
      await sap.keyboardActions('Enter');
      await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
      console.log("prog executed ");  
      await browser.pause(2000);
      await sap.enterTextInTextBox(QASAPLOGIN.deliveryCode,obdNum);
      console.log("obdNum entered ");
      await browser.pause(2000);
      await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
      console.log("prog executed ");
      await browser.pause(5000);
      (await $(QASAPLOGIN.deliverychkbx)).click();
      console.log("deliverychkbx checkbox clicked");
      await browser.pause(4000);
      (await $(QASAPLOGIN.postGoodsIssueOnOBDPage)).click();
        console.log("post goods issue btn clicked on prog page");
        await browser.pause(3000);
        (await $(QASAPLOGIN.CalenderContinue)).click();
        console.log("continue btn clicked");
        await browser.pause(2000);
});

  Then(/^the user go to va03 to verify GI status (.*)$/, async(Tcode) =>{
    await browser.pause(2000);
       const orderNum=await sap.getOrderNumber();
       await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
       await sap.keyboardActions('Enter');
       (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
       (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();      
       await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
       await sap.keyboardActions('Enter');
       console.log("order entered");  
        await browser.pause(6000);
       await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
       await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
       console.log("disply Doc btn clicked");
 
       //verify GIcom stock created
 
       await browser.pause(6000);
       await waitForElement (await $(QASAPLOGIN.GICOMStockDoc));
        const GIStockDoc=await $(QASAPLOGIN.GICOMStockDoc).getText();
        await browser.pause(2000);
        console.log(GIStockDoc);
        if (GIStockDoc.includes('GI COM Stock Item'))
          {
             console.log('GI COM Stock Item generated "${GI COM Stock Item}"');
          }
        else
        {
         console.log("GI COM Stock Item not generated");
        }
        console.log(" completed ");
        await browser.pause(2000);  
   
  });
  Then(/^the user removes Billing Block (.*)$/, async(Tcode)=> {
    await browser.pause(2000);
      const orderNum=await sap.getOrderNumber();
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      await sap.keyboardActions('Enter');
      await browser.pause(2000);
      (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
      (await $(QASAPLOGIN.txtProgram)).clearValue();
      await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'YDSDE_ENHD231_GI_TRIGGER');
      await browser.pause(2000);
      await sap.keyboardActions('Enter');
      console.log("Entered program name in Billing block");
      //await waitForElement (await $(QASAPLOGIN.execute));
      await browser.pause(2000);
      await sap.clicktheBtnXpath(QASAPLOGIN.execute);
      console.log("execute clicked");
      (await $(QASAPLOGIN.bbDeliveryType)).clearValue();
      await sap.enterTextInTextBox(QASAPLOGIN.bbDeliveryType,"ZLF");
      await browser.pause(4000);
      console.log("zlf entered");
      await sap.enterTextInTextBox(QASAPLOGIN.bbDeliveryNo,obdNum);
      await browser.pause(5000);
      console.log("obd entered");
      await sap.clicktheBtnXpath(QASAPLOGIN.bbCheckbox);
      await browser.pause(2000);
      await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
      console.log("execution completed");
      await browser.pause(2000);
     
    });
    Then(/^the user verify billing block removed(.*)$/, async(Tcode)=> {
      //   await browser.pause(2000);
      //   await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      //   await sap.keyboardActions('Enter');
      //   await browser.pause(2000);
      //   const orderNum=await sap.getOrderNumber();
      //   //await sapLogin.getOrderNumber();
      //   (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();  
      //   await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
      //   console.log("order entered");      
      //   await sap.keyboardActions('Enter');
      //   await browser.pause(3000);
      //   // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
      //   // console.log("Continue btn clicked");
      //   // await browser.pause(2000);
      // // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
      // //  await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed()
      //   console.log("VA03 order opened");
      //   await browser.pause(3000);
      //   (await $(QASAPLOGIN.bbItemdoubleClick)).doubleClick();
      //   await browser.pause(2000);
      //   console.log("bbItemdoubleClick clicked");
      //   await sap.clicktheBtnXpath(QASAPLOGIN.bbBillingPlan);
      //   await browser.pause(2000);
      //   console.log("billing plan opened");
      //   await sap.pageScrollTillBottomPage();
      //   await browser.pause(2000);
      //   console.log("Page scrolled");
      //   const bbBlock = await $(QASAPLOGIN.bbBlock).getText();
      //   console.log(bbBlock);
      //   await browser.pause(2000);
      //   if (bbBlock!="02")
      //     {
      //  console.log("Billing block removed");
      //   }
      //   else
      //   {
      //        console.log("Billing block not removed");
      //   }
      //   (await $(QASAPLOGIN.va03NextItem)).waitForDisplayed({ timeout:60000})
      //     await $(QASAPLOGIN.va03NextItem).click();
      //     await browser.pause(2000);
      //     (await $(QASAPLOGIN.bbBlock2)).waitForDisplayed({ timeout:60000})
      //   console.log("billing plan opened");
      //   await sap.pageScrollTillBottomPage();
      //   await browser.pause(2000);
      //   console.log("Page scrolled");
      //   const bbBlock2 = await $(QASAPLOGIN.bbBlock2).getText();
      //   console.log(bbBlock2);
      //   await browser.pause(2000);
      //   if (bbBlock2!="02")
      //     {
      //  console.log("Billing block removed for invoice");
      //   }
      //   else
      //   {
      //        console.log("Billing block not removed for invoice");
      //   }

      // Priyanka code

      await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
        const orderNum=await sap.getOrderNumber();
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        await $(QASAPLOGIN.va03OrderNumtxtBox).waitForDisplayed({ timeout: 60000 });
        await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
          await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
        console.log("VA03 order opened");
        await browser.pause(2000);    
        await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed()
        console.log("VA03 order opened");
        await browser.pause(2000);
        (await $(QASAPLOGIN.bbItemdoubleClick)).doubleClick();
        await browser.pause(2000);
        console.log("bbItemdoubleClick clicked");
        await sap.clicktheBtnXpath(QASAPLOGIN.bbBillingPlan);
        await browser.pause(2000);
        console.log("billing plan opened");
        const bbBlock = await $(QASAPLOGIN.bbBlock).getText();
        await browser.pause(2000);
        if (bbBlock!="02")
          {
             console.log("Billing block removed");
        }
        else
        {
             console.log("Billing block not removed");
           
        }
        await browser.pause(2000);
    });

  
  Then(/^the user process F2 Invoice$/, async() =>{
    await browser.pause(2000);
    console.log("Inside F2 invoice");
    (await $(QASAPLOGIN.txtTcode)).waitForDisplayed({ timeout: 60000 });
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    (await $(QASAPLOGIN.txtProgram)).waitForDisplayed({ timeout: 60000 });
    await $(QASAPLOGIN.txtProgram).clearValue();
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'RV60SBAT');
    console.log("prog name entered");
    await sap.keyboardActions('Enter');
    // await browser.pause(2000);
     const orderNum=await sap.getOrderNumber();
    (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("prog executed ");
    (await $(QASAPLOGIN.salesOrg)).waitForDisplayed({ timeout: 60000 });
    await sap.enterTextInTextBox(QASAPLOGIN.salesOrg,'1019');
    console.log("sales org entered");
    await sap.keyboardActions('Enter');
    await sap.enterTextInTextBox(QASAPLOGIN.sdDocument,orderNum);
    console.log("order no entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    (await $(QASAPLOGIN.salesOrderchkBx)).waitForDisplayed({ timeout: 60000 });
    (await $(QASAPLOGIN.salesOrderchkBx)).click();
    console.log("salesOrderchkBx checked");
    await browser.pause(2000);
    (await $(QASAPLOGIN.deliverieschkBx)).click();
    console.log("deliverieschkBx unchecked");
    await browser.pause(2000);
    (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("Executed");
   
    let done = false;
    while(!done){
      console.log(done);
      console.log("Waiting for job name");
      if(await $(QASAPLOGIN.JobName).isDisplayed()){
        await browser.pause(500);
        jobName=await $(QASAPLOGIN.JobName).getText();
      console.log(jobName);
      done=true;
      console.log(done);
      }else
      await browser.pause(5000);
   }
    // (await $(QASAPLOGIN.JobName)).waitForDisplayed({ timeout: 60000 });
    // jobName=await $(QASAPLOGIN.JobName).getText();
    // console.log(jobName);
     await browser.pause(2000);
    });
    Then(/^the user goto sa37 to verify job scheduled release(.*)$/, async(Tcode) =>{
      const orderNum=await sap.getOrderNumber();
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      await sap.keyboardActions('Enter');
      console.log("tcode entered ");
      await browser.pause(2000);
      (await $(QASAPLOGIN.JobNametext)).waitForDisplayed({ timeout: 60000 });
      (await $(QASAPLOGIN.JobNametext)).clearValue();
      await sap.enterTextInTextBox(QASAPLOGIN.JobNametext,jobName);
      // await sap.enterProgramName(QASAPLOGIN.jobName,'INVOICE_240930_062933_01_VCQS7AP');
      await sap.keyboardActions('Enter');
      console.log("job name entered");
      await browser.pause(2000);
      (await $(QASAPLOGIN.schedChkBx)).waitForDisplayed({ timeout: 60000 });
      (await $(QASAPLOGIN.schedChkBx)).click();
      console.log("schedChkBx checked");
      (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
      await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
      await browser.pause(2000);
      console.log("Execution completed for sm37");
      await browser.pause(2000);
      //verify job status
      (await $(QASAPLOGIN.jobStatus)).waitForDisplayed({ timeout: 60000 });
      let jobStatus= await (await $(QASAPLOGIN.jobStatus)).getText();
      console.log(jobStatus);
     
      (await $(QASAPLOGIN.checkbxClicked)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.checkbxClicked)).click();
      await browser.pause(4000);
      console.log("checkbox checked!");
 
      (await $(QASAPLOGIN.replinishDelMenu)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.replinishDelMenu)).click();
      await browser.pause(4000);
      console.log("Menu Clicked!");
 
      (await $(QASAPLOGIN.releaseMenuJob)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.releaseMenuJob)).click();
      await browser.pause(4000);
      console.log("Job Clicked!");
 
      (await $(QASAPLOGIN.releaseMenuReleaseScheduled)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.releaseMenuReleaseScheduled)).click();
      await browser.pause(6000);
      console.log("Released Scheduled is Clicked!");
     
      (await $(QASAPLOGIN.releasebtn)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.releasebtn)).click();
      await browser.pause(6000);
      console.log("Released btn is Clicked!");
     
      (await $(QASAPLOGIN.immediateReleasebtn)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.immediateReleasebtn)).click();
      await browser.pause(6000);
      console.log("Released btn is Clicked!");
   
      (await $(QASAPLOGIN.releaseSave)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.releaseSave)).click();
      await browser.pause(6000);
      console.log("save btn is Clicked!");
    });

  Then(/^user go to va03 to check status for OBD and GI COM stock (.*)$/ , async(Tcode) =>{
    await browser.pause(5000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      await sap.keyboardActions('Enter');
     const orderNum=await sap.getOrderNumber();
     //await sapLogin.getOrderNumber();
     await browser.pause(5000);
      (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
      await browser.pause(5000)
      await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
      await sap.keyboardActions('Enter');
      console.log("order entered");
      (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
      console.log("Continue btn clicked");
      await browser.pause(6000);
      (await $(QASAPLOGIN.va03WebsiteOrderTxt)).waitForDisplayed({ timeout: 60000 });
      await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
      console.log("Website order Text is clicked now");
      await browser.pause(5000);
      await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
      //await $(`//div[contains(@title,'Display Document Flow (F5)')]`).click();
      
      //await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
      await browser.pause(6000);
      console.log("Display document flow is opened");

   });

   // F2 Inovice process
 
   Then(/^the user process F2 Invoice (.*)$/, async(Tcode) =>{
    const orderNum=await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
    console.log("tcode entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    await $(`//input[@title='ABAP Program Name']`).addValue('RV60SBAT');
    //await sap.enterProgramName(QASAPLOGIN.sa38ProgramtxtBox,'RV60SBAT');
    console.log("prog name entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("prog executed ");
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.salesOrg,'1019');
    console.log("sales org entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.sdDocument,orderNum);
    console.log("order no entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    (await $(QASAPLOGIN.salesOrderchkBx)).click();
    console.log("salesOrderchk Bx checked");
    await browser.pause(2000);
    (await $(QASAPLOGIN.deliverieschkBx)).click();
    console.log("deliveries chkBx unchecked");
    await browser.pause(5000);
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("Executed");



//here we will get job name need to save that n need to use in next sm37 prog
    // await browser.pause(2000);
    // const jobName=await $(QASAPLOGIN.JobInvoiceName).getText();
    // console.log(jobName);

    //  Verify in va03 invoice is created
  });

  Then(/^user verify Invoice doc created in (.*)$/ , async(Tcode) =>{
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      await sap.keyboardActions('Enter');
     const orderNum=await sap.getOrderNumber();
     //await sapLogin.getOrderNumber();
      (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
      await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
      await sap.keyboardActions('Enter');
      console.log("order entered");
      (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
      console.log("clicked on continue btn");
     (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
     await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
     await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
     console.log("Display clicked");
     await browser.pause(2000);

     //not tested validation part
//    let invoice= await (await $(QASAPLOGIN.invoiceDoc)).getText();
//    if (invoice === "completed")
 //   {
//    console.log("invoice is created!",invoice );
//      }
//    else
//    {
//       console.log("invoice is not created!",invoice );
//     }
   
});
 
    //step 26 sm37 steps these are manual step no need to execute
    Then(/^the user goto sa37 to veiry job scheduled release (.*)$/, async(Tcode) =>{
      const orderNum=await sap.getOrderNumber();
      //need to save job name and use it again in sm37
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      await sap.keyboardActions('Enter');
      console.log("tcode entered ");
      await browser.pause(2000);
      await $(`//*[@title='Background job name']`).addValue('INVOICE_240930_062933_01_VCQS7AP');
    // await sap.enterProgramName(QASAPLOGIN.jobName,'INVOICE_240930_062933_01_VCQS7AP');
      await sap.keyboardActions('Enter');
      console.log("job name entered");
      await browser.pause(2000);
      (await $(QASAPLOGIN.schedChkBx)).click();
      console.log("schedChkBx checked");
      await sap.clicktheBtnXpath(QASAPLOGIN.salesDocExecuteBtn);
      //need to check step 26 steps here
    });

    //Invoice is created but in open state need to change status as complete
    Then(/^user goto invoice document to complete (.*)$/ , async(Tcode) =>{
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
        await sap.keyboardActions('Enter');
      const orderNum=await sap.getOrderNumber();
      //await sapLogin.getOrderNumber();
        (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
        await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        console.log("order entered");
        (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
        console.log("clicked on continue btn");
      (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
      await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
      await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
      console.log("DPR");
      (await $(QASAPLOGIN.invoiceDoc)).click();
      await sap.sleep(5000);
      console.log("invoice clicked");
      await browser.pause(2000);
      (await $(QASAPLOGIN.displayDocumentBtn)).click();      
      console.log("displayDocumentBtn clicked");
      await browser.pause(2000);
      (await $(QASAPLOGIN.changeBtn)).click();
      console.log("change btn clicked");
      await browser.pause(2000);
      await sap.enterTextInTextBox(QASAPLOGIN.companyCode,'1019');
      console.log("company code entered");
      await browser.pause(2000);
      (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
      console.log("clicked on continue btn");
      //await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
      //*[@title='Display header details']
      await browser.pause(5000);
      (await $(QASAPLOGIN.displayHeaderDetails)).click();
      console.log("clicked on header details btn");
      //select date as todays date here
      await browser.pause(2000);
      (await $(QASAPLOGIN.billingDateTxt)).click();
      console.log("clicked on billingDatetxt");
      (await $(QASAPLOGIN.billingDatebtn)).click();
      console.log("clicked on billingDatebtn");
      await browser.pause(5000);

      let currentDate: string;

        const formatDate = (date: Date): string => {
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
        };
        const date = new Date();
        currentDate = formatDate(date); // Format as MM/DD/YYYY
        console.log(`Current Date: ${currentDate}`);

      (await $(QASAPLOGIN.billingDateTxt)).clearValue();
      await sap.enterTextInTextBox(QASAPLOGIN.billingDateTxt,currentDate);
      console.log("current date entered");
    
      (await $(QASAPLOGIN.currentDatePicker)).click();
      await browser.pause(5000);
      console.log("clicked on current date");
      //write code to select current date from calender
      //click on calender continue button
      (await $(QASAPLOGIN.CalenderContinue)).click();
      await browser.pause(5000);
      (await $(QASAPLOGIN.saveBtn)).click();
      //verify that journal entry is created in feature file using va03 again
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nVA03');
      await sap.keyboardActions('Enter');
      //await sapLogin.getOrderNumber();
      (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
      await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
      await sap.keyboardActions('Enter');
      console.log("order entered");
      (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
      console.log("clicked on continue btn");
      (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
      await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
      await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
      console.log("verify Journal entry created");
      });
      Then(/^the user wait for 15 min to verify Invoice is generated(.*)$/ , async(Tcode) =>{
        await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
        const orderNum=await sap.getOrderNumber();
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        await $(QASAPLOGIN.va03OrderNumtxtBox).waitForDisplayed({ timeout: 60000 });
        await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
          await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        console.log("VA03 order opened");
        await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({ timeout: 60000 });
        await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        console.log("displayed doc open");
        for (let i=0;i<=7;i++)
        {
        let done=false;                 
            while(!done){
              console.log(done);
              console.log("Waiting for invoice");
              if(await $(QASAPLOGIN.invoiceDoc).isDisplayed()){
                await browser.pause(500);
                console.log("Invoice generated!");
              done=true;
              console.log(done);
              }else
              await browser.pause(250000);
              await (await $(QASAPLOGIN.va03backBtn)).click();
              await browser.pause(1000);
              console.log("back button is clicked !"); 
              await browser.pause(1000);
              await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({ timeout: 60000 });
              await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
              console.log("displayed doc open");
              await browser.pause(1000);
            }

          }
      });
      Then(/^the user verify Invoice doc created and complete the status (.*)$/ , async(Tcode) =>{
        await browser.pause(4000);
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
              await sap.keyboardActions('Enter');
              const orderNum=await sap.getOrderNumber();
              //await sapLogin.getOrderNumber();
              (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
                await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
              await sap.keyboardActions('Enter');
              //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
              console.log("VA03 order opened");
               (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({ timeout: 60000 });
              await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
              console.log("Document flow is opened!");
              await browser.pause(2000);
              (await $(QASAPLOGIN.invoiceDoc)).waitForDisplayed({ timeout: 60000 });
              (await $(QASAPLOGIN.invoiceDoc)).click();
              await browser.pause(6000);
               console.log("invoice clicked");
               await browser.pause(2000);
               await ( $(QASAPLOGIN.va03PODisplyDoc)).click();    
               console.log("displayDocumentBtn clicked");
               await browser.pause(6000);
               (await $(QASAPLOGIN.changeBtn)).waitForDisplayed({ timeout: 60000 });
               (await $(QASAPLOGIN.changeBtn)).click();
               console.log("change btn clicked");
               await browser.pause(6000);
               (await $(QASAPLOGIN.companyCode)).waitForDisplayed({ timeout: 60000 });
               await sap.enterTextInTextBox(QASAPLOGIN.companyCode,'1019');
               console.log("company code entered");
               await browser.pause(3000);
               await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
               console.log("clicked on continue btn");
               await browser.pause(6000);
               (await $(QASAPLOGIN.displayHeaderDetails)).waitForDisplayed({ timeout: 60000 });
               (await $(QASAPLOGIN.displayHeaderDetails)).click();
               console.log("clicked on header details btn");
               //select date as todays date here
               await browser.pause(3000);
               (await $(QASAPLOGIN.billingDateTxt)).click();
               console.log("clicked on billingDatetxt");
               let currentDate: string;

            const formatDate = (date: Date): string => {
             const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
             const day = String(date.getDate()).padStart(2, '0');
             const year = date.getFullYear();
             return `${month}/${day}/${year}`;
             };
             const date = new Date();
             currentDate = formatDate(date); // Format as MM/DD/YYYY
             console.log(`Current Date: ${currentDate}`);
             await browser.pause(3000);
                await (await $(QASAPLOGIN.billingDateTxt)).clearValue(); // Added await
                await sap.enterTextInTextBox(QASAPLOGIN.billingDateTxt, currentDate);
                console.log("Current date entered");
                await browser.pause(6000);
                await (await $(QASAPLOGIN.billingDatebtn)).click(); // Added await
                console.log("Calendar opened");
                await browser.pause(6000);
                await (await $(QASAPLOGIN.CalenderContinue)).click(); // Added await
                console.log("Calendar continue button clicked");
                await browser.pause(6000);
                await (await $(QASAPLOGIN.saveBtn)).click();
                console.log("save btn clicked");
                await browser.pause(6000);     
              
    });




    Then(/^the user verify journal entry creation (.*)$/ , async(Tcode) =>{
      await browser.pause(2000);
      const orderNum=await sap.getOrderNumber();
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
      await sap.keyboardActions('Enter');
      await browser.pause(3000);
     //await sapLogin.getOrderNumber();
       await $(QASAPLOGIN.va03OrderNumtxtBox).waitForDisplayed({ timeout: 60000 });
      (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
      await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
      await sap.keyboardActions('Enter');
      console.log("order entered");
      await browser.pause(3000);
      await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({ timeout: 60000 });
     await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
     await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
     console.log("verify Journal entry created");
     await browser.pause(6000);
     let journalStatus= await (await $(QASAPLOGIN.journalStatus)).getText();
     console.log(journalStatus);
     
     if (journalStatus === "Cleared")
     {
     console.log("journalStatus is cleared!",journalStatus );
     }
     else
     {
       console.log("journalStatus is not cleared!",journalStatus );
     }
                                                                        
    });