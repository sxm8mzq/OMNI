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
import bd87Page from '../pageObjects/bd87Page.js';
import {QASAPLOGIN } from '../pageRepository/pageFactory.js'
import { waitForElement } from "../pageObjects/page.js";
let    ODBNum;
let  idocnum="";
let  POnum ="";
let odbNumExtracted="";
let GI="";
let  flag=0;
let dintNum="";

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

Then(/^the user enters the "([^"]*)?" card details$/, async (cardType) => {
  await checkOut.paymentMethod(cardType);
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
//  SAP

Then(/^the user launches the SAP url and login to SAP$/, async () => {
  console.log("inside page definition");
  await sap.launchSAPUrl();
  await sap.enterTextInTextBox(QASAPLOGIN.txtSAPUserIdqs7,'sxm8mzq');
  await sap.enterTextInTextBox(QASAPLOGIN.txtSAPPaswdqs7,'Sep@2024');
  // await sap.enterTextInTextBox(QASAPLOGIN.txtSAPUserIdqs7,'TSTAUTO2');
  // await sap.enterTextInTextBox(QASAPLOGIN.txtSAPPaswdqs7,'homedepot');
  await sap.clicktheBtnXpath(QASAPLOGIN.signInqs7);
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
  console.log("VA03 order opened");
});

  Then(/^the user do the authorization$/, async () => {
    console.log("inside auth prgm");
  const orderNum=await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
  await sap.keyboardActions('Enter');
   console.log("Before entering program name");
   await browser.pause(2000);
  await $(`//input[@title='ABAP Program Name']`).addValue('YDCOM_BATCH_FULL_AUTH_NEW');
  await waitForElement(await $(`//div[@title='Execute (F8)']`));
  await $(`//div[@title='Execute (F8)']`).click();
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.authOrderno,orderNum);
  await browser.pause(5000);
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  console.log("Clicked Execute btn");
  //await waitForElement(await $(QASAPLOGIN.authCardApprovedTxt));
  await browser.pause(8000);
  console.log("Waiting for tick mark");
  await sap.clicktheBtnXpath(QASAPLOGIN.authSuccessTick);
  await browser.pause(8000);
  console.log("Tick mark clicked");
  await browser.pause(6000);
  await expect($(QASAPLOGIN.authCardApprovedTxt)).toBeDisplayed();

  //await waitForElement (await $(QASAPLOGIN.authSuccessTick));
  //await waitForElement (await $(QASAPLOGIN.authSuccClose));
  //await $(QASAPLOGIN.authSuccClose).click();

  // for(let i=0;i<8;i++){
  //   let shouldBreak1=false;
    
    // // bh.jsClick(" ",QAFIORILOGINPF.sucmsg);
    
    // var current = new Date();
    // let min =current.getMinutes();
    // console.log("Awaiting for the payload to generate: "+i+" "+min);
    

  //   if (await $(`//button[contains(@title,'Close')]`).isDisplayed()) {
  //     shouldBreak1 = true;
  //     await $(`//button[contains(@title,'Close')]`).click();
  //     break;
  //   }
  //   else 
  //   {
  //     console.log("Not able to find the close btn");
  //   }
    
  // }

  // await $(`//button[contains(@title,'Close')]`).click();
  // await browser.pause(60000);
  // console.log("Clicked close mark");
  // await browser.pause(60000);
  // let shouldBreak= false;
  // for(let i=0;i<8;i++){
    
  //   // // bh.jsClick(" ",QAFIORILOGINPF.sucmsg);
    
  //   // var current = new Date();
  //   // let min =current.getMinutes();
  //   // console.log("Awaiting for the payload to generate: "+i+" "+min);
    
  //   await browser.pause(10000);


    
  //}
 
  });
  

  Then(/^the user generate IDOC for creating PO$/, async () => {
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
    await sap.enterTextInTextBox(QASAPLOGIN.poSalesDocNo,orderNum);
    await browser.pause(4000);
    await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn4);
   await browser.pause(4000);
    idocnum=await $(QASAPLOGIN.idocnum).getText();
    await console.log(idocnum);
    
    });

