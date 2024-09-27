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
  await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed()
  console.log("VA03 order opened");
});

Then(/^the user do the authorization$/, async () => {

  // const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nsa38');
  await sap.keyboardActions('Enter');
   console.log("Before entering program name");
   await browser.pause(2000);
  //input[@title='ABAP Program Name']`));
  await $(`//input[@title='ABAP Program Name']`).addValue('YDCOM_BATCH_FULL_AUTH_NEW');
  await waitForElement(await $(`//div[@title='Execute (F8)']`));
  await $(`//div[@title='Execute (F8)']`).click();
  await browser.pause(4000);
  
  });

  Then(/^Generate IDOC$/, async () => {
    const orderNum = await sap.getOrderNumber();
    console.log("In generateidoc then statement");
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,"/nsa38");
    await sap.keyboardActions('Enter');
    await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,"ydsd_order_output_process");
    await sap.keyboardActions('Enter');
    await authorization.ExecuteBtn();
    //await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
    await sap.enterTextInTextBox(QASAPLOGIN.poSalesDocNo,orderNum);
    await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn2)
    //Read idoc number generated and save it to json file
    });

Then (/^process the PO with Tcode(.*)$/ , async(Tcode) =>{
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
 await browser.pause(2000);
  await sap.keyboardActions('Enter'); 
  await browser.pause(2000);
  const iDocNum=await bd87Page.getIdocDetails();
  console.log(iDocNum);
  await browser.pause(2000);
  (await $(QASAPLOGIN.bd87IdoctxtBox)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.bd87IdoctxtBox)).click();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.bd87IdoctxtBox,iDocNum);
  await browser.pause(3000);
   await sap.clicktheBtnXpath(QASAPLOGIN.bd87ExecuteBtn);
//   await sap.clicktheBtnXpath(QASAPLOGIN.bd87QS7txt);
//   await sap.clicktheBtnXpath(QASAPLOGIN.bd87MoreMenuOption);
//  //(await $(`//span[text()='Process']`)).waitForDisplayed({ timeout: 40000 });
//   await sap.clicktheBtnXpath(QASAPLOGIN.bd87MoreMenuProcessOption);
  //await expect(QASAPLOGIN.bd87CollapseNode).toBeDisplayed();
  //await sap.clicktheBtnXpath(QASAPLOGIN.bd87CollapseNode);
    // await sap.clicktheBtnXpath(QASAPLOGIN.bd87idocStatus53);
    let idocStatus= await $(QASAPLOGIN.bd87idocStatus53).getText();
    
    console.log(idocStatus);
    if (await idocStatus==='53')
  {
    console.log("idoc proccessed succ");
  }
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
  console.log("DPR");
  await browser.pause(2000);
  const POnum=await $(QASAPLOGIN.va03DisplayDocPONum).getText();
  console.log(POnum);
//
  await sap.extractPOnum(POnum);
});