Then (/^the user process the IDOC number to generate PO with Tcode(.*)$/ , async(Tcode) =>{
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
 await browser.pause(2000);
  await sap.keyboardActions('Enter'); 
  await browser.pause(2000);
  //const iDocNum=await bd87Page.getIdocDetails();
  //console.log(iDocNum);
  await browser.pause(2000);
  (await $(QASAPLOGIN.bd87IdoctxtBox)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.bd87IdoctxtBox)).click();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.bd87IdoctxtBox,idocnum);
  await browser.pause(3000);
   await sap.clicktheBtnXpath(QASAPLOGIN.bd87ExecuteBtn);

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
      await sap.clicktheBtnXpath(QASAPLOGIN.bd87QS7txt);
      await browser.pause(2000);
      await sap.clicktheBtnXpath(QASAPLOGIN.bd87IDCOReadyToProcesstxt);
      await browser.pause(5000);
      await sap.keyboardActionsF8('F8'); 
      await browser.pause(5000);
      console.log("presssed f8");
    //   let DP=await sap.isNotVisibleByEle('check direct process btn',QASAPLOGIN.bd87DirectProcessBtn);   
    //   console.log(DP);
    //     if ($(QASAPLOGIN.bd87DirectProcessBtn).isDisplayed)
    //     {
    //       await sap.clicktheBtnXpath(QASAPLOGIN.bd87DirectProcessBtn);
    //       await browser.pause(4000);
    //       console.log("Clicked on process button!");

    //     }
    //   //if ( (await $(QASAPLOGIN.bd87MoreMenuOption)).isDisplayed())
    // if(DP===false)
    // {
    //   //let sp= sap.isNotVisibleByEle('check direct process btn',QASAPLOGIN.bd87DirectProcessBtn);
    //  // console.log(sp);
    //   // if( sap.isNotVisibleByEle('check direct process btn',QASAPLOGIN.bd87DirectProcessBtn))   
    //   // {
    //   await browser.pause(2000);
    //   console.log("Moving to Menu options..");
    //   await sap.clicktheBtnXpath(QASAPLOGIN.bd87MoreMenuOption);
    //   await browser.pause(2000); 
    //   await sap.clicktheBtnXpath(QASAPLOGIN.bd87MoreMenuProcessOption);
    //   await browser.pause(2000);
    //   console.log("Clicked on process button!");
    //   }

      await browser.pause(5000);
      let idocStatuNew= await $(QASAPLOGIN.bd87Successtxt).getText();
      await browser.pause(2000);
      console.log(idocStatuNew);
      if (idocStatuNew ==='53')
      {
        console.log ("idoc is processed successfully..!!");
      }
    }
      // await expect(QASAPLOGIN.bd87CollapseNode).toBeDisplayed();
      // await sap.clicktheBtnXpath(QASAPLOGIN.bd87CollapseNode);
      // await sap.clicktheBtnXpath(QASAPLOGIN.bd87idocStatus53);
  
});

Then(/^the user checks the PO with Tcode (.*)$/, async(Tcode)=> {
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
}),
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
  console.log("VA03 order opened");
  await browser.pause(2000);
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
  (await $(QASAPLOGIN.va03DIntNumForGr)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.va03DIntNumForGr)).click();
  await browser.pause(3000);
  console.log("DINT Clicked!");
  (await $(QASAPLOGIN.va03PickTab)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(3000);
  await (await $(QASAPLOGIN.va03PickTab)).click();
  console.log("Picking Clicked!");

  await browser.pause(3000);
  await (await $(QASAPLOGIN.va03ChangeMode)).click();
  console.log("display change btn clicked");
  await browser.pause(2000);

  (await $(QASAPLOGIN.postGoodsIssue)).click();
  console.log("post goods issue btn clicked");
  await browser.pause(4000);

  //-----------Code to verify GI Created --------------
  await browser.pause(2000);
   await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nva03');
   await sap.keyboardActions('Enter');
   await browser.pause(2000);
   (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
  await sap.keyboardActions('Enter');
  console.log("VA03 order opened");
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Document flow is opened!");
  await browser.pause(2000);
  await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
  console.log("POnumber is clicked");
  (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(2000);
  await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
  console.log("PO Document is opened!");
  await browser.pause(6000);
 (await $(QASAPLOGIN.GIgenerated)).waitForDisplayed({ timeout: 60000 });
 GI=await $(QASAPLOGIN.GIgenerated).getText();
 console.log(GI);
 await browser.pause(3000);
 console.log("Display Doc for GI verification done");


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
  await browser.pause(1000);

  // await (await $(QASAPLOGIN.va03backBtn)).click();
  // await browser.pause(4000);
  // console.log("back button is clicked !");
      // ODBNum= await $(QASAPLOGIN.va03OBDNum).getText();
      // await browser.pause(3000);
      // odbNumExtracted=sap.extractPOnum(ODBNum);
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
      await browser.pause(16000);
      console.log("Execute Button is clicked!");


      await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 60000 });
      await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      await browser.pause(4000);
      console.log("Continue Button clicked in RSNAST POP UP!");
      await browser.pause(6000);
      

      //await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).waitForDisplayed({ timeout: 60000 });
      await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      await browser.pause(4000);
      console.log("Continue Button clicked in RSNAST POP UP second!");
      await browser.pause(4000);


     });

     Then(/^the user check the Outbound Delivery(.*)$/, async(Tcode) => {
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
          let ob= await (await $(QASAPLOGIN.va03ODB)).getText();
          console.log("ODB is created!",ob );
          await browser.pause(2000);

        }
        else{
          console.log("ODB is not created!");
        }
  
  });

  Then(/^the user do the MIGO$/, async () => {
    //Enter PO number below to be taken from another program.Right now using order no as dont have code for it
    await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
    console.log("POnumber is clicked");
    (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
    await browser.pause(2000);
    await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
    console.log("PO Document is opened!");
    await browser.pause(6000);
   
    if ( expect(QASAPLOGIN.purOrdHistTab).toBeDisplayed()){
         console.log("Purchase order history tab available");
         await sap.clicktheBtnXpath(QASAPLOGIN.purOrdHistTab);
       
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
    else {
              console.log("Purchase order history tab not available");
        }
  }
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
        await sap.clicktheBtnXpath(QASAPLOGIN.bbItemdoubleClick);
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
 
  Then(/^user go to OBD PGI for releasing the delivery (.*)$/, async(Tcode) =>{
    const orderNum=await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
    console.log("tcode entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    await $(`//input[@title='ABAP Program Name']`).addValue('WS_MONITOR_OUTB_DEL_GDSI');
    //await sap.enterProgramName(QASAPLOGIN.sa38ProgramtxtBox,'RV60SBAT');
    console.log("prog name entered");
    await sap.keyboardActions('Enter');
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("Releasing Program executed ");  
   
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
      await browser.pause(10000);
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
     await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
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
