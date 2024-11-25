import { Given, Then } from "@wdio/cucumber-framework";
import OrderSummary from "../pageObjects/cart.js";
import home from "../pageObjects/home.js";
import PipOperations from "../pageObjects/pip.js";
import checkOut from "../pageObjects/checkOut.js";
import plp from "../pageObjects/plp.js";
import proB2B from "../pageObjects/proB2B.js";
import myAccount from "../pageObjects/myAccount.js";
import HomeServices from "../pageObjects/homeServices.js";
import Aisle from "../pageObjects/api/ca/aisleAndBay.js";
import BookAnAssociate from "../pageObjects/oab.js";
import SelectDateForToolRental from "../pageObjects/toolRental.js";
import { scenarioName } from "../config/wdio.chrome.sauce.conf.js";
import { browser, $, $$, expect } from "@wdio/globals";
import skuData from "../resources/data/skuData.json" assert { type: "json" };
import e2eData from "../resources/data/e2eData.json" assert { type: "json" };
import sap from "../pageObjects/sap.js";
import fs from "fs";
import bd87Page from "../pageObjects/bd87Page.js";
import { QASAPLOGIN } from "../pageRepository/pageFactory.js";
import { waitForElement } from "../pageObjects/page.js";
import { getValue } from "webdriverio/build/commands/element.js";


let obdNum = "";
let idocnum = "";
let POnum = "";
let GI = "";
let dintNum = "";
let jobName = "";
let POArt = "";
let PODesc = "";
let POQty = "";
let we19Idoc = "";
let we19IdocExtracted;
let VendorPOnum;
let shipmentPOnum;  
let currentDate = "";
let odbflag;

Given(/^the user launches the url$/, async () => {
  await home.launchOneUrl();
});


Then(
  /^the user enters text sku in textbox with placeholder (.*)$/,
  async (selector) => {
    await home.enterSkuData(selector, skuData, e2eData, scenarioName);
  }
);

Then(
  /^the user validates if the time status of the located store is correct$/,
  async () => {
    await home.validateNowHoursStatus();
  }
);

Then(/^the user presses browser back button$/, async () => {
  await browser.back();
});

Then(
  /^the user validates aisle and bay location text for store "([^"]*)?" and "([^"]*)?" in "([^"]*)?"$/,
  async (store, sku, language) => {
    await Aisle.checkAisleLocation(store, sku, language);
  }
);

Then(/^the user enters random email in the textbox (.*)$/, async (selector) => {

    //await $(`//*[contains(text(),${selector})]/following::input[1]`)
    //  await $(`(//*[contains(text(),${selector})]/following::input[1])[1]`)
    (await $(QASAPLOGIN.caEmail)).addValue(await home.emailGenerator());
 // ).addValue(await home.emailGenerator());
});

Then(
  /^the user enters random number in the textbox (.*) by adding "([^"]*)?" digits$/,
  async (selector, digitsToAdd) => {
    await (
      await $(`//*[contains(text(),${selector})]/following::input[1]`)
    ).addValue(await home.phoneNumberGenerator(digitsToAdd));
  }
);

Then(
  /^the user enters random email on the webelement with html tag "([^"]*)?" as (.*)$/,
  async (htmlTag, selector) => {
    await (
      await $(`//*[contains(@${htmlTag},${selector})]`)
    ).addValue(await home.emailGenerator());
  }
);

Then(
  /^the user enters randomly generated email in the textbox (.*)$/,
  async (selector) => {
    await (
      await $(`//*[contains(text(),${selector})]/following::input[1]`)
    ).addValue(await home.emailGenerated());
  }
);

Then(
  /^the user verifies if (.*) and (.*) are equal$/,
  async (selector, selectorToMatch) => {
    expect(
      await $(
        `//label[contains(text(),${selector})]/following::select`
      ).getValue()
    ).toEqual(
      await $(
        `//*[contains(text(),${selectorToMatch})]/following::input[@type='text']`
      ).getValue()
    );
  }
);

Then(
  /^the user validates if shipping postal code and (.*) are equal$/,
  async (selector) => {
    await OrderSummary.validatePostalCode(selector);
  }
);

Then(/^the user validates the order summary table$/, async () => {
  await OrderSummary.verifyOrderSummaryTotalValue();
});

Then(/^the user validates (.*) in datepicker$/, async (selector) => {
  await OrderSummary.verifyWeekDaysDateMonthYearofDatePicker(selector);
});
Then(
  /^the user validates if product totals are equal on the cart page$/,
  async () => {
    await OrderSummary.verifyTotalItemPriceAndOrderSubTotal();
  }
);

Then(/^the user validates the order summary table in french$/, async () => {
  await OrderSummary.verifyOrderSummaryTotalValueFrench();
});

Then(
  /^the user validates if product totals are equal on the cart page in french$/,
  async () => {
    await OrderSummary.verifyTotalItemPriceAndOrderSubTotalFrench();
  }
);

Then(/^the user deselect all service checkbox$/, async () => {
  await OrderSummary.deSelectAllServiceCheckBox();
});

Then(
  /^the user validates if total item in cart is equal to item count in cart header and mini cart$/,
  async () => {
    await OrderSummary.validateItemTotalCount();
  }
);

Then(/^the user (.*) all items added to cart$/, async (selector) => {
  await OrderSummary.removeAllItemsFromCart(selector);
});

Then(
  /^the user validates if total item in cart is equal to item count in cart header and mini cart in French$/,
  async () => {
    await OrderSummary.validateItemTotalCountFrench();
  }
);

Then(
  /^the user verifies if price per item equals per item total$/,
  async () => {
    await OrderSummary.verifyPricePerItemWithItemTotal();
  }
);

Then(
  /^the user validates the order subtotal for tier of (.*)$/,
  async (quantity) => {
    await OrderSummary.verifyOrderSubTotalforTier(quantity);
  }
);
Then(
  /^the user validates the order saving total for tier of (.*)$/,
  async (quantity) => {
    await OrderSummary.verifyOrderTotalSavingforTier(quantity);
  }
);

Then(
  /^the user verifies if price per item equals per item total in French$/,
  async () => {
    await OrderSummary.verifyPricePerItemWithItemTotalFrench();
  }
);

Then(/^the user gets the moq limit$/, async () => {
  await OrderSummary.getMoqLimit();
});

Then(
  /^the user validate if quantity drop down has values of 1 to MOQ limit$/,
  async () => {
    await OrderSummary.verifyQuantityDropdown();
  }
);

Then(/^the user checks if cart is empty$/, async () => {
  await OrderSummary.isCartEmpty();
});

Then(/^the user add product to cart$/, async () => {
  await OrderSummary.addToCart();
});

Then(/^the user validates if delivery date is updated$/, async () => {
  await OrderSummary.validateDeliveryDateUpdated();
});

Then(
  /^the user clicks on the scheduled express delivery with postal code "([^"]*)?"$/,
  async (postalCode) => {
    await OrderSummary.expressDeliveryScheduled(postalCode);
  }
);

Then(
  /^the user clicks on the express delivery same day with postal code "([^"]*)?"$/,
  async (postalCode) => {
    await OrderSummary.expressDeliverySameday(postalCode);
  }
);

Then(
  /^the user clicks on french the express delivery same day with postal code "([^"]*)?"$/,
  async (postalCode) => {
    await OrderSummary.expressDeliverySamedayFrench(postalCode);
  }
);

Then(
  /^the user validates that the delivery date is equal to the estimated arrival$/,
  async () => {
    await OrderSummary.validateDeliveryDateIsEqualToEstimatedArrival();
  }
);

Then(
  /^the user validates cart header and container has same "([^"]*)?" at index "([^"]*)?"$/,
  async (variable, index) => {
    await OrderSummary.validateCartHeaderAndContainerHasSameVariable(
      variable,
      index
    );
  }
);

Then(
  /^the user verifies the cart quantity is equal to "([^"]*)?" at index "([^"]*)?"$/,
  async (productQuantity, index) => {
    await OrderSummary.quantityVerification(productQuantity, index);
  }
);

Then(/^the user validates savingprice wasprice and nowprice$/, async () => {
  await PipOperations.validateWasNowandSavingPriceInPIP();
});

Then(
  /^the user validates if the frequetly bought items count is as expected$/,
  async () => {
    await PipOperations.validateFBTItems();
  }
);

Then(
  /^the user clicks on the all elements with html tag "([^"]*)?" as (.*)$/,
  async (htmlTag, selector) => {
    await PipOperations.clickAllElements(htmlTag, selector);
  }
);

Then(
  /^the user validates if all frequently bought items checkboxes are checked and components are shown$/,
  async () => {
    await PipOperations.validateFbtCheckboxesCheckedAndFbtItemSection();
  }
);

Then(/^the user gets the add to cart button item value$/, async () => {
  await PipOperations.getFbtAddToCartButtonItemValue();
});

Then(
  /^the user compares the add to cart overlay items, add to cart message and product information page item values$/,
  async () => {
    await PipOperations.compareAddToCartModalAndPipItems();
  }
);

Then(
  /^the user validates if pill number "([^"]*)?" is selected$/,
  async (pillNumber) => {
    await PipOperations.validateIfPillIsSelected(Number(pillNumber));
  }
);

Then(/^the user validates if the pill (.*) is selected$/, async (pillText) => {
  await PipOperations.validateIfPillWithTextIsSelected(pillText);
});

Then(
  /^the user validates if (.*) offer is present in pip$/,
  async (selector) => {
    await PipOperations.offerIsPresent(selector);
  }
);

Then(/^the user validates if instock quantity is nonzero$/, async () => {
  await PipOperations.instockQuantityIsNonzero();
});

Then(
  /^the user verifies CUOM in PIP page is the same as in PLP page$/,
  async () => {
    await PipOperations.verifyCUOM(plp.plpCUOM);
  }
);

Then(
  /^the user verifies if items added to cart is equal to (.*)$/,
  async (itemQuantity) => {
    await OrderSummary.itemsAddedToCartAreEqualsTo(itemQuantity);
  }
);

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

Then(
  /^the user validates if the store pick up form is available$/,
  async () => {
    await checkOut.storePickUpFormIsAvailable();
  }
);

Then(/^the signed in user clicks on continue button$/, async () => {
  await OrderSummary.continueButton();
});

// Then(/^the user enters the "([^"]*)?" card details$/, async (cardType) => {
//  // await checkOut.paymentMethod(cardType);
//  await checkOut.paymentMethod(cardType);
// });

Then(/^the user enters the "([^"]*)?" card details$/, async (cardType) => {
  await browser.pause(6000);
  await sap.pageScrollTillBottomPage();
  await browser.pause(6000);
  await checkOut.paymentMethod(cardType);
});

Then(/^the user enters french "([^"]*)?" card details$/, async (cardType) => {
  await checkOut.paymentMethodFrench(cardType);
});

Then(
  /^the user enters billing details for "([^"]*)?" card$/,
  async (paymentType) => {
    await browser.pause(2000);
    await checkOut.hdConsumerAddress(paymentType);
  }
);

Then(
  /^the user enters french billing details for "([^"]*)?" card$/,
  async (paymentType) => {
    await checkOut.hdConsumerAddressFrench(paymentType);
  }
);

Then(
  /^the user verifies if (.*) button for (.*) is visible$/,
  async (buttonType, checkOutSection) => {
    await expect(
      $(
        `//*[text()=${checkOutSection}]/ancestor::div[contains(@class, "acl-vertical-progress-bar__header acl-flex-grow--1")]//span[text()=${buttonType}]`
      )
    ).toBeDisplayed();
  }
);

Then(
  /^the user verifies if (.*) button for (.*) is not visible$/,
  async (buttonType, checkOutSection) => {
    await expect(
      $(
        `//*[text()=${checkOutSection}]/ancestor::div[contains(@class, "acl-vertical-progress-bar__header acl-flex-grow--1")]//span[text()=${buttonType}]`
      )
    ).not.toBeDisplayed();
  }
);

Then(/^the user checks if wishlist is empty$/, async () => {
  await myAccount.emptyWishlist();
});

Then(/^the user verifies the max number of products in PLP$/, async () => {
  await plp.verifyMaxProducts();
});

Then(
  /^the user verifies if chevron for the filter (.*) is "([^"]*)?"$/,
  async (selector, status) => {
    await plp.verifyChevronStatus(selector, status);
  }
);

Then(
  /^the user gets the CUOM value from PLP page at index "([^"]*)?"$/,
  async (index) => {
    await plp.getCUOMText(index);
  }
);

Then(/^the user uploads an image$/, async () => {
  await HomeServices.uploadMockImage();
});

Then(
  /^the user selects the date and time for the booking appointment in book an associate$/,
  async () => {
    await BookAnAssociate.selectDateAndTime();
  }
);

Then(/^the user verify and select checkbox (.*)$/, async (selector) => {
  await home.checkboxIsSelected(selector);
});

Then(/^the user saves primary details of the order$/, async () => {
  await checkOut.saveOrderDetails();
});

Then(/^the user selects same day delivery fulfillment$/, async () => {
  await OrderSummary.chooseSameDayDeliverOption();
});

Then(
  /^the registered user fills in "([^"]*)?" at checkout page$/,
  async (selector) => {
    await checkOut.fillInContactPhoneForPickUp(selector);
  }
);

Then(
  /^the user generates a random phone number with extension (.*)$/,
  async (extension) => {
    await proB2B.generateRandomPhoneNumber(extension);
  }
);

Then(
  /^the user sets the random phone number in the textbox (.*)$/,
  async (selector) => {
    await proB2B.enterRandomPhoneNumberInTextbox(selector);
  }
);

Then(/^the user selects tool rental pickup date and time$/, async () => {
  await SelectDateForToolRental.selectDateAndTime();
});

Then(/^the user save created order number in json file$/, async () => {
  console.log("inside step to save Order no in file");
  const caOrderNo = await $(QASAPLOGIN.caOrderNumber).getText();
  console.log(caOrderNo);
  //const caOrderNo = "Order Number: 0240013257";

  // Extracting the order number using a regex
  const match = caOrderNo.match(/Order Number:\s*(\d+)/);
  let caOrderNumber: number | null = null;
  if (match) {
    caOrderNumber = Number(match[1]); // Save the extracted number
  }
  console.log(caOrderNumber);

  //const jsonData = `"${caOrderNumber}"`; // Save as plain text in JSON format
  fs.writeFileSync(
    "./src/resources/data/SAP.json",
    JSON.stringify(caOrderNumber)
  );
});
//  SAP

Then(/^the user launches the SAP url and login to SAP$/, async () => {
  await browser.pause(10000);
  console.log("Login to SAP");
  await sap.launchSAPUrl();
  await sap.readUserNameAndPwd();
  // await sap.enterTextInTextBox(QASAPLOGIN.txtSAPUserIdqs7,'TSTAUTO2');
  // await sap.enterTextInTextBox(QASAPLOGIN.txtSAPPaswdqs7,'homedepot');
  await sap.clicktheBtnXpath(QASAPLOGIN.signInqs7);
  
});

Then(/^the user check the order details with Tcode(.*)$/, async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
  await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed();
  console.log("VA03 order opened and item category z3pl verified");
});
Then(/^the user do the authorization$/, async () => {
  console.log("inside auth program");
  const orderNum = await sap.getOrderNumber();
  console.log(orderNum);
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nsa38");
  await sap.keyboardActions("Enter");
  console.log("Before entering program name");
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,"YDCOM_BATCH_FULL_AUTH_NEW");
  await waitForElement(await $(QASAPLOGIN.execute));
  await $(QASAPLOGIN.execute).click();
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.authOrderno, orderNum);
  await browser.pause(5000);
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  console.log("Clicked Execute btn");
  await browser.pause(9000);

  // First, check for Card Approved text
  let isCardApproved = await $(QASAPLOGIN.authCardApprovedTxt).isDisplayed();
  console.log(isCardApproved);

  if (!isCardApproved) {
    console.log("Card Approved text not found, checking for tick mark...");
    // let done = false;

    // while (!done) {
    //   console.log(done);
    //   console.log("Waiting for tick mark");
    //   if (await $(`//*[contains(@lsdata,'Continue (Enter)')]`).isDisplayed()) {
    //     await browser.pause(500);
    //     await $(`//*[contains(@lsdata,'Continue (Enter)')]`).click();
    //     done = true;
    //     console.log(done);
    //   } else await browser.pause(5000);
    // }
    let done2 = false;

    while (!done2) {
      console.log(done2);
      console.log("Waiting for success txt");
      if (await $(QASAPLOGIN.authCardApprovedTxt).isDisplayed()) {
        await browser.pause(500);
        console.log("Pass");
        done2 = true;
        console.log(done2);
      } else await browser.pause(5000);
    }
  }

  // Final check for Card Approved text
  // await expect(isCardApproved).toBe(true);
  else {
    let apporvedtxt = await (await $(QASAPLOGIN.authCardApprovedTxt)).getText();
    console.log(isCardApproved);
    console.log(apporvedtxt);
    if (isCardApproved) {
      console.log("Card Approved text is now displayed");
    } else {
      console.log("Card Approved text still not displayed");
    }
  }
});

Then(/^the user do the authorization for STH order$/, async () => {
  console.log("inside auth program");
  const orderNum = await sap.getOrderNumber();
  console.log(orderNum);
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nsa38");
  await sap.keyboardActions("Enter");
  console.log("Before entering program name");
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,"YDCOM_BATCH_FULL_AUTH_NEW");
  await waitForElement(await $(QASAPLOGIN.execute));
  await $(QASAPLOGIN.execute).click();
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.authOrderno, orderNum);
  await browser.pause(5000);
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  console.log("Clicked Execute btn");
  await browser.pause(9000);

  // First, check for Card Approved text
  let isCardApproved = await $(QASAPLOGIN.authCardApprovedTxt).isDisplayed();
  console.log(isCardApproved);

  if (!isCardApproved) {
    console.log("Card Approved text not found, checking for tick mark...");
    let done = false;

    while (!done) {
      console.log(done);
      console.log("Waiting for tick mark");
      if (await $(QASAPLOGIN.authSuccessTick).isDisplayed()) {
        await browser.pause(500);
        await $(QASAPLOGIN.authSuccessTick).click();
        done = true;
        console.log(done);
      } else await browser.pause(5000);
    }
    let done2 = false;

    while (!done2) {
      console.log(done2);
      console.log("Waiting for success txt");
      if (await $(QASAPLOGIN.authCardApprovedTxt).isDisplayed()) {
        await browser.pause(500);
        console.log("Pass");
        done2 = true;
        console.log(done2);
      } else await browser.pause(5000);
    }
  }

  // Final check for Card Approved text
  // await expect(isCardApproved).toBe(true);
  else {
    let apporvedtxt = await (await $(QASAPLOGIN.authCardApprovedTxt)).getText();
    console.log(isCardApproved);
    console.log(apporvedtxt);
    if (isCardApproved) {
      console.log("Card Approved text is now displayed");
    } else {
      console.log("Card Approved text still not displayed");
    }
  }
});

Then(/^the user generate IDOC for creating PO$/, async () => {
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  console.log("In generate idoc then statement");
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nsa38");
  await sap.keyboardActions("Enter");
  await browser.pause(5000);
  (await $(QASAPLOGIN.txtProgram)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,"ydsd_order_output_process");
  await browser.pause(2000);
  await sap.keyboardActions("Enter");
  //put execute button code
  //await authorization.ExecuteBtn();
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  (await $(QASAPLOGIN.poSalesDocNo)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.poSalesDocNo, orderNum);
  await browser.pause(6000);
  (await $(QASAPLOGIN.authExecuteBtn4)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn4);
  await browser.pause(4000);
  (await $(QASAPLOGIN.idocnum)).waitForDisplayed({ timeout: 60000 });
  idocnum = await $(QASAPLOGIN.idocnum).getText();
  console.log(idocnum);
});

Then(/^the user process the IDOC number to generate PO with Tcode(.*)$/, async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await browser.pause(2000);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  const idocTextBox = await $(QASAPLOGIN.bd87IdoctxtBox);
  await idocTextBox.waitForDisplayed({ timeout: 60000 });
  await idocTextBox.click();
  await browser.pause(5000);
  //(await $(QASAPLOGIN.idocnum)).waitForDisplayed({ timeout: 60000 });
  let bd87PageLoading = await $(QASAPLOGIN.bd87idocStatustxt).isDisplayed();
  console.log(bd87PageLoading);
  await browser.pause(2000);
  if (!bd87PageLoading) {
    console.log("BD87 page is not loading properly , so refreshing th page ..")
    await browser.refresh();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await browser.pause(2000);
    await sap.keyboardActions("Enter");
    await browser.pause(4000);
  }
    await sap.enterTextInTextBox(QASAPLOGIN.bd87IdoctxtBox, idocnum);
    await browser.pause(3000);
    (await $(QASAPLOGIN.bd87ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
    await sap.clicktheBtnXpath(QASAPLOGIN.bd87ExecuteBtn);
    await browser.pause(2000);
    (await $(QASAPLOGIN.bd87idocStatus53)).waitForDisplayed({ timeout: 60000 });
    let idocStatus = await $(QASAPLOGIN.bd87idocStatus53).getText();
    console.log(idocStatus);
    if ((await idocStatus) === "53") {
      console.log("idoc proccessed succ");
    } else {
      console.log("Moving to else..");
      await browser.pause(2000);
      (await $(QASAPLOGIN.bd87QS7txt)).waitForDisplayed({ timeout: 60000 });
      await sap.clicktheBtnXpath(QASAPLOGIN.bd87QS7txt);
      await browser.pause(2000);
      (await $(QASAPLOGIN.bd87IDCOReadyToProcesstxt)).waitForDisplayed({
        timeout: 60000,
      });
      await sap.clicktheBtnXpath(QASAPLOGIN.bd87IDCOReadyToProcesstxt);
      await browser.pause(5000);
      await sap.keyboardActionsF8("F8");
      await browser.pause(5000);
      console.log("presssed f8");
      await browser.pause(7000);
      (await $(QASAPLOGIN.bd87Successtxt)).waitForDisplayed({ timeout: 60000 });
      let idocStatuNew = await $(QASAPLOGIN.bd87Successtxt).getText();
      await browser.pause(5000);
      console.log(idocStatuNew);
      if (idocStatuNew === "53") {
        console.log("idoc is processed successfully..!!");
      }
    }
    await browser.pause(3000);
  }
);

// Then(/^the user checks the PO with Tcode (.*)$/, async (Tcode) => {
//   await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
//   await sap.keyboardActions("Enter");
//   const orderNum = await sap.getOrderNumber();
//   //await sapLogin.getOrderNumber();
//   await browser.pause(3000);
//   (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
//   await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
//   await sap.keyboardActions("Enter");
//   //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
//   console.log("VA03 order opened");
//   //  await sap.sleep(6000);
//   // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
//   (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
//   await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
//   await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
//   console.log("Display document flow is opened");
//   await browser.pause(2000);
//   const POnumFromDocFlow = await $(QASAPLOGIN.va03DisplayDocPONum).getText();
//   console.log(POnumFromDocFlow);
//   (await $(QASAPLOGIN.va03DisplayDocPONum)).doubleClick();
//   await browser.pause(5000);
//   POnum = await $(QASAPLOGIN.va03PONUM).getText();
//   console.log("PO number is:" + POnum);

//   await browser.pause(3000);
//   POQty = await $(QASAPLOGIN.va03POQty).getText();
//   console.log("PO QTY is:" + POQty);

//   await browser.pause(3000);
//   POArt = await $(QASAPLOGIN.va03POArticle).getText();
//   console.log("PO Article number is:" + POArt);

//   await browser.pause(3000);
//   PODesc = await $(QASAPLOGIN.va03PODesc).getText();
//   console.log("Article Description in PO is:" + PODesc);

//   //
//   //await sap.extractPOnum(POnum);
// });

Then(/^the user execute delivery creation$/, async () => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nvl10b');
  await browser.pause(2000);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  console.log("Before clicking purchase order tab");
  await sap.clicktheBtnXpath(QASAPLOGIN.purOrdTab);
  await browser.pause(3000);
  await sap.enterTextInTextBox(QASAPLOGIN.purOrdNoInPOTab, POnum);
  //(await $(QASAPLOGIN.purOrdNoInPOTab)).233190363(PoNUM);
  await browser.pause(5000);
  await sap.keyboardActions("Enter");
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
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
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
  await $(QASAPLOGIN.va03PODisplyDoc).click();
  console.log("PO Document is opened!");
  await browser.pause(6000);

  //  await expect(QASAPLOGIN.purOrdHistTab).toBeDisplayed();
  //    console.log("Purchase order history tab available");
  //   await browser.pause(5000);
    await  $(QASAPLOGIN.purOrdHistTab).click();
    await browser.pause(5000);
  //   await  expect ($ (QASAPLOGIN.va03DIntNumForGr)).toBeDisplayed();
  //     console.log("DINT is created");
  await browser.pause(3000);
  (await $(QASAPLOGIN.va03DIntNumForGr)).waitForDisplayed({ timeout: 60000 });
  const dint = await (await $(QASAPLOGIN.va03DIntNumForGr)).getText();
  await browser.pause(3000);
  console.log(dint);
});

Then(/^the user enter picked qty and mark the Picking (.*)$/, async (Tcode) => {
  await browser.takeScreenshot();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("VA03 order opened");
  await browser.pause(2000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Document flow is opened!");
  await browser.pause(2000);
  const POnum = await $(QASAPLOGIN.va03DisplayDocPONum).getText();
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
  await  $(QASAPLOGIN.purOrdHistTab).click();
    await browser.pause(5000);
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

  const DelQty = await $(QASAPLOGIN.va03DelQty).getText();
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
Then(/^the user verify GI created inside PO (.*)$/, async (Tcode) => {
  await browser.pause(2000);
  console.log("code to verify gi created -----before t code ");
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  console.log("after t code ");
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await browser.pause(2000);
  console.log(orderNum);
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  console.log("GI Verification VA03 order opened");
  await browser.pause(6000);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
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
  await  $(QASAPLOGIN.purOrdHistTab).click();
  await browser.pause(5000);
  (await $(QASAPLOGIN.GIgenerated)).waitForDisplayed({ timeout: 60000 });
  GI = await $(QASAPLOGIN.GIgenerated).getText();
  console.log(GI);
  await browser.pause(3000);
  console.log("Display Doc for GI verification done");
  await browser.pause(3000);
});

Then(
  /^the user clicks on post goods issue to generate GI(.*)$/,
  async (Tcode) => {
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
    // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
    // await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed();
    console.log("VA03 order opened");
    await browser.pause(6000);
    (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
    await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
    await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
    console.log("document flow is opened");
    const POnum = await $(QASAPLOGIN.va03DisplayDocPONum).getText();
    console.log("POnum");
    await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
    console.log("PO doc is clicked");
    (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
    await browser.pause(2000);
    await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
    console.log("PO doc is open");
    await browser.pause(6000);
    await  $(QASAPLOGIN.purOrdHistTab).click();
    await browser.pause(5000);
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
    await browser.keys(["Shift", "F8"]);
    await browser.pause(6000);
  }
);

Then(/^the user enter Goods Receipt (.*)$/, async (Tcode) => {
  const orderNum = await sap.getOrderNumber();
  (await $(QASAPLOGIN.txtTcode)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  //await sapLogin.getOrderNumber();
  await browser.pause(6000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("VA03 order opened");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Document flow is opened!");
  await browser.pause(2000);
  const POnum = await $(QASAPLOGIN.va03DisplayDocPONum).getText();
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

   ((await $(QASAPLOGIN.poHistoryTab)).isDisplayed)
   await  $(QASAPLOGIN.purOrdHistTab).click();
   await browser.pause(5000);
  // console.log("PO history Clicked!");

  await $(QASAPLOGIN.va03DIntNumForGr).waitForDisplayed({ timeout: 60000 });
  dintNum = await $(QASAPLOGIN.va03DIntNumForGr).getText();
  console.log(dintNum);
  //await browser.debug();
  await $(QASAPLOGIN.va03DIntNumForGr).doubleClick();
  await browser.pause(4000);
  console.log("DINT Clicked!");

  (await $(QASAPLOGIN.replinishDelMenu)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.replinishDelMenu)).click();
  await browser.pause(6000);
  console.log("Menu Clicked!");

  (await $(QASAPLOGIN.replinishDelMenuExtras)).waitForDisplayed({
    timeout: 60000,
  });
  await (await $(QASAPLOGIN.replinishDelMenuExtras)).click();
  await browser.pause(6000);
  console.log("Extras Clicked!");

  (await $(QASAPLOGIN.replinishDelDeliveryOuput)).waitForDisplayed({timeout: 60000});
  await (await $(QASAPLOGIN.replinishDelDeliveryOuput)).click();
  await browser.pause(6000);
  console.log("Delivery Output is Clicked!");

  (await $(QASAPLOGIN.replinishHeader)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.replinishHeader)).click();
  await browser.pause(6000);
  console.log("Header is clicked !");
  await browser.pause(6000);

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


  console.log("ZESC is not processed .. Processing with RSNAST..");
  
});

Then(/^the user process with RSNAST$/, async () => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nsa38");
  await browser.pause(2000);
  await sap.keyboardActions("Enter");
  await browser.pause(6000);
  console.log("Tcode entered sa38");
  await $(QASAPLOGIN.txtProgram).clearValue();
  await browser.pause(3000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram, "RSNAST00");
  await browser.pause(4000);
  await sap.keyboardActionsF8("F8");
  await browser.pause(6000);
  await (await $(QASAPLOGIN.rsnastOutputType)).click();
  await browser.pause(4000);
  await (await $(QASAPLOGIN.rsnastOutputType)).addValue("V2");
  console.log("Output Application entered!");

  (await $(QASAPLOGIN.rsnastObjectKey)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.rsnastObjectKey)).click();
  await browser.pause(4000);
  const zeroPad = String(dintNum).padStart(10, "0");

  console.log(zeroPad);
  await $(QASAPLOGIN.rsnastObjectKey).addValue(zeroPad);
  console.log("Object Key entered!");

  (await $(QASAPLOGIN.rsnastZESCOutputType)).waitForDisplayed({
    timeout: 60000,
  });
  await (await $(QASAPLOGIN.rsnastZESCOutputType)).click();
  await browser.pause(4000);
  await $(QASAPLOGIN.rsnastZESCOutputType).addValue("ZESC");
  console.log("Output type is entered!");

  await $(QASAPLOGIN.rsnastExecuteBtn).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.rsnastExecuteBtn)).click();
  await browser.pause(6000);
  console.log("Execute Button is clicked!");
  let done = false;

  while (!done) {
    console.log(done);
    console.log("Waiting for tick mark");
    if (await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).isDisplayed()) {
      await browser.pause(500);
      await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      done = true;
      console.log(done);
      console.log("Continue button from RSNAST is clicked!!");
    } else await browser.pause(5000);
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
  let done2 = false;
  while (!done2) {
    console.log(done2);
    console.log("Waiting second clsoe button in RSNAST..");
    if (await $(QASAPLOGIN.authSuccClose).isDisplayed()) {
      await browser.pause(500);
      await $(QASAPLOGIN.authSuccClose).click();
      console.log("Close 2 Button clicked in RSNAST POP UP!");
      done2 = true;
      console.log(done2);
    } else await browser.pause(5000);
  }
  // await $(QASAPLOGIN.authSuccClose).waitForDisplayed({ timeout: 60000 });
  // await $(QASAPLOGIN.authSuccClose).click();
  // await browser.pause(6000)
  // await $(QASAPLOGIN.rsnastSuccMsg).waitForDisplayed({ reverse: true })
  // console.log("Close 2 Button clicked in RSNAST POP UP!");
  //await browser.pause(2000);

  await $(QASAPLOGIN.rsnastInfoScreen).waitForDisplayed({ timeout: 60000 });
  console.log("Info screen displayed");

  let done3 = false;
  while (!done3) {
    console.log(done3);
    console.log("Waiting last close button ..");
    if (await $(QASAPLOGIN.authSuccClose).isDisplayed()) {
      await browser.pause(500);
      await $(QASAPLOGIN.authSuccClose).click();
      console.log("Close 3 Button clicked in RSNAST POP UP!");
      done3 = true;
      console.log(done3);
    } else await browser.pause(5000);
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

Then(/^the user check the Outbound Delivery(.*)$/, async (Tcode) => {
  await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
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
  if (await $(QASAPLOGIN.va03ODB).isDisplayed()) {
    obdNum = await (await $(QASAPLOGIN.va03ODB)).getText();
    console.log("ODB is created!", obdNum);
    await browser.pause(2000);
    (await $(QASAPLOGIN.obdDocument)).doubleClick();
    obdNum = await $(QASAPLOGIN.va03ODBNUM).getText();
    console.log(obdNum);
    await browser.pause(2000);
  } else {
    console.log("ODB is not created!");
  }
  await browser.pause(2000);
});

Then(/^the user do the MIGO$/,async () => {
    //Enter PO number below to be taken from another program.Right now using order no as dont have code for it

    await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nva03");
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
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

    if ((await $(QASAPLOGIN.gr101)).isDisplayed) {
      if ((await $(QASAPLOGIN.gr101Mvmt)).isDisplayed){
      console.log("GR101 is already created.. No need of MIGO.. ");
    }
  }

  else {
    await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nva03");
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
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

    //const orderNum = await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,"/nMIGO");
    await sap.keyboardActions("Enter");
    await browser.pause(5000);
    console.log("before entering purchase order no");
    await sap.enterTextInTextBox(QASAPLOGIN.migoPO,POnum);
    await sap.keyboardActions("Enter");
    await browser.pause(6000);
    console.log("Entered PO in MIGO");
    await sap.enterTextInTextBox(QASAPLOGIN.migoSite, "9765");
    await sap.keyboardActions("Enter");
    await browser.pause(6000);
    if (await $(QASAPLOGIN.migoCloseHeaderDataBtn).isDisplayed()) {
      await browser.pause(4000);
      (await $(QASAPLOGIN.migoCloseHeaderDataBtn)).click();
    }
    //migoLine
    
    await $(QASAPLOGIN.migoItemOkCheckBx).scrollIntoView({ block: "center" });
    await browser.pause(4000); 
    await sap.pageScrollTillBottomPage();
    await browser.pause(2000); 
    (await $(QASAPLOGIN.migoItemOkCheckBx)).waitForDisplayed({timeout: 60000});
    await browser.pause(2000);
    await(await $(QASAPLOGIN.migoItemOkCheckBx)).click();
    console.log("Item Ok check box is checked now..");

    (await $(QASAPLOGIN.migoPostBtn)).waitForDisplayed({timeout: 60000});
    await browser.pause(2000);
    await(await $(QASAPLOGIN.migoPostBtn)).click();
    console.log("Post button is clicked now..");
    await browser.pause(5000);
    let done = false;

    while (!done) {
      console.log(done);
      console.log("Waiting for success message");
      if (await $(QASAPLOGIN.migoSucctxt).isDisplayed()) {
        await browser.pause(500);
        console.log()
        done = true;
        console.log(done);
        console.log("MIGO is done");
      } else await browser.pause(5000);
    }
    
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nva03");
    await sap.keyboardActions("Enter");
    await browser.pause(3000);
    await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    await browser.pause(3000);
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
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
    await $(QASAPLOGIN.va03PODisplyDoc).click();
    console.log("PO Document is opened!");
    await browser.pause(6000);
    if ((await $(QASAPLOGIN.gr101)).isDisplayed) {
      if ((await $(QASAPLOGIN.gr101Mvmt)).isDisplayed){
      console.log("GR101 created after MIGO ");
    } 
  }else {
      console.log("GR101 not created even after MIGO");
    }
  }
}
  
);
// Release PGI

Then(/^the user go to OBD PGI for releasing the delivery (.*)$/, async (Tcode) => {
    await browser.pause(2000);
    const orderNum = await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    console.log("tcode entered");
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    (await $(QASAPLOGIN.txtProgram)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.txtProgram).clearValue();
  await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,"WS_MONITOR_OUTB_DEL_GDSI");
    // await $(`//input[@title='ABAP Program Name']`).addValue('WS_MONITOR_OUTB_DEL_GDSI');
    //await sap.enterProgramName(QASAPLOGIN.sa38ProgramtxtBox,'RV60SBAT');
    console.log("prog name entered");
    await sap.keyboardActions("Enter");
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("prog executed ");
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.deliveryCode, obdNum);
    console.log("obdNum entered ");
    await browser.pause(2000);
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("prog executed ");
    await browser.pause(5000);
    await $(QASAPLOGIN.deliverychkbx).click();
    console.log("deliverychkbx checkbox clicked");
    await browser.pause(4000);
    (await $(QASAPLOGIN.postGoodsIssueOnOBDPage)).click();
    console.log("post goods issue btn clicked on prog page");
    await browser.pause(3000);
    (await $(QASAPLOGIN.CalenderContinue)).click();
    console.log("continue btn clicked");
  await browser.pause(2000);
  
  let done2 = false;
    while (!done2) {
      console.log(done2);
      console.log("Waiting msg");
      if (await $(QASAPLOGIN.va03ExecuteBtn2).isDisplayed()) {
        (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
        await browser.pause(500);
        console.log("clicked..");
        done2 = true;
        console.log(done2);
      } else await browser.pause(5000);
    }


    let done = false;
    while (!done) {
      console.log(done);
      console.log("Waiting for success text");
      if (await $(QASAPLOGIN.invoiceSuccTxt).isDisplayed()) {
        await browser.pause(500);
        console.log("Invoice created successfully..!");
        done = true;
        console.log(done);
      } else await browser.pause(5000);
    }
  }
);

Then(/^the user go to va03 to verify GI status (.*)$/, async (Tcode) => {
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  console.log("after t code ");
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await browser.pause(2000);
  console.log(orderNum);
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  console.log("order entered");
  await browser.pause(6000);
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("disply Doc btn clicked");

  //verify GIcom stock created

  await browser.pause(6000);
  await waitForElement(await $(QASAPLOGIN.GICOMStockDoc));
  const GIStockDoc = await $(QASAPLOGIN.GICOMStockDoc).getText();
  await browser.pause(2000);
  console.log(GIStockDoc);
  if (GIStockDoc.includes("GI COM Stock Item")) {
    console.log('GI COM Stock Item generated "${GI COM Stock Item}"');
  } else {
    console.log("GI COM Stock Item not generated");
  }
  console.log(" completed ");
  await browser.pause(2000);
});
Then(/^the user removes Billing Block (.*)$/, async (Tcode) => {
  await browser.pause(2000);
  await sap.removeBillingBlock(obdNum);
  await browser.pause(2000);
});
Then(/^the user verify billing block removed(.*)$/, async (Tcode) => {
  const orderNum = await sap.getOrderNumber();
  await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  await $(QASAPLOGIN.va03OrderNumtxtBox).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("VA03 order opened");
  await browser.pause(2000);
  // await expect($(QASAPLOGIN.va03z3plCheck)).toBeDisplayed()
  // console.log("VA03 order opened");
  await browser.pause(2000);
  (await $(QASAPLOGIN.bbItemdoubleClick)).doubleClick();
  await browser.pause(2000);
  console.log("bbItemdoubleClick clicked");
  await sap.clicktheBtnXpath(QASAPLOGIN.bbBillingPlan);
  await browser.pause(2000);
  console.log("billing plan opened");
  await browser.pause(2000);
  await $(QASAPLOGIN.bbBlockCheckForClosingInvoice).scrollIntoView({ block: "center" });
  await browser.pause(1000); 
  //const bbBlock = await $(QASAPLOGIN.bbBlock).getText();
  const bbBlock = await $(QASAPLOGIN.bbBlockCheck).getText();
  console.log(bbBlock);
  const bbBlockClosingInvoice=await $(QASAPLOGIN.bbBlockCheckForClosingInvoice).getText();
  console.log(bbBlockClosingInvoice);
  
  await browser.pause(2000);
  if ((bbBlock != "02") &&(bbBlockClosingInvoice!= "02")){
    console.log("Billing block removed");
  } else
  {
    console.log("Billing block not removed");
    await browser.pause(1000);
      (await $(QASAPLOGIN.va03backBtn)).click();
      console.log("Back btn clicked");
      await browser.pause(2000);
      (await $(QASAPLOGIN.displayHeaderDetails)).waitForDisplayed({ timeout: 60000 });
      await browser.pause(2000);
      (await $(QASAPLOGIN.displayHeaderDetails)).click();
      console.log("Header details clicked");
      await browser.pause(4000);
      // if (await $(QASAPLOGIN.va03OrderStatus).isDisplayed()){
      //   await $(QASAPLOGIN.va03OrderStatus).click();
      //     await browser.pause(4000);
      //   console.log("Status is clicked");
      
    // else (await $(QASAPLOGIN.va03ForwardBtn).isDisplayed())
    // // {
        await browser.pause(4000);
        (await $(QASAPLOGIN.va03ForwardBtn)).click();
        await browser.pause(1000);
        console.log("Forward button is clicked");
        if (await $(QASAPLOGIN.va03OrderStatus).isDisplayed()){
          await $(QASAPLOGIN.va03OrderStatus).click();
          await browser.pause(6000);
          console.log("Status is clicked");
          (await $(QASAPLOGIN.va03ObjStatusBtn)).waitForDisplayed({ timeout: 60000 });
          await browser.pause(2000);
          await $(QASAPLOGIN.va03ObjStatusBtn).scrollIntoView({ block: "center" });
          await browser.pause(4000);
          await $(QASAPLOGIN.va03ObjStatusBtn).click();
          await browser.pause(3000);
          console.log("Obj status is  clicked");
          await browser.pause(4000);
          (await $(QASAPLOGIN.va03StatusManagementInfo)).waitForDisplayed({ timeout: 60000 });
          await browser.pause(3000);       
          (await $(QASAPLOGIN.va02BackBtn)).click();
          console.log("Back btn clicked");
          await browser.pause(6000);
          (await $(QASAPLOGIN.va02SaveBun)).waitForDisplayed({ timeout: 60000 });
          await $(QASAPLOGIN.va02SaveBun).click();
          await browser.pause(7000);
          console.log("Save button is clicked");
          
          // let done = false;
          // while (!done) {
          //   console.log(done);
          //   console.log("Waiting for success txt");
          //   if (await $(QASAPLOGIN.va02SaveSucctxt).isDisplayed()) {
          //     await browser.pause(500);
          //     let succtxt = await $(QASAPLOGIN.va02SaveSucctxt).getText();
          //     console.log(succtxt);
          //     done = true;
          //     console.log(done);
          //   } else await browser.pause(5000);
          // }        

        }
        
       }   
      await browser.pause(2000);
      await sap.removeBillingBlock(obdNum);
      await browser.pause(2000);
    
  //}
  await browser.pause(2000);
});

Then(/^the user process F2 Invoice$/, async () => {
  await browser.pause(2000);
  console.log("Inside F2 invoice");
  (await $(QASAPLOGIN.txtTcode)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nsa38');
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  (await $(QASAPLOGIN.txtProgram)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.txtProgram).clearValue();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram, "RV60SBAT");
  console.log("prog name entered");
  await sap.keyboardActions("Enter");

  // await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();

  (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
  console.log("prog executed ");
  (await $(QASAPLOGIN.salesOrg)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.salesOrg, "1019");
  console.log("sales org entered");
  await sap.keyboardActions("Enter");
  await sap.enterTextInTextBox(QASAPLOGIN.sdDocument, orderNum);
  console.log("order no entered");
  await sap.keyboardActions("Enter");
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
  while (!done) {
    console.log(done);
    console.log("Waiting for job name");
    if (await $(QASAPLOGIN.JobName).isDisplayed()) {
      await browser.pause(500);
      jobName = await $(QASAPLOGIN.JobName).getText();
      console.log(jobName);
      done = true;
      console.log(done);
    } else await browser.pause(5000);
  }
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
  // await sap.enterTextInTextBox(QASAPLOGIN.JobNametext,'INVOICE_241101_072135_01_VCQS7AP');
  await sap.keyboardActions('Enter');
  console.log("job name entered");
  await browser.pause(2000);
  (await $(QASAPLOGIN.schedChkBx)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.schedChkBx)).click();
  console.log("schedChkBx checked");
  (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
  await browser.pause(2000);
  console.log("Execution initiated for sm37");
  await browser.pause(2000);
  //verify job status
  // (await $(QASAPLOGIN.jobStatus)).waitForDisplayed({ timeout: 60000 });
  // let jobStatus= await $(QASAPLOGIN.jobStatus).getText();
  // console.log(jobStatus);
  await $(QASAPLOGIN.checkbxClicked).scrollIntoView({ block: "center" });
  await browser.pause(4000); 
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
  
  (await $(QASAPLOGIN.sm37JobRefresh)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.sm37JobRefresh).click();
  await browser.pause(6000);
  console.log("Refresh btn is Clicked!");

  // let done = false;
  // while (!done) {
  //   console.log("Waiting for SM37 job completion..");
  //   console.log(done);
  //   (await $(QASAPLOGIN.jobStatus)).waitForDisplayed({ timeout: 60000 });
  //   let jobStatus = await $(QASAPLOGIN.jobStatus).getText();
  //   console.log(jobStatus);
        
  //   if (jobStatus === 'Finished') {
  //     await browser.pause(500);
  //     console.log("SM37 job is completed..!");
  //     done = true;
  //     console.log(done);
  //   } else {
  //     await browser.pause(50000);
  //     (await $(QASAPLOGIN.sm37JobRefresh)).waitForDisplayed({ timeout: 60000 });
  //     await (await $(QASAPLOGIN.sm37JobRefresh)).click();
  //     await browser.pause(6000);
  //     console.log("Refresh btn is Clicked!");
  //   }
  // }
      

});

Then(
  /^user go to va03 to check status for OBD and GI COM stock (.*)$/,
  async (Tcode) => {
    await browser.pause(5000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    await browser.pause(5000);
    (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await browser.pause(5000);
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
    console.log("order entered");
    (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
    console.log("Continue btn clicked");
    await browser.pause(6000);
    (await $(QASAPLOGIN.va03WebsiteOrderTxt)).waitForDisplayed({
      timeout: 60000,
    });
    await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
    console.log("Website order Text is clicked now");
    await browser.pause(5000);
    await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
    //await $(`//div[contains(@title,'Display Document Flow (F5)')]`).click();

    //await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
    await browser.pause(6000);
    console.log("Display document flow is opened");
  }
);

Then(/^user verify Invoice doc created in (.*)$/, async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  console.log("order entered");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
  console.log("clicked on continue btn");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
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
Then(
  /^the user goto sa37 to veiry job scheduled release (.*)$/,
  async (Tcode) => {
    const orderNum = await sap.getOrderNumber();
    //need to save job name and use it again in sm37
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    console.log("tcode entered ");
    await browser.pause(2000);
    await $(`//*[@title='Background job name']`).addValue(
      "INVOICE_240930_062933_01_VCQS7AP"
    );
    // await sap.enterProgramName(QASAPLOGIN.jobName,'INVOICE_240930_062933_01_VCQS7AP');
    await sap.keyboardActions("Enter");
    console.log("job name entered");
    await browser.pause(2000);
    (await $(QASAPLOGIN.schedChkBx)).click();
    console.log("schedChkBx checked");
    await sap.clicktheBtnXpath(QASAPLOGIN.salesDocExecuteBtn);
    //need to check step 26 steps here
  }
);

//Invoice is created but in open state need to change status as complete
Then(/^user goto invoice document to complete (.*)$/, async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  console.log("order entered");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
  console.log("clicked on continue btn");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
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
  await sap.enterTextInTextBox(QASAPLOGIN.companyCode, "1019");
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
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const date = new Date();
  currentDate = formatDate(date); // Format as MM/DD/YYYY
  console.log(`Current Date: ${currentDate}`);

  (await $(QASAPLOGIN.billingDateTxt)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.billingDateTxt, currentDate);
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
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nVA03");
  await sap.keyboardActions("Enter");
  //await sapLogin.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  console.log("order entered");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).click();
  console.log("clicked on continue btn");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("verify Journal entry created");
});
Then(
  /^the user wait for 15 min to verify Invoice is generated(.*)$/,
  async (Tcode) => {
    await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
    const orderNum = await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    await $(QASAPLOGIN.va03OrderNumtxtBox).waitForDisplayed({ timeout: 60000 });
    await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    console.log("VA03 order opened");
    await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({
      timeout: 60000,
    });
    await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
    console.log("displayed doc open");
    for (let i = 0; i <= 7; i++) {
      let done = false;
      while (!done) {
        console.log(done);
        console.log("Waiting for invoice");
        if (await $(QASAPLOGIN.invoiceDoc).isDisplayed()) {
          await browser.pause(500);
          console.log("Invoice generated!");
          done = true;
          console.log(done);
        } else await browser.pause(250000);
        await (await $(QASAPLOGIN.va03backBtn)).click();
        await browser.pause(1000);
        console.log("back button is clicked !");
        await browser.pause(1000);
        await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({
          timeout: 60000,
        });
        await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        console.log("displayed doc open");
        await browser.pause(1000);
      }
    }
  }
);

Then(/^the user verify that the invoice is created(.*)$/, async (Tcode) => {
        await browser.pause(6000);
        await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
        const orderNum=await sap.getOrderNumber();
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        await $(QASAPLOGIN.va03OrderNumtxtBox).waitForDisplayed({ timeout: 60000 });
        await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
        await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        await browser.pause(4000);
        console.log("VA03 order opened");
        await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({ timeout: 60000 });
        await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        console.log("Display doc open");
        await browser.pause(6000);

      if (await $(QASAPLOGIN.invoiceDoc).isDisplayed()) {
                await browser.pause(500);
                console.log("Invoice generated!");          
      } else
        
      { console.log("Invoice not yet generated!");
      }

      await browser.pause(6000);
      let journalStatus = await (await $(QASAPLOGIN.journalStatus)).getText();
      console.log(journalStatus);
    
      if (journalStatus === "Cleared") {
        console.log("journalStatus is cleared!", journalStatus);
      } else {
        console.log("journalStatus is not cleared!", journalStatus);
      }
  
        // for (let i=0;i<=7;i++)
        // {
        // let done=false;                
        //     while(!done){
        //       console.log(done);
        //       console.log("Waiting for invoice");
        //       if(await $(QASAPLOGIN.invoiceDoc).isDisplayed()){
        //         await browser.pause(500);
        //         console.log("Invoice generated!");
        //       done=true;
        //       console.log(done);
        //       }else
        //       await browser.pause(250000);
        //       await (await $(QASAPLOGIN.va03backBtn)).click();
        //       await browser.pause(1000);
        //       console.log("back button is clicked !");
        //       await browser.pause(1000);
        //       await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({ timeout: 60000 });
        //       await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        //       console.log("displayed doc open");
        //       await browser.pause(1000);
        //     }
         // }
});
Then(/^the user the process the invoice(.*)$/,async (Tcode) => {
    await browser.pause(4000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
    //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
    console.log("VA03 order opened");
    (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({timeout: 60000});
    await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
    console.log("Document flow is opened!");
    await browser.pause(5000);
    (await $(QASAPLOGIN.invoiceDoc)).waitForDisplayed({ timeout: 60000 });
    (await $(QASAPLOGIN.invoiceDoc)).click();
    await browser.pause(6000);
    console.log("invoice clicked");
    await browser.pause(2000);
    await $(QASAPLOGIN.va03PODisplyDoc).click();
    console.log("display Document Btn clicked");
    await browser.pause(6000);
    (await $(QASAPLOGIN.changeBtn)).waitForDisplayed({ timeout: 60000 });
    (await $(QASAPLOGIN.changeBtn)).click();
    console.log("change btn clicked");
    await browser.pause(6000);
    (await $(QASAPLOGIN.companyCode)).waitForDisplayed({ timeout: 60000 });
    await sap.enterTextInTextBox(QASAPLOGIN.companyCode, "1019");
    console.log("company code entered");
    await browser.pause(3000);
    await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
    console.log("clicked on continue btn");
    await browser.pause(6000);
    (await $(QASAPLOGIN.displayHeaderDetails)).waitForDisplayed({timeout: 60000,});
    (await $(QASAPLOGIN.displayHeaderDetails)).click();
    console.log("clicked on header details btn");
    //select date as todays date here
    await browser.pause(3000);
    (await $(QASAPLOGIN.billingDateTxt)).click();
    console.log("clicked on billingDatetxt");
    let currentDate: string;

    const formatDate = (date: Date): string => {
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
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
  }
);

Then(/^the user verify journal entry creation(.*)$/, async (Tcode) => {
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  //await sapLogin.getOrderNumber();
  await $(QASAPLOGIN.va03OrderNumtxtBox).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  console.log("order entered");
  await browser.pause(3000);
  await $(QASAPLOGIN.va03DisplayDocumentBtn).waitForDisplayed({
    timeout: 60000,
  });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("verify Journal entry created");
  await browser.pause(6000);
  let journalStatus = await (await $(QASAPLOGIN.journalStatus)).getText();
  console.log(journalStatus);

  if (journalStatus === "Cleared") {
    console.log("journalStatus is cleared!", journalStatus);
  } else {
    console.log("journalStatus is not cleared!", journalStatus);
  }
});

//// STH-VDS Specific Components////

Then(/^user process PO with (.*)$/, async (Tcode) => {
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ExistingIdcTxtbx).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(
    QASAPLOGIN.we19ExistingIdcTxtbx,
    "0000001800799741"
  );
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19CreateBtn).click();
  await browser.pause(2000);
  console.log("Create button is clicked");
  await browser.pause(2000);
  await $(QASAPLOGIN.we19E1EDL20txt).waitForDisplayed({ timeout: 60000 });
  await browser.pause(3000);
  await $(QASAPLOGIN.we19E1EDL20txt).click();
  await browser.pause(3000);
  await browser.keys(["Control", "Shift", "F11"]);
  await browser.pause(3000);
  // await $(QASAPLOGIN.we19ExpandSubtree).waitForDisplayed({ timeout: 60000 });
  // await $(QASAPLOGIN.we19ExpandSubtree).click();
  console.log("Tree structure expanded");
  await browser.pause(6000);

  await $(QASAPLOGIN.we19PONum).waitForDisplayed({ timeout: 60000 });
  await browser.pause(2000);
  (await $(QASAPLOGIN.we19PONum)).doubleClick();
  await browser.pause(6000);
  console.log("E1EDL41 is opened for change");

  function removeLeadingZerosRegex(str) {
    return str.replace(/^0+(?=\d)/, "");
  }
  let POWithoutZero = await removeLeadingZerosRegex(POnum);
  console.log(POWithoutZero);
  await browser.pause(4000);

  await $(QASAPLOGIN.we19E1ELD41PONUM).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.we19E1ELD41PONUM)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.we19E1ELD41PONUM, POWithoutZero);
  console.log("PO number is updated in WE19");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn).click();
  console.log("Continue button clicked!!");
  await browser.pause(3000);

  await $(QASAPLOGIN.we191E1EDL24SHPST).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.we191E1EDL24SHPST)).doubleClick();
  console.log("E1EDL24 is opened for change");
  await $(QASAPLOGIN.we19E1EDLUniquNum).waitForDisplayed({ timeout: 60000 });
  let uniqeNum = "1ZA68W012000" + POnum;
  console.log(uniqeNum);
  (await $(QASAPLOGIN.we19E1EDLUniquNum)).clearValue();
  await browser.pause(1000);
  await sap.enterTextInTextBox(QASAPLOGIN.we19E1EDLUniquNum, uniqeNum);
  console.log("Unique number is updated in WE19");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn).click();
  console.log("Continue button clicked!!");
  await browser.pause(3000);

  await $(QASAPLOGIN.we191E1EDL24).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.we191E1EDL24)).doubleClick();
  console.log("E1EDL24 is opened for changing Article details");
  await $(QASAPLOGIN.we19ArticleNum).waitForDisplayed({ timeout: 60000 });
  console.log(POArt);
  let artNum = "00000000" + POArt;
  console.log(artNum);
  (await $(QASAPLOGIN.we19ArticleNum)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.we19ArticleNum, artNum);
  console.log("Article number is updated in WE19");
  await browser.pause(3000);

  (await $(QASAPLOGIN.we19ArticleDesc)).clearValue();
  await browser.pause(2000);
  console.log(PODesc);
  await sap.enterTextInTextBox(QASAPLOGIN.we19ArticleDesc, PODesc);
  await browser.pause(3000);
  console.log("Article description is updated in WE19");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn).click();
  console.log("Continue button clicked!!");
  await browser.pause(6000);
  //await sap.keyboardCTRLF2();
  //   Mousetrap.bind(['ctrl+f2', 'inbound function module'], function(e) {
  //     //_saveDraft();
  //     return true;
  // });;
  await browser.keys(["Control", "F2"]);
  await browser.pause(3000);
  await $(QASAPLOGIN.we19InboudFnModuleTxtBx).waitForDisplayed({
    timeout: 60000,
  });
  (await $(QASAPLOGIN.we19InboudFnModuleTxtBx)).clearValue();
  await sap.enterTextInTextBox(
    QASAPLOGIN.we19InboudFnModuleTxtBx,
    "YDSD_IDOC_INPUT_CHUB_SHIP_CONF"
  );
  await browser.pause(6000);
  console.log("Inbound function module entered!!");
  await sap.keyboardActions("Enter");
  await browser.pause(6000);
  console.log("Inbound function module processed");

  await $(QASAPLOGIN.we19IdocTxt).waitForDisplayed({ timeout: 60000 });
  we19Idoc = await $(QASAPLOGIN.we19IdocTxt).getText();
  console.log(we19Idoc);
  // Extracting the order number using a regex
  //  const match = we19Idoc.match(/Order Number:\s*(\d+)/);
  //  let we19IdocExtracted: number | null = null;
  //  if (match) {
  //   we19IdocExtracted =  Number(match[1]); // Save the extracted number
  //  }
  //  console.log(we19IdocExtracted);
  let we19IdocExtracted = await sap.extractNumberFromString(we19Idoc);
  console.log(we19IdocExtracted);
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn2).click();
  console.log("Continue button clicked!!");
  await browser.pause(6000);
});

Then(/^the user check the zvds order details with Tcode (.*)$/,async (Tcode) => {
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
    //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
    await expect($(QASAPLOGIN.va03zvdsCheck)).toBeDisplayed();
    console.log("VA03 order opened and item category ZVDS verified");
  }
);
Then(/^the user go to ZVDS OBD PGI for releasing the delivery(.*)$/, async(Tcode) =>{
  await browser.pause(2000);
    const orderNum=await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
    console.log("tcode entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    (await $(QASAPLOGIN.txtProgram)).waitForDisplayed({ timeout: 60000 });
    await $(QASAPLOGIN.txtProgram).clearValue();    
    await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'WS_MONITOR_OUTB_DEL_GDSI');
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
    await $(QASAPLOGIN.deliverychkbx).click();
    console.log("deliverychkbx checkbox clicked");
    await browser.pause(4000);
    (await $(QASAPLOGIN.postGoodsIssueOnOBDPage)).click();
      console.log("post goods issue btn clicked on prog page");

      await browser.pause(4000);
      await sap.clicktheBtnXpath(QASAPLOGIN.CalenderContinue);
      await browser.pause(4000);
      console.log("Clicked 1st continue btn");
      let done=false;
      
      while(!done){
        console.log(done);
        console.log("Waiting for zvdspgicontinueBtn btn");
        if(await $(QASAPLOGIN.zvdspgicontinueBtn).isDisplayed()){
          await browser.pause(500);
          (await $(QASAPLOGIN.CalenderContinue)).waitForDisplayed({ timeout: 10000 });
          await $(QASAPLOGIN.CalenderContinue).click();
          console.log("CalenderContinue clicked");
        done=true;
        console.log(done);
        }else
        await browser.pause(5000);
      }
      
      let done1= false;
      while(!done1){
        console.log(done1);
        console.log("Waiting for invoiceSuccTxt btn");
        if(await $(QASAPLOGIN.invoiceSuccTxt).isDisplayed()){
          await browser.pause(500);       
          console.log("Invoice created successfully..!");  
        done1=true;
        console.log(done1);
        }else
        await browser.pause(5000);
      }

});
Then(/^the user checks the PO with Tcode(.*)$/, async (Tcode) => {
  await browser.pause(3000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("VA03 order opened");
  //  await sap.sleep(6000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Display document flow is opened");
  await browser.pause(2000);
  const POnumFromDocFlow = await $(QASAPLOGIN.va03DisplayDocPONum).getText();
  console.log(POnumFromDocFlow);
  (await $(QASAPLOGIN.va03DisplayDocPONum)).doubleClick();
  await browser.pause(5000);
  POnum = await $(QASAPLOGIN.va03PONUM).getText();
  console.log("PO number is:" + POnum);

  await browser.pause(3000);
  POQty = await $(QASAPLOGIN.va03POQty).getText();
  console.log("PO QTY is:" + POQty);

  await browser.pause(3000);
  POArt = await $(QASAPLOGIN.va03POArticle).getText();
  console.log("PO Article number is:" + POArt);

  await browser.pause(3000);
  PODesc = await $(QASAPLOGIN.va03PODesc).getText();
  console.log("Article Description in PO is:" + PODesc);

  //
  //await sap.extractPOnum(POnum);
});

Then(/^the user go to generate IDOC number (.*)$/, async (Tcode) => {
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ExistingIdcTxtbx).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.we19ExistingIdcTxtbx,"0000001800799741");
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19CreateBtn).click();
  await browser.pause(2000);
  console.log("Create button is clicked");
  await browser.pause(2000);
  await $(QASAPLOGIN.we19E1EDL20txt).waitForDisplayed({ timeout: 60000 });
  await browser.pause(3000);
  await $(QASAPLOGIN.we19E1EDL20txt).click();
  await browser.pause(3000);
  await browser.keys(["Control", "Shift", "F11"]);
  await browser.pause(3000);
  // await $(QASAPLOGIN.we19ExpandSubtree).waitForDisplayed({ timeout: 60000 });
  // await $(QASAPLOGIN.we19ExpandSubtree).click();
  console.log("Tree structure expanded");
  await browser.pause(6000);
  await $(QASAPLOGIN.we19PONum).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.we19PONum)).doubleClick();
  await browser.pause(6000);
  console.log("E1EDL41 is opened for change");

  function removeLeadingZerosRegex(str) {
    return str.replace(/^0+(?=\d)/, "");
  }
  let POWithoutZero = await removeLeadingZerosRegex(POnum);
  console.log(POWithoutZero);
  await browser.pause(4000);

  await $(QASAPLOGIN.we19E1ELD41PONUM).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.we19E1ELD41PONUM)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.we19E1ELD41PONUM, POWithoutZero);
  console.log("PO number is updated in WE19");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn).click();
  console.log("Continue button clicked!!");
  await browser.pause(3000);

  await $(QASAPLOGIN.we191E1EDL24SHPST).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.we191E1EDL24SHPST)).doubleClick();
  console.log("E1EDL24 is opened for change");
  await $(QASAPLOGIN.we19E1EDLUniquNum).waitForDisplayed({ timeout: 60000 });
  let uniqeNum = "1ZA68W012000" + POnum;
  console.log(uniqeNum);
  (await $(QASAPLOGIN.we19E1EDLUniquNum)).clearValue();
  await browser.pause(1000);
  await sap.enterTextInTextBox(QASAPLOGIN.we19E1EDLUniquNum, uniqeNum);
  console.log("Unique number is updated in WE19");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn).click();
  console.log("Continue button clicked!!");
  await browser.pause(3000);

  await $(QASAPLOGIN.we191E1EDL24).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.we191E1EDL24)).doubleClick();
  console.log("E1EDL24 is opened for changing Article details");
  await $(QASAPLOGIN.we19ArticleNum).waitForDisplayed({ timeout: 60000 });
  console.log(POArt);
  let artNum = "00000000" + POArt;
  console.log(artNum);
  (await $(QASAPLOGIN.we19ArticleNum)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.we19ArticleNum, artNum);
  console.log("Article number is updated in WE19");
  await browser.pause(3000);

  (await $(QASAPLOGIN.we19ArticleDesc)).clearValue();
  await browser.pause(2000);
  console.log(PODesc);
  await sap.enterTextInTextBox(QASAPLOGIN.we19ArticleDesc, PODesc);
  await browser.pause(3000);
  console.log("Article description is updated in WE19");
  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn).click();
  console.log("Continue button clicked!!");
  await browser.pause(6000);
  //await sap.keyboardCTRLF2();
  //   Mousetrap.bind(['ctrl+f2', 'inbound function module'], function(e) {
  //     //_saveDraft();
  //     return true;
  // });;
  await browser.keys(["Control", "F2"]);
  await browser.pause(3000);
  await $(QASAPLOGIN.we19InboudFnModuleTxtBx).waitForDisplayed({
    timeout: 60000,
  });
  (await $(QASAPLOGIN.we19InboudFnModuleTxtBx)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.we19InboudFnModuleTxtBx,"YDSD_IDOC_INPUT_CHUB_SHIP_CONF"
  );
  await browser.pause(6000);
  console.log("Inbound function module entered!!");
  await sap.keyboardActions("Enter");
  await browser.pause(6000);
  console.log("Inbound function module processed");

  await $(QASAPLOGIN.we19IdocTxt).waitForDisplayed({ timeout: 60000 });
  we19Idoc = await $(QASAPLOGIN.we19IdocTxt).getText();
  console.log(we19Idoc);
  await browser.pause(3000);
  we19IdocExtracted = await sap.extractNumberFromString(we19Idoc);
  console.log(we19IdocExtracted);

  await browser.pause(3000);
  await $(QASAPLOGIN.we19ContinueBtn2).click();
  console.log("Continue button clicked!!");
  await browser.pause(6000);
});

//---------------Resude the same function for release PGI------------

//----------------Vefiry GR and OBD Created-----------------

Then(/^the user go to va03 to verify GD status (.*)$/, async (Tcode) => {
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  console.log("order entered");
  await browser.pause(6000);
  await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("disply Doc btn clicked");

  //verify GIcom stock created

  await browser.pause(6000);
  await waitForElement(await $(QASAPLOGIN.GICOMStockDoc));
  const GIStockDoc = await $(QASAPLOGIN.GICOMStockDoc).getText();
  await browser.pause(2000);
  console.log(GIStockDoc);
  if (GIStockDoc.includes("GI COM Stock Item")) {
    console.log('GI COM Stock Item generated "${GI COM Stock Item}"');
  } else {
    console.log("GI COM Stock Item not generated");
  }
  console.log(" completed ");
  await browser.pause(2000);
});

//----------Reuse the code for picking and Goods Issue --------
//---------Then the user process the IDOC number to generate PO /nBD87-----

Then(/^the user process the IDOC number to generate OBD(.*)$/,async (Tcode) => {
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await browser.pause(2000);
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    const idocTextBox = await $(QASAPLOGIN.bd87IdoctxtBox);
    await idocTextBox.waitForDisplayed({ timeout: 60000 });
    await idocTextBox.click();
    (await $(QASAPLOGIN.bd87IdoctxtBox)).waitForDisplayed({ timeout: 60000 });
    await sap.enterTextInTextBox(QASAPLOGIN.bd87IdoctxtBox, we19IdocExtracted);
    await browser.pause(3000);
    (await $(QASAPLOGIN.bd87ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
    await sap.clicktheBtnXpath(QASAPLOGIN.bd87ExecuteBtn);
    await browser.pause(2000);
    (await $(QASAPLOGIN.bd87idocStatus53)).waitForDisplayed({ timeout: 60000 });
    let idocStatus = await $(QASAPLOGIN.bd87idocStatus53).getText();
    console.log(idocStatus);
    if ((await idocStatus) === "53") {
      console.log("idoc proccessed succ");
    } else {
      console.log("Moving to else..");
      await browser.pause(2000);
      (await $(QASAPLOGIN.bd87QS7txt)).waitForDisplayed({ timeout: 60000 });
      await sap.clicktheBtnXpath(QASAPLOGIN.bd87QS7txt);
      await browser.pause(2000);
      (await $(QASAPLOGIN.bd87IDCOReadyToProcesstxt)).waitForDisplayed({
        timeout: 60000,
      });
      await sap.clicktheBtnXpath(QASAPLOGIN.bd87IDCOReadyToProcesstxt);
      await browser.pause(5000);
      await sap.keyboardActionsF8("F8");
      await browser.pause(5000);
      console.log("presssed f8");
      (await $(QASAPLOGIN.bd87Successtxt)).waitForDisplayed({ timeout: 60000 });
      let idocStatuNew = await $(QASAPLOGIN.bd87Successtxt).getText();
      await browser.pause(5000);
      console.log(idocStatuNew);
      if (idocStatuNew === "53") {
        console.log("idoc is processed successfully..!!");
      }
    }
    await browser.pause(3000);
  }
);

Then(/^the user go to verify GR(.*)$/, async (Tcode) => {
  await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  await browser.pause(5000);
  console.log("VA03 order opened");
  (await $(QASAPLOGIN.va03WebsiteOrderTxt)).waitForDisplayed({
    timeout: 60000,
  });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
  console.log("Website order Text is clicked now");
  await browser.pause(5000);
  (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({
    timeout: 60000,
  });
  await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
  await browser.pause(6000);
  console.log("Display document flow is opened");
  await browser.pause(5000);
  (await $(QASAPLOGIN.va03DisplayDocPONum)).waitForDisplayed({
    timeout: 60000,
  });
  await (await $(QASAPLOGIN.va03DisplayDocPONum)).click();
  console.log("POnumber is clicked");
  await browser.pause(6000);
  (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.va03PODisplyDoc)).click();
  console.log("PO Document is opened!");
  await browser.pause(6000);
  (await $(QASAPLOGIN.gr101)).waitForDisplayed({ timeout: 60000 });

  if ((await $(QASAPLOGIN.gr101)).isDisplayed) {
    console.log("GR101 is created");
  } else {
    console.log("GR101 not created");
  }
});

// Then(/^the user go to verify Outbound Delivery (.*)$/, async (Tcode) => {
//   await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
//   await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
//   await sap.keyboardActions("Enter");
//   await browser.pause(2000);
//   const orderNum = await sap.getOrderNumber();
//   //await sapLogin.getOrderNumber();
//   await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
//   await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
//   await sap.keyboardActions("Enter");
//   await browser.pause(5000);
//   // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
//   console.log("VA03 order opened");
//   await browser.pause(8000);

//   await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
//   console.log("Website order Text is clicked now");
//   await browser.pause(5000);
//   await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
//   await browser.pause(6000);
//   console.log("Display document flow is opened");

//   await browser.pause(2000);
//   if (await $(QASAPLOGIN.va03ODB).isDisplayed()) {
//     obdNum = await (await $(QASAPLOGIN.va03ODB)).getText();
//     console.log("ODB is created!", obdNum);
//     await browser.pause(2000);
//     (await $(QASAPLOGIN.obdDocument)).doubleClick();
//     await $(QASAPLOGIN.va03ODBNUM).waitForDisplayed({ timeout: 60000 });
//     obdNum = await $(QASAPLOGIN.va03ODBNUM).getText();
//     console.log(obdNum);
//     await browser.pause(2000);
//   } else {
//     console.log("ODB is not created!");
//   }
//   await browser.pause(2000);
// });

//--------------Reuse the step for Release PGI --------------------

//------Then the user go to va03 to verify GD goods issue status /nva03-------

Then(
  /^the user go to va03 to verify GD goods issue status(.*)$/,
  async (Tcode) => {
    await browser.pause(2000);
    const orderNum = await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    await browser.pause(4000);
    (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({
      timeout: 60000,
    });
    (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
    console.log("order entered");
    await browser.pause(6000);
    await waitForElement(await $(QASAPLOGIN.va03DisplayDocumentBtn));
    await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
    console.log("disply Doc btn clicked");
    await browser.pause(6000);
    //verify gdGoodsIsuue created
    (await $(QASAPLOGIN.GDGoodIssue)).waitForDisplayed({ timeout: 60000 });
    const gdGoodsIsuue = await $(QASAPLOGIN.GDGoodIssue).getText();
    await browser.pause(2000);
    console.log(gdGoodsIsuue);
    if (gdGoodsIsuue.includes("GD goods issue:")) {
      console.log("GD goods issue: generated");
    } else {
      console.log("GD goods issue: not generated");
    }
    console.log(" completed ");
    await browser.pause(2000);
  }
);

Then(/^the user do the OBD PGI for releasing the delivery for VDS Order(.*)$/, async(Tcode) =>{
  await browser.pause(2000);
    const orderNum=await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
    console.log("tcode entered");
    await sap.keyboardActions('Enter');
    await browser.pause(5000);
    (await $(QASAPLOGIN.txtProgram)).waitForDisplayed({ timeout: 60000 });
      await $(QASAPLOGIN.txtProgram).clearValue(); 
      await browser.pause(5000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtProgram, 'WS_MONITOR_OUTB_DEL_GDSI');
    await browser.pause(4000);
    console.log("prog name entered");
    await sap.keyboardActions('Enter');
    await browser.pause(4000);
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("prog executed ");  
    await browser.pause(5000);
    await sap.enterTextInTextBox(QASAPLOGIN.deliveryCode,obdNum);
    console.log("obdNum entered ");
    await browser.pause(2000);
    await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
    console.log("prog executed ");
    await browser.pause(5000);
    await $(QASAPLOGIN.deliverychkbx).click();
    console.log("deliverychkbx checkbox clicked");
    await browser.pause(4000);
    (await $(QASAPLOGIN.postGoodsIssueOnOBDPage)).click();
      console.log("post goods issue btn clicked on prog page");
 
      await browser.pause(4000);
      await sap.clicktheBtnXpath(QASAPLOGIN.CalenderContinue);
      await browser.pause(4000);
      console.log("Clicked 1st continue btn");
      let done=false;
     
      while(!done){
        console.log(done);
        console.log("Waiting for zvdspgicontinueBtn btn");
        if(await $(QASAPLOGIN.zvdspgicontinueBtn).isDisplayed()){
          await browser.pause(500);
          (await $(QASAPLOGIN.CalenderContinue)).waitForDisplayed({ timeout: 10000 });
          await $(QASAPLOGIN.CalenderContinue).click();
          console.log("CalenderContinue clicked");
        done=true;
        console.log(done);
        }else
        await browser.pause(5000);
      }
     
      let done1= false;
      while(!done1){
        console.log(done1);
        console.log("Waiting for invoiceSuccTxt btn");
        if(await $(QASAPLOGIN.invoiceSuccTxt).isDisplayed()){
          await browser.pause(500);      
          console.log("Invoice created successfully..!");  
        done1=true;
        console.log(done1);
        }else
        await browser.pause(5000);
      }
});
//----------------------------Appliance------------------------------
 
//Then the user check the order details with Tcode /nva03 (user goto va03 to check the order details)
 
Then(/^the user check the ZNAS order details with Tcode (.*)$/ , async(Tcode) =>{
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  const orderNum=await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
  await sap.keyboardActions('Enter');
 // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
  await expect($(QASAPLOGIN.va03znasCheck)).toBeDisplayed()
  console.log("VA03 order opened");
});
 
 
  Then(/^the user go to generate DPR(.*)$/ , async(Tcode) =>{
    const orderNum = await sap.getOrderNumber();
//add code to verify DPR already created or not if its there skip this step and execute next step
        await browser.pause(2000);
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nva03');
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
        await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        console.log("VA03 order opened");
        await browser.pause(4000);
        (await $(QASAPLOGIN.va03WebsiteOrderTxt)).waitForDisplayed({ timeout: 60000 });
        await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
        console.log("Website order Text is clicked now");
        await browser.pause(5000);
        (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({ timeout: 60000 });
        await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
        await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        console.log("Display document flow is opened");
        await waitForElement (await $(QASAPLOGIN.va03DPR));
    if ((await $(QASAPLOGIN.va03DPR)).isDisplayed) {
      console.log("inside first if DPR is present");
      await browser.pause(2000);
      await waitForElement(await $(QASAPLOGIN.va03DPR));
      const DPRDoc = await $(QASAPLOGIN.va03DPR).getText();
      await browser.pause(2000);
      console.log(DPRDoc);
      if (DPRDoc.includes('Down Payment Request')) {
        console.log("DPR created");
      }
    }
    else {
      console.log("DPR not created");
      console.log("In DPR generation step");
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nsa38');
      await sap.keyboardActions('Enter');
      await browser.pause(2000);
      await sap.enterTextInTextBox(QASAPLOGIN.txtProgram, 'YDSD_UPDATE_DD_DELIVERY_JOB');
      await sap.keyboardActions('Enter');
      await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
      await browser.pause(4000);
      //add code for vbeln step
      await sap.enterTextInTextBox(QASAPLOGIN.poSalesDocNo, orderNum);
      console.log("order no entered in VBLEN text");
      await browser.pause(2000);
      await waitForElement(await $(QASAPLOGIN.execute));
      await sap.clicktheBtnXpath(QASAPLOGIN.execute);
      console.log("VBLEN Execute");
      await browser.pause(30000);
    }
  });
 
  //goto va03 to verify DPR created
 
  Then(/^the user checks the Appliance PO with Tcode(.*)$/ , async(Tcode) =>{
    await browser.pause(2000);
        const orderNum = await sap.getOrderNumber();
        await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
        await sap.keyboardActions('Enter');
        await browser.pause(2000);
        (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
        await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
        await sap.keyboardActions('Enter');
        console.log("VA03 order opened");
        await browser.pause(4000);
        (await $(QASAPLOGIN.va03WebsiteOrderTxt)).waitForDisplayed({ timeout: 60000 });
        await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
        console.log("Website order Text is clicked now");
        await browser.pause(5000);
        (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({ timeout: 60000 });
        await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
        await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
        console.log("Display document flow is opened");
        await browser.pause(2000);       
        await waitForElement (await $(QASAPLOGIN.vendorPO));
        const VendorPODoc=await $(QASAPLOGIN.vendorPO).getText();
        await browser.pause(2000);
        console.log(VendorPODoc);
        if (VendorPODoc.includes('Purchase Order'))
          {
            console.log("vendor po created");
          }
        else
          {
            console.log("vendor po not created");
          }
        (await $(QASAPLOGIN.vendorPO)).doubleClick();
        await browser.pause(5000)
        VendorPOnum=await $(QASAPLOGIN.va03PONUM).getText();
        console.log(VendorPOnum);
        await browser.pause(5000)
        await (await $(QASAPLOGIN.va03backBtn)).click();
        await browser.pause(1000);
        console.log("back button is clicked !");
        await browser.pause(5000)
        await waitForElement (await $(QASAPLOGIN.shipmentPO));
        const ShipmentPODoc=await $(QASAPLOGIN.shipmentPO).getText();
        await browser.pause(2000);
        console.log(ShipmentPODoc);
        if (ShipmentPODoc.includes('Purchase Order'))
          {
            console.log("shipment po created");
          }
        else
          {
            console.log("shipment po not created");
          }
        (await $(QASAPLOGIN.shipmentPO)).doubleClick();
        await browser.pause(5000)
        shipmentPOnum=await $(QASAPLOGIN.va03PONUM).getText();
        console.log(shipmentPOnum);
        await browser.pause(5000)
  });
  Then(/^the user execute RSNAST00 program for ZOEM(.*)$/, async(Tcode)=> {
    const orderNum = await sap.getOrderNumber();
    console.log("In ZEOM generation step");
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    (await $(QASAPLOGIN.txtProgram)).clearValue();
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'RSNAST00');
    await sap.keyboardActions('Enter');
    await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
    await browser.pause(4000);
    await sap.enterTextInTextBox(QASAPLOGIN.rsnastOutputType,'EF');
    console.log("output application EF entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.rsnastObjectKey,VendorPOnum);
    console.log("object key vendor PONum entered");
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.rsnastZESCOutputType,'ZOEM');
    await browser.pause(2000);
    console.log("output type ZEOM entered");
    await sap.keyboardActions('Enter');
    await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn2);
    console.log("sa38 RSNAST00 Execute");
    await browser.pause(4000);
    (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
    await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
    console.log("Tick mark button clicked");
    await browser.pause(4000);
    (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
    await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
    console.log("continue button clicked");      
});
Then(/^the user go to change the delivery status(.*)$/, async(Tcode)=> {
  const orderNum = await sap.getOrderNumber();
  console.log("In delivery status change step");
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  (await $(QASAPLOGIN.txtProgram)).clearValue();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'YDSD_SALES_DEL_STAT_CHG');
  await $(QASAPLOGIN.execute).click();
  console.log("YDSD_SALES_DEL_STAT_CHG prog entered");
  await browser.pause(2000);
  await waitForElement (await $(QASAPLOGIN.salesDoc));
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.salesDoc,orderNum);
  console.log("Order no entered in sales doc");
  await browser.pause(6000);
  await waitForElement (await $(QASAPLOGIN.va03ExecuteBtn3));
  await $(QASAPLOGIN.va03ExecuteBtn3).click();
  console.log("Prog Executed");
  await browser.pause(6000);
});
Then(/^the user go to PO GR process(.*)$/, async(Tcode)=> {
  const orderNum = await sap.getOrderNumber();
  console.log("In PO GR process step");
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  (await $(QASAPLOGIN.txtProgram)).clearValue();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'ydpure_Goodsreceipt');
  await sap.keyboardActions('Enter');
  console.log("ydpure_Goodsreceipt prog entered");
  await browser.pause(2000);
  await $(QASAPLOGIN.execute).click();
  console.log("Entered program executed"); 
  await browser.pause(2000);
  await sap.clicktheBtnXpath(QASAPLOGIN.getVarient);
  console.log("Get varient clicked....");
  await browser.pause(2000);
  (await $(QASAPLOGIN.createdBy)).clearValue();
  await browser.pause(2000);
  await sap.clicktheBtnXpath(QASAPLOGIN.varientName);
  await sap.enterTextInTextBox(QASAPLOGIN.varientName,'DPUR_AUTO_GR_N');
  await sap.keyboardActions('Enter');
  console.log("varient name entered....");
  await browser.pause(2000);
  await waitForElement (await $(QASAPLOGIN.getVarientExecuteBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.getVarientExecuteBtn);
  console.log("Entered varient executed"); 
  await browser.pause(2000);
  (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
  console.log("Prog Executed");
  await browser.pause(4000);
  (await $(QASAPLOGIN.Username)).waitForDisplayed({ timeout: 60000 });
  if((await $(QASAPLOGIN.Username)).isDisplayed)
    {
      console.log("PO GR processed successfully");
    }
  else
    {
      console.log("PO GR not processed successfully");
    }
  await browser.pause(4000);
});
Then(/^the user removes billing block for appliance (.*)$/, async(Tcode)=> {
  await browser.pause(2000);
  const orderNum=await sap.getOrderNumber();
  (await $(QASAPLOGIN.txtTcode)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.txtProgram)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'YDSDE_ENHD232_GR_TRIGGER');
  await browser.pause(2000);
  await sap.keyboardActions('Enter');
  console.log("Entered program name in Billing block");
  await browser.pause(2000);
  await sap.clicktheBtnXpath(QASAPLOGIN.execute);
  console.log("execute clicked");
  await sap.enterTextInTextBox(QASAPLOGIN.poNumber1,VendorPOnum);
  await browser.pause(4000);
  console.log("vendorPo entered");
  await sap.enterTextInTextBox(QASAPLOGIN.poNumber2,shipmentPOnum);
  await browser.pause(5000);
  console.log("shipmentPOnum entered");
  await sap.clicktheBtnXpath(QASAPLOGIN.bbCheckbox);
  await browser.pause(2000);
  console.log("checkbox clicked");
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  console.log("execution completed");
  await browser.pause(2000);
  let done=false;                
  while(!done){
  console.log(done);
  console.log("Waiting for billing block to remove");
  if(await $(QASAPLOGIN.billingBlkUsertxt).isDisplayed())
    {
      await browser.pause(500);
      console.log("billing block removed!");
      done=true;
      console.log(done);
    }
  else
    {
      console.log("billing block not removed !");
    }       
  }
 await browser.pause(4000);
});
 
//----------------------PO Creation-----------
 
Then(/^the user generate IDOC for appliance creating PO(.*)$/ , async(Tcode) =>{
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  console.log("In generate idoc then statement");
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
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
  console.log(idocnum);
 
  });

 
//-------------------Check PO with va03-----------
 
Then(/^the user checks the vendor & shipment PO with Tcode (.*)$/, async(Tcode)=> {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  const orderNum=await sap.getOrderNumber();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   await sap.keyboardActions('Enter');
   console.log("VA03 order opened");
   (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Display document flow is opened");
  await browser.pause(2000);
  const POnumFromDocFlow=await $(QASAPLOGIN.appliancePODoc).getText();
  console.log(POnumFromDocFlow);
  (await $(QASAPLOGIN.appliancePODoc)).doubleClick();
  await browser.pause(5000)
  POnum=await $(QASAPLOGIN.va03PONUM).getText();
  console.log(POnum);
  //need to add code for second po number copy
});
 
Then(/^the user execute RSNAST00 program for ZOEM with Tcode(.*)$/, async (Tcode) => {
  const orderNum = await sap.getOrderNumber();
  console.log("In ZEOM generation step");
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  (await $(QASAPLOGIN.txtProgram)).clearValue();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'RSNAST00');
  await sap.keyboardActions('Enter');
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.rsnastOutputType,'EF');
  console.log("output application EF entered");
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.rsnastObjectKey,VendorPOnum);
  console.log("object key vendor PONum entered");
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.rsnastZESCOutputType,'ZOEM');
  await browser.pause(2000);
  console.log("output type ZEOM entered");
  await sap.keyboardActions('Enter');
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn2);
  console.log("sa38 RSNAST00 Execute");
  await browser.pause(4000);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("Tick mark button clicked");
  await browser.pause(4000);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("continue button clicked");
 
});
Then(/^the user go to update Vendor PO confirmation(.*)$/, async (Tcode) => {
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   await sap.keyboardActions('Enter');
   console.log("VA03 order opened");
   await browser.pause(4000);
   (await $(QASAPLOGIN.va03WebsiteOrderTxt)).waitForDisplayed({ timeout: 60000 });
      await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
      console.log("Website order Text is clicked now");
      await browser.pause(2000);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Display document flow is opened");
  await browser.pause(2000);
  await waitForElement (await $(QASAPLOGIN.vendorPO));
  await sap.clicktheBtnXpath(QASAPLOGIN.vendorPO);
  console.log("PO Vendor clicked");
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03PODisplyDoc);
  console.log("display doc flow opened");
  await browser.pause(2000);
  (await $(QASAPLOGIN.confirmationTab)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.confirmationTab);
  console.log("confirmation tab clicked");
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03PODisplyDoc);
  console.log("display change btn clicked");
  await browser.pause(2000);
 // await $(QASAPLOGIN.confirmationCCColumn).click();
  await browser.pause(4000);
  await $(QASAPLOGIN.confirmationCCColumn).click();
  await browser.pause(5000);
  await ($(QASAPLOGIN.confirmationCCColumn)).addValue("CF");
  await browser.pause(2000);
  console.log('CF entered');

//  await $(QASAPLOGIN.confirmationDcolmn).click();
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.confirmationDcolmn,"D");
  await browser.pause(2000);
  console.log("D entered")
 // await $(QASAPLOGIN.confirmationQty).click();
  await browser.pause(4000);
  await $(QASAPLOGIN.confirmationCancelBtn).click(); 
  console.log("Cancelled");
  await sap.enterTextInTextBox(QASAPLOGIN.confirmationQty,"1");
  await browser.pause(2000);
  console.log("qty 1 entered")
 
  await browser.pause(2000);
  //CODE TO ENTER FUTURE DATE
  let futureDate: Date;
  const currentDate = new Date();
  // Add 10 days to the current date
  currentDate.setDate(currentDate.getDate() + 10);
  // Format the future date in MM/DD/YYYY format
  const formattedFutureDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  console.log("Future date in MM/DD/YYYY format: ", formattedFutureDate);
  await browser.pause(4000);
  await sap.clicktheBtnXpath(QASAPLOGIN.confirmationDelivDatecolmn);
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.confirmationDelivDatecolmn,formattedFutureDate);
  await browser.pause(6000);
  await (await $(QASAPLOGIN.billingDatebtn)).click(); // Added await
  console.log("Calendar opened");
  await browser.pause(6000);
  await (await $(QASAPLOGIN.CalenderContinue)).click(); // Added await
  console.log("Calendar continue button clicked");
  await browser.pause(6000);
  console.log("DATE entered")
 
 
  await sap.clicktheBtnXpath(QASAPLOGIN.confirmationCreatedDate);
  await sap.enterTextInTextBox(QASAPLOGIN.confirmationCreatedDate,currentDate);
      console.log("Current date entered");
      await browser.pause(6000);
      await (await $(QASAPLOGIN.billingDatebtn)).click(); // Added await
      console.log("Calendar opened");
      await browser.pause(6000);
      await (await $(QASAPLOGIN.CalenderContinue)).click(); // Added await
      console.log("Calendar continue button clicked");
      await browser.pause(6000);
      await sap.clicktheBtnXpath(QASAPLOGIN.confirmationCreatedDate);
      await browser.pause(2000);
      await sap.keyboardActions('Enter');
      await sap.keyboardActions('Enter');
      (await $(QASAPLOGIN.ConfirmationPopup)).waitForDisplayed({ timeout: 60000 });
      await (await $(QASAPLOGIN.saveBtn)).click();
      console.log("save btn clicked");
      await browser.pause(6000);
      (await $(QASAPLOGIN.saveBtn)).waitForDisplayed({ timeout: 60000 });
      if((await $(QASAPLOGIN.saveBtn)).isDisplayed)
      {
        await (await $(QASAPLOGIN.saveBtn)).click();
        console.log("save btn clicked");
        await browser.pause(6000);
      }
      else{
        console.log("save btn not displayed");
      }
 
});

Then(/^the user go to update Shipment PO confirmation(.*)$/, async (Tcode) => {
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).clearValue();
    await sap.enterTextInTextBox (QASAPLOGIN.va03OrderNumtxtBox,orderNum);
   await sap.keyboardActions('Enter');
   console.log("VA03 order opened");
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await waitForElement (await $(QASAPLOGIN.va03DisplayDocumentBtn));
  await sap.clicktheBtnXpath(QASAPLOGIN.va03DisplayDocumentBtn);
  console.log("Display document flow is opened");
  await browser.pause(2000);
 
  await waitForElement (await $(QASAPLOGIN.shipmentPO));
  await sap.clicktheBtnXpath(QASAPLOGIN.shipmentPO);
  await sap.clicktheBtnXpath(QASAPLOGIN.va03PODisplyDoc);
  (await $(QASAPLOGIN.va03PODisplyDoc)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03PODisplyDoc);
  await browser.pause(2000);
  await sap.clicktheBtnXpath(QASAPLOGIN.messages);
  (await $(QASAPLOGIN.ZDCRCheckBox)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.ZDCRCheckBox);
  await browser.pause(2000);
  await sap.clicktheBtnXpath(QASAPLOGIN.furtherData);
  await browser.pause(2000);
  await sap.clicktheBtnXpath(QASAPLOGIN.dispatchedDate);
  (await $(QASAPLOGIN.dispatchedDate)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.dispatchedDate, currentDate);
  await browser.pause(6000);
  await (await $(QASAPLOGIN.billingDatebtn)).click(); // Added await
  console.log("Calendar opened");
  await browser.pause(6000);
  await (await $(QASAPLOGIN.CalenderContinue)).click(); // Added await
  console.log("Calendar continue button clicked");
  await browser.pause(6000);
  await (await $(QASAPLOGIN.va03backBtn)).click();
  await browser.pause(1000);
  console.log("back button is clicked !");
  await (await $(QASAPLOGIN.saveBtn)).click();
  console.log("save btn clicked");
  await browser.pause(6000);
 
});
Then(/^the user execute RSNAST00 program for ZDCR(.*)$/, async(Tcode)=> {
 
  const orderNum = await sap.getOrderNumber();
  console.log("In ZEOM generation step");
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode);
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'RSNAST00');
  //await browser.pause(2000);
  await sap.keyboardActions('Enter');
  //put execute button code
  //await authorization.ExecuteBtn();
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  //add code for vbeln step
  await sap.enterTextInTextBox(QASAPLOGIN.rsnastOutputType,'EF');
  console.log("output application EF entered");
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.rsnastObjectKey,shipmentPOnum);
  console.log("object key vendor PONum entered");
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.rsnastObjectKey,'ZDCR');
  await browser.pause(2000);
  console.log("output type ZEOM entered");
  await sap.keyboardActions('Enter');
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn2);
  console.log("sa38 RSNAST00 Execute");
  await browser.pause(4000);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("Tick mark button clicked");
  await browser.pause(4000);
  (await $(QASAPLOGIN.va03ExecuteBtn2)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("continue button clicked");
});
 
Then(/^user go to change the delivery status$/, async () => {
  const orderNum = await sap.getOrderNumber();
  console.log("In delivery status change step");
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nSA38');
  await sap.keyboardActions('Enter');
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'YDSD_SALES_DEL_STAT_CHG');
  await sap.keyboardActions('Enter');
  console.log("YDSD_SALES_DEL_STAT_CHG prog entered");
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.poSalesDocNo,orderNum);
  console.log("Order no entered in sales doc");
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  console.log("Prog Executed");
  await browser.pause(4000);
  await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("continue button clicked");
});
 
Then(/^user go to PO GR process$/, async () => {
    //enter prog sa38 YDSD_SALES_DEL_STAT_CHG
    const orderNum = await sap.getOrderNumber();
    console.log("In PO GR process step");
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nSA38');
    await sap.keyboardActions('Enter');
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'ydpure_Goodsreceipt');
    await sap.keyboardActions('Enter');
    console.log("ydpure_Goodsreceipt prog entered");
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.purchaseOrderNumber,VendorPOnum);
    console.log("vendor po entered in purchaseOrderNumber");
    await browser.pause(2000);
    await sap.enterTextInTextBox(QASAPLOGIN.secondPotxt,shipmentPOnum);
    console.log("shipment po no entered in purchaseOrderNumber");
   
    await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
    console.log("Prog Executed");
    await browser.pause(4000);
   
    (await $(QASAPLOGIN.Username)).waitForDisplayed({ timeout: 60000 });
  if ((await $(QASAPLOGIN.Username)).isDisplayed) {
    console.log("PO GR processed successfully");
  }
  else {
    console.log("PO GR not processed successfully");
  }
 
});
Then(/^check SAP table for POD completion(.*)$/, async () => {
    const orderNum = await sap.getOrderNumber();
    console.log("Checking SAP tables..");
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,'/nse16n');
    await sap.keyboardActions('Enter');
    await browser.pause(4000);
    await sap.enterTextInTextBox(QASAPLOGIN.se16txtTbl,'YDSD_SO_ITM_ATTR');
    await sap.keyboardActions('Enter');
    await browser.pause(3000);
    await $(QASAPLOGIN.se16SDDoctxtBxToClick).click();
    await browser.pause(6000);
    await sap.enterTextInTextBox(QASAPLOGIN.se16SDDocTxtBx,orderNum);
    await $(QASAPLOGIN.se16OnlineBtn).click();
    await browser.pause(6000);
    await $(QASAPLOGIN.se16CompletionStatus).waitForDisplayed({ timeout: 60000 });
    let PODCOM = await (await $(QASAPLOGIN.se16CompletionStatus)).getText();
    console.log(PODCOM);
    if (PODCOM === 'C') {
      console.log("POD completed successfully..");
    }
    else { 
      console.log("POD NOT completed ..");
    }
  });

// BOSS BTH Specific cases


Then(
  /^the user check the ZBTH order details with Tcode (.*)$/,async (Tcode) => {
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
    await sap.keyboardActions("Enter");
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
    //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
    await expect($(QASAPLOGIN.va03zBTHCheck)).toBeDisplayed();
    console.log("VA03 order opened and item category ZBDS verified");
  }
);
Then(/^the user do the authorization for BOSS order$/, async () => {
  console.log("inside auth program");
  const orderNum = await sap.getOrderNumber();
  console.log(orderNum);
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nsa38");
  await sap.keyboardActions("Enter");
  console.log("Before entering program name");
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,'YDCOM_BATCH_FULL_AUTH_NEW');
  await browser.pause(2000);
  await waitForElement(await $(QASAPLOGIN.execute));
  await $(QASAPLOGIN.execute).click();
  await browser.pause(4000);
  await sap.enterTextInTextBox(QASAPLOGIN.authOrderno, orderNum);
  await browser.pause(5000);
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  console.log("Clicked Execute btn");
  await browser.pause(9000);

  // First, check for Card Approved text
  let isCardApproved = await $(QASAPLOGIN.authCardApprovedTxt).isDisplayed();
  console.log(isCardApproved);

  if (!isCardApproved) {
    console.log("Card Approved text not found, checking for tick mark...");
    // let done = false;

    // while (!done) {
    //   console.log(done);
    //   console.log("Waiting for tick mark");
    //   if (await $(`//*[contains(@lsdata,'Continue (Enter)')]`).isDisplayed()) {
    //     await browser.pause(500);
    //     await $(`//*[contains(@lsdata,'Continue (Enter)')]`).click();
    //     done = true;
    //     console.log(done);
    //   } else await browser.pause(5000);
    // }
    let done2 = false;

    while (!done2) {
      console.log(done2);
      console.log("Waiting for success txt");
      if (await $(QASAPLOGIN.authCardApprovedTxt).isDisplayed()) {
        await browser.pause(500);
        console.log("Pass");
        done2 = true;
        console.log(done2);
      } else await browser.pause(5000);
    }
  }

  // Final check for Card Approved text
  // await expect(isCardApproved).toBe(true);
  else {
    let apporvedtxt = await (await $(QASAPLOGIN.authCardApprovedTxt)).getText();
    console.log(isCardApproved);
    console.log(apporvedtxt);
    if (isCardApproved) {
      console.log("Card Approved text is now displayed");
    } else {
      console.log("Card Approved text still not displayed");
    }
  }
});
Then(/^the user do the MIGO for PO$/,async () => {
    await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nva03");
    await sap.keyboardActions("Enter");
    await browser.pause(2000);
    const orderNum = await sap.getOrderNumber();
    //await sapLogin.getOrderNumber();
    await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
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

    //const orderNum = await sap.getOrderNumber();
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,"/nMIGO");
    await sap.keyboardActions("Enter");
    await browser.pause(5000);
    console.log("before entering purchase order no");
    await sap.enterTextInTextBox(QASAPLOGIN.migoPO,POnum);
    await sap.keyboardActions("Enter");
    await browser.pause(6000);
    console.log("Entered PO in MIGO");
    await sap.enterTextInTextBox(QASAPLOGIN.migoSite, "9765");
    await sap.keyboardActions("Enter");
    await browser.pause(6000);
    if (await $(QASAPLOGIN.migoCloseHeaderDataBtn).isDisplayed()) {
      await browser.pause(4000);
      (await $(QASAPLOGIN.migoCloseHeaderDataBtn)).click();
    }
    //migoLine
    
    await $(QASAPLOGIN.migoItemOkCheckBx).scrollIntoView({ block: "center" });
    await browser.pause(4000); 
    await sap.pageScrollTillBottomPage();
    await browser.pause(2000); 
    (await $(QASAPLOGIN.migoItemOkCheckBx)).waitForDisplayed({timeout: 60000});
    await browser.pause(2000);
    await(await $(QASAPLOGIN.migoItemOkCheckBx)).click();
    console.log("Item Ok check box is checked now..");

    (await $(QASAPLOGIN.migoPostBtn)).waitForDisplayed({timeout: 60000});
    await browser.pause(2000);
    await(await $(QASAPLOGIN.migoPostBtn)).click();
    console.log("Post button is clicked now..");
    await browser.pause(5000);
    let done = false;

    while (!done) {
      console.log(done);
      console.log("Waiting for success message");
      if (await $(QASAPLOGIN.migoSucctxt).isDisplayed()) {
        await browser.pause(500);
        console.log()
        done = true;
        console.log(done);
        console.log("MIGO is done");
      } else await browser.pause(5000);
    }
   await browser.pause(6000);
   (await $(QASAPLOGIN.txtTcode)).waitForDisplayed({timeout: 60000});
    await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nva03');
    await sap.keyboardActions("Enter");
    await browser.pause(6000);
    (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
    await browser.pause(3000);
    await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
    await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
    await sap.keyboardActions("Enter");
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
    await $(QASAPLOGIN.va03PODisplyDoc).click();
    console.log("PO Document is opened!");
    await browser.pause(6000);
    if ((await $(QASAPLOGIN.gr101)).isDisplayed) {
      if ((await $(QASAPLOGIN.gr101Mvmt)).isDisplayed){
      console.log("GR101 created after MIGO ");
    } 
  }else {
      console.log("GR101 not created even after MIGO");
    }
  }

); 

Then(/^the user remove Billing Block for BTH order$/,async() => {
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nsa38');
  await sap.keyboardActions("Enter");
  console.log("before entering program name");
  await browser.pause(3000);
  await $(QASAPLOGIN.txtProgram).clearValue();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram,"YDSDE_ENHD231_GI_TRIGGER");
  await browser.pause(3000);
  console.log("Entered program name in Billing block");
  //await sap.keyboardActions('Enter');
  await browser.pause(4000);
  await waitForElement(await $(QASAPLOGIN.execute));
  await sap.clicktheBtnXpath(QASAPLOGIN.execute);
  await browser.pause(4000);
  await $(QASAPLOGIN.bbDeliveryType).clearValue();
  await browser.pause(1000);
  await sap.enterTextInTextBox(QASAPLOGIN.bbDeliveryType, "LF");
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.bbDeliveryNo, obdNum);
  await browser.pause(3000);
  await sap.clicktheBtnXpath(QASAPLOGIN.bbCheckbox);
  await browser.pause(2000);
  await sap.clicktheBtnXpath(QASAPLOGIN.authExecuteBtn1);
  await browser.pause(4000);
  console.log("Billing block removal program execution initiated..");
  let done = false;
  while (!done) {
    console.log(done);
    console.log("Waiting for billing block progam execution to complete..");
    if (await $(QASAPLOGIN.billingBlkUsertxt).isDisplayed()) {
      await browser.pause(500);
      console.log("Billing block removal program execution completed!");
      done = true;
      console.log(done);
    } else {
      console.log("Billing block removal program execution still in progress..Please wait !");
    }
  }

});

Then(/^the user process the ZESC Output for BTH order with RSNAST$/, async () => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, "/nsa38");
  await browser.pause(2000);
  await sap.keyboardActions("Enter");
  await browser.pause(6000);
  console.log("Tcode entered sa38");
  await $(QASAPLOGIN.txtProgram).clearValue();
  await browser.pause(3000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram, "RSNAST00");
  await browser.pause(4000);
  //await sap.keyboardActions('Enter');
  await sap.keyboardActionsF8("F8");
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
  const zeroPad = String(dintNum).padStart(10, "0");

  console.log(zeroPad);
  await $(QASAPLOGIN.rsnastObjectKey).addValue(zeroPad);
  console.log("Object Key entered!");

  (await $(QASAPLOGIN.rsnastZESCOutputType)).waitForDisplayed({timeout: 60000});
  await (await $(QASAPLOGIN.rsnastZESCOutputType)).click();
  await browser.pause(4000);
  await $(QASAPLOGIN.rsnastZESCOutputType).addValue("ZESC");
  console.log("Output type is entered!");

  await $(QASAPLOGIN.rsnastExecuteBtn).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.rsnastExecuteBtn)).click();
  await browser.pause(6000);
  console.log("Execute Button is clicked!");
  let done = false;

  while (!done) {
    console.log(done);
    console.log("Waiting for tick mark");
    if (await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).isDisplayed()) {
      await browser.pause(500);
      await $(QASAPLOGIN.rsnastSuccessPopupContinueBtn).click();
      done = true;
      console.log(done);
      console.log("Continue button from RSNAST is clicked!!");
    } else await browser.pause(5000);
  }

  // await $(QASAPLOGIN.rsnastSuccMsg).waitForDisplayed({ timeout: 60000 });
  // //await expect($(QASAPLOGIN.rsnastSuccMsg)).toBeDisplayed();
  // console.log("rsnast succ msg-odb msg");
  await browser.pause(5000);
  let done2 = false;
  while (!done2) {
    console.log(done2);
    console.log("Waiting second close button in RSNAST..");
    if (await $(QASAPLOGIN.authSuccClose).isDisplayed()) {
      await browser.pause(500);
      await $(QASAPLOGIN.authSuccClose).click();
      console.log("Close 2 Button clicked in RSNAST POP UP!");
      done2 = true;
      console.log(done2);
    } else await browser.pause(5000);
  }

  // await $(QASAPLOGIN.rsnastInfoScreen).waitForDisplayed({ timeout: 60000 });
  // console.log("Info screen displayed");

  // let done3 = false;
  // while (!done3) {
  //   console.log(done3);
  //   console.log("Waiting last close button ..");
  //   if (await $(QASAPLOGIN.authSuccClose).isDisplayed()) {
  //     await browser.pause(500);
  //     await $(QASAPLOGIN.authSuccClose).click();
  //     console.log("Close 3 Button clicked in RSNAST POP UP!");
  //     done3 = true;
  //     console.log(done3);
  //   } else await browser.pause(5000);
  // }

  console.log("Last Continue Button clicked in RSNAST POP UP!");

});

Then(/^the user check the order and verify the Item Category(.*)$/,async (Category) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, 'VA03');
  await sap.keyboardActions("Enter");
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
  //await expect($(QASAPLOGIN.va03zBDSCheck)).toBeDisplayed();
  await expect($(QASAPLOGIN.va03Itemcate)).toBeDisplayed()
  let itemcate = await (await ($(QASAPLOGIN.va03Itemcate))).getText();
    console.log(itemcate);
  if (itemcate === Category) {
    console.log(Category);
    console.log("VA03 order opened and item category is verified");
  }
  else { 
    await browser.pause(2000);
    await sap.runMultiSourcingProgram(Category);

  }

}
);

//////////////////////////////////////////BDS Specifc///////////////////////////
Then(/^the user check the BDS order details with Tcode (.*)$/,async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
  //await expect($(QASAPLOGIN.va03zBDSCheck)).toBeDisplayed();
  await expect($(QASAPLOGIN.va03Itemcate)).toBeDisplayed()
    console.log("VA03 order opened and item category BDS verified");
}
);


Then(/^the user do the MIGO for BDS PO$/,async () => {

  const orderNum = await sap.getOrderNumber();
  

  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,"/nMIGO");
  await sap.keyboardActions("Enter");
  await browser.pause(5000);
  console.log("before entering purchase order no");
  await sap.enterTextInTextBox(QASAPLOGIN.migoPO,POnum);
  await sap.keyboardActions("Enter");
  await browser.pause(6000);
  console.log("Entered PO in MIGO");
  await sap.enterTextInTextBox(QASAPLOGIN.migoSite, "9765");
  await sap.keyboardActions("Enter");
  await browser.pause(6000);
  if (await $(QASAPLOGIN.migoCloseHeaderDataBtn).isDisplayed()) {
    await browser.pause(4000);
    (await $(QASAPLOGIN.migoCloseHeaderDataBtn)).click();
  }
  //migoLine
  
  await $(QASAPLOGIN.migoItemOkCheckBx).scrollIntoView({ block: "center" });
  await browser.pause(4000); 
  await sap.pageScrollTillBottomPage();
  await browser.pause(2000); 
  (await $(QASAPLOGIN.migoItemOkCheckBx)).waitForDisplayed({timeout: 60000});
  await browser.pause(2000);
  await(await $(QASAPLOGIN.migoItemOkCheckBx)).click();
  console.log("Item Ok check box is checked now..");

  (await $(QASAPLOGIN.migoPostBtn)).waitForDisplayed({timeout: 60000});
  await browser.pause(2000);
  await(await $(QASAPLOGIN.migoPostBtn)).click();
  console.log("Post button is clicked now..");
  await browser.pause(5000);
  let done = false;

  while (!done) {
    console.log(done);
    console.log("Waiting for success message");
    if (await $(QASAPLOGIN.migoSucctxt).isDisplayed()) {
      await browser.pause(500);
      console.log()
      done = true;
      console.log(done);
      console.log("MIGO is done");
    } else await browser.pause(5000);
  }

  /////
 await browser.pause(6000);
 (await $(QASAPLOGIN.txtTcode)).waitForDisplayed({timeout: 60000});
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nva03');
  await sap.keyboardActions("Enter");
  await browser.pause(6000);
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(3000);
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
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
  await $(QASAPLOGIN.va03PODisplyDoc).click();
  console.log("PO Document is opened!");
  await browser.pause(5000);
  if(await $(QASAPLOGIN.poHistoryTab).isDisplayed()){
    await browser.pause(2000);
    await $(QASAPLOGIN.poHistoryTab).click();
    await browser.pause(6000);
    if ((await $(QASAPLOGIN.gr101)).isDisplayed) {
      if ((await $(QASAPLOGIN.gr101Mvmt)).isDisplayed) {
        console.log("GR101 created after MIGO ");
      }
    }
  } else {
    await browser.pause(2000);
    await $(QASAPLOGIN.spanBackbtn).click();
    console.log("back btn clicked");
    await browser.pause(5000);
    (await $(QASAPLOGIN.poHistoryTab)).waitForDisplayed({ timeout: 60000 });
    await $(QASAPLOGIN.poHistoryTab).click();
    await browser.pause(4000);
    if ((await $(QASAPLOGIN.gr101)).isDisplayed) {
      await browser.pause(2000);
      if ((await $(QASAPLOGIN.gr101Mvmt)).isDisplayed) {
        console.log("GR101 created after MIGO ");
      }
    }
  }
}

); 
Then(/^the user process F2 Invoice Updated$/, async () => {
  await browser.pause(2000);
  console.log("Inside F2 invoice");
  (await $(QASAPLOGIN.txtTcode)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nsa38');
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  (await $(QASAPLOGIN.txtProgram)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.txtProgram).clearValue();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.txtProgram, "RV60SBAT");
  console.log("prog name entered");
  await sap.keyboardActions("Enter");

  // await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();

  (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
  console.log("prog executed ");
  (await $(QASAPLOGIN.salesOrg)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.salesOrg, "1019");
  console.log("sales org entered");
  await sap.keyboardActions("Enter");
  await sap.enterTextInTextBox(QASAPLOGIN.sdDocument, orderNum);
  console.log("order no entered");
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  (await $(QASAPLOGIN.salesOrderchkBx)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.salesOrderchkBx)).click();
  console.log("salesOrderchkBx checked");
  await browser.pause(2000);
  (await $(QASAPLOGIN.deliverieschkBx)).click();
  console.log("deliverieschkBx unchecked");
  await browser.pause(2000);
  await $(QASAPLOGIN.invoiceJobStartImmeCheckBx).scrollIntoView({ block: "center" });
  await browser.pause(4000); 
  await sap.pageScrollTillBottomPage();
  await browser.pause(4000);
  await $(QASAPLOGIN.invoiceJobStartImmeCheckBx).click();
  console.log("Job Start immeadiately checkbox is checked  ");
  await browser.pause(2000); 
  await $(QASAPLOGIN.invoiceSetBillingDateTxtBx).scrollIntoView({ block: "center" });
  await browser.pause(4000); 
  await $(QASAPLOGIN.invoiceSetBillingDateTxtBx).click();
  console.log("Set billing date is Clicked..");
  await browser.pause(1000);

  let currentDate: string;

    const formatDate = (date: Date): string => {
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
    // return `${month}.${day}.${year}`;
      return `${day}.${month}.${year}`;
    };
    const date = new Date();
    currentDate = formatDate(date); // Format as MM/DD/YYYY
    console.log(`Current Date: ${currentDate}`);
    await browser.pause(3000);
    await (await $(QASAPLOGIN.invoiceSetBillingDateTxtBx)).clearValue(); // Added await
    await sap.enterTextInTextBox(QASAPLOGIN.invoiceSetBillingDateTxtBx, currentDate);
    console.log("Current date entered");
    await browser.pause(3000);
  (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
  console.log("Executed");

  let done = false;
  while (!done) {
    console.log(done);
    console.log("Waiting for job name");
    if (await $(QASAPLOGIN.JobName).isDisplayed()) {
      await browser.pause(500);
      jobName = await $(QASAPLOGIN.JobName).getText();
      console.log(jobName);
      done = true;
      console.log(done);
    } else await browser.pause(5000);
  }
  await browser.pause(2000);
});

Then(/^the user goto sa37 to verify job invoice job status(.*)$/, async (Tcode) => {
  const orderNum = await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions('Enter');
  console.log("tcode entered ");
  await browser.pause(2000);
  (await $(QASAPLOGIN.JobNametext)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.JobNametext)).clearValue();
  await sap.enterTextInTextBox(QASAPLOGIN.JobNametext, jobName);
  // await sap.enterTextInTextBox(QASAPLOGIN.JobNametext,'INVOICE_241101_072135_01_VCQS7AP');
  await sap.keyboardActions('Enter');
  console.log("job name entered");
  await browser.pause(2000);
  (await $(QASAPLOGIN.schedChkBx)).waitForDisplayed({ timeout: 60000 });
  (await $(QASAPLOGIN.schedChkBx)).click();
  console.log("schedChkBx checked");
  (await $(QASAPLOGIN.sa38ExecuteBtn)).waitForDisplayed({ timeout: 60000 });
  await sap.clicktheBtnXpath(QASAPLOGIN.sa38ExecuteBtn);
  await browser.pause(2000);
  console.log("Execution initiated for sm37");
  await browser.pause(4000);
  //verify job status
  //(await $(QASAPLOGIN.sm37JobStatus)).waitForDisplayed({ timeout: 60000 });
  // let jobStatus = await $(QASAPLOGIN.sm37JobStatus).getText();
  //   console.log(jobStatus);
        
  //   let done2 = false;
  //   while (!done2) {
  //     console.log(done2);
  //     console.log("Waiting for success txt");
  //     if (jobStatus === 'Finished') {
  //       await browser.pause(500);
  //       console.log("Invoice creation job successfully completed..");
  //       done2 = true;
  //       console.log(done2);
  //     } else await browser.pause(5000);
      await $(QASAPLOGIN.sm37JobRefresh).click();
      await browser.pause(6000);
      console.log("Refresh btn is Clicked!");
   // }
  

});
//////BOPIS/////////////////////

Then(/^the user check the BOPIS order details with Tcode (.*)$/,async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  const orderNum = await sap.getOrderNumber();
  //await sapLogin.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  //await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn3);
  await expect($(QASAPLOGIN.va03ZopkCheck)).toBeDisplayed();
  console.log("VA03 order opened and item category ZOPK verified");
}
);
Then(/^the user check BOPIS delivery and create if it is not created yet(.*)$/, async (Tcode) => {

  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nva03');
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  await browser.pause(5000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("VA03 order opened");
  await browser.pause(8000);
  await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
  console.log("Website order Text is clicked now");
  await browser.pause(5000);
  (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
  await browser.pause(6000);
  console.log("Display document flow is opened");
  (await $(QASAPLOGIN.va03BopisDelivery)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(1000);
  await expect($(QASAPLOGIN.va03BopisDelivery)).toBeDisplayed();
  console.log(" BOPIS Delivery is there in doc flow..");
  // await $(QASAPLOGIN.va03BopisDelivery).click();
  // await browser.pause(2000);
  // console.log("Bopis delivery selected now..");
  // await $(QASAPLOGIN.va03PODisplyDoc).click();
  // await browser.pause(3000);
  if ((await $(QASAPLOGIN.va03BopisDelivery)).isDisplayed) {
    await browser.pause(2000);
    odbflag = true;
    console.log("Outbound delivery is created..");
    await browser.pause(3000);
    (await $(QASAPLOGIN.va03BopisDelivery)).doubleClick();
    obdNum = await $(QASAPLOGIN.va03ODBNUM).getText();
    console.log(obdNum);
    await browser.pause(2000);

  }
  else { 
    await browser.pause(2000);
    
    await sap.createODBForBOPIS();
  }
  
});
Then(/^the user do the Post Goods  Issue for the BOPIS Delivery(.*)$/, async (Tcode) => {
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, '/nva03');
  await sap.keyboardActions("Enter");
  await browser.pause(2000);
  const orderNum = await sap.getOrderNumber();
  await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
  (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
  await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox, orderNum);
  await sap.keyboardActions("Enter");
  await browser.pause(5000);
  // await sap.clicktheBtnXpath(QASAPLOGIN.va03ExecuteBtn2);
  console.log("VA03 order opened");
  await browser.pause(8000);
  await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
  console.log("Website order Text is clicked now");
  await browser.pause(5000);
  (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
  await browser.pause(6000);
  console.log("Display document flow is opened");
  (await $(QASAPLOGIN.va03BopisDelivery)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(1000);
  await expect($(QASAPLOGIN.va03BopisDelivery)).toBeDisplayed();
  console.log(" BOPIS Delivery is there in doc flow..");
  await $(QASAPLOGIN.va03BopisDelivery).click();
  await browser.pause(2000);
  console.log("Bopis delivery selected now..");
  await $(QASAPLOGIN.va03PODisplyDoc).click();
  await browser.pause(3000);
  (await $(QASAPLOGIN.va03ChangeMode)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.va03ChangeMode).click();
  await browser.pause(3000);
  console.log("Change mode clicked now..");
  (await $(QASAPLOGIN.postGoodsIssue)).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.postGoodsIssue).click();
  await browser.pause(3000);
  console.log("Post Goods Issue clicked now..");
  let done=false;                
      while(!done){
        console.log(done);
        console.log("Waiting pop up");
        if (await $(QASAPLOGIN.va03BopisPGiSave).isDisplayed()) {
          await $(QASAPLOGIN.va03BopisPGiSave).click();
          await browser.pause(500);
          console.log("pop up is displayed!");
        done=true;
        console.log(done);
        }else
        {
          console.log("Still waiting for pop up !");
        }
        await browser.pause(3000);    
      }
  
      let done2=false;                
      while(!done2){
        console.log(done2);
        console.log("Waiting pop up");
        if (await $(QASAPLOGIN.va03BopisDeliverySaveTxt).isDisplayed()) {
          await browser.pause(500);
          console.log("Bopis delivery saved!");
          done2=true;
        console.log(done2);
        }else
        {
          console.log("Still waiting for information to save!");
        }
        await browser.pause(3000);    
      }
});
Then(/^the user go to picking for bopis (.*)$/, async (Tcode) => {
 //uncomment///
 // let parentHandle = await browser.getWindowHandle();
  let url = await browser.getUrl();
  console.log(url);
    
  await browser.pause(2000);
  const orderNum=await sap.getOrderNumber();
  await sap.enterTextInTextBox(QASAPLOGIN.txtTcode, Tcode);
  await sap.keyboardActions("Enter");
  
  await browser.pause(2000);
  await browser.switchWindow("https://mystoreapps-qa.homedepot.com/sap/bc/webdynpro/sap/ydsd_delivery_plan?sap-client=500&sap-language=EN#");
  
  (await $(QASAPLOGIN.reportSelectionPage)).waitForDisplayed({ timeout: 60000 });
  await browser.pause(2000);

  (await $(QASAPLOGIN.shippingPoint)).waitForDisplayed({ timeout: 60000 });
  
  await (await $(QASAPLOGIN.shippingPoint)).click();
  await browser.pause(4000);
  console.log("shippingPoint Clicked!");
  await browser.pause(2000);
  //await sap.keyboardActions(Key.ArrowDown);
  await browser.keys('ArrowDown');
  await browser.pause(2000);
  await browser.keys('ArrowDown');
  await browser.keys('Enter')
  await browser.pause(2000);
 // await sap.keyboardActions(Key.ArrowDown);
  // await browser.pause(4000);
  // await sap.keyboardActions("Enter");
  // await browser.pause(4000);
  // (await $(QASAPLOGIN.bopis)).waitForDisplayed({ timeout: 60000 });
  // await (await $(QASAPLOGIN.bopis)).click();
  // await browser.pause(4000);
  // console.log("bopis Clicked!"); 

  (await $(QASAPLOGIN.deliveryDate)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.deliveryDate)).click();
  let currentDate: string;

    const formatDate = (date: Date): string => {
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
    // return `${month}.${day}.${year}`;
      return `${day}.${month}.${year}`;
    };
    const date = new Date();
    currentDate = formatDate(date); // Format as MM/DD/YYYY
    console.log(`Current Date: ${currentDate}`);
    await browser.pause(3000);
  // const currentDate1 = new Date();
  // const currentDate = `${(currentDate1.getMonth() + 1).toString().padStart(2, '0')}/${currentDate1.getDate().toString().padStart(2, '0')}/${currentDate1.getFullYear()}`;
  
  console.log("current date in MM/DD/YYYY format: ", currentDate);  
  await browser.pause(2000);
 // await (await $(QASAPLOGIN.deliveryDate)).clearValue(); // Added await
  await sap.enterTextInTextBox(QASAPLOGIN.deliveryDate, currentDate);
  await browser.keys('Enter')
  await browser.pause(4000);
  console.log("deliveryDate Clicked!");

  (await $(QASAPLOGIN.salesDocbopis)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.salesDocbopis)).click();
  await sap.enterTextInTextBox(QASAPLOGIN.salesDocbopis, orderNum);
  await browser.pause(1000);
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  console.log("salesDocbopis entered!");

  (await $(QASAPLOGIN.site)).waitForDisplayed({ timeout: 60000 });
  await (await $(QASAPLOGIN.site)).click();
  await browser.pause(2000);
  await sap.enterTextInTextBox(QASAPLOGIN.site, "9765");
  await sap.keyboardActions("Enter");
  await browser.pause(3000);
  console.log("Site entered!");
  await browser.pause(4000);

  // let c = await $(QASAPLOGIN.stagingLocation).isDisplayed();
  // console.log(c);
  // let d = await $(QASAPLOGIN.stagingLocation).isEnabled();
  // await browser.pause(1000);
  // console.log(d);
  await browser.pause(8000);
   await $(QASAPLOGIN.stagingLocation).click();
  console.log("clicked");
  await browser.pause(2000);
 // await $(QASAPLOGIN.stagingLocation).setValue('9765');
 // await $(QASAPLOGIN.stagingLocation).addValue("9765");
 // await sap.enterTextInTextBox(QASAPLOGIN.stagingLocation, "9765");
 // await $(QASAPLOGIN.stagingLocation).elementSendKeys("QASAPLOGIN.stagingLocation", '9765');
  //await sap.enterTextInTextBox(QASAPLOGIN.stagingLocation, '9765');
  //let e = await browser.getElementAttribute(QASAPLOGIN.stagingLocation, 'hidden');
  
 // console.log(e)
  await browser.pause(2000);
  await sap.keyboardAction9765("9");
 //await sap.keyboardActions("Enter");
  await browser.pause(2000);
  console.log("Staging Site entered!");

  await $(QASAPLOGIN.checkboxBOPIS).waitForDisplayed({ timeout: 60000 });
  await $(QASAPLOGIN.checkboxBOPIS).click();
  await browser.pause(5000);
  console.log("Checkbox is checked now!");
  
  // (await $(QASAPLOGIN.checkboxBOPIS)).waitForDisplayed({ timeout: 60000 });
  // await (await $(QASAPLOGIN.checkboxBOPIS)).click();
  // await browser.pause(4000);
  // console.log("checkbox clciked");

  await $(QASAPLOGIN.completePick).waitForDisplayed({ timeout: 60000 });
  await browser.pause(4000);
  await $(QASAPLOGIN.completePick).click();
  await browser.pause(4000);
  console.log("Complete Picking button is  clicked");

  let done = false;

    while (!done) {
      console.log(done);
      console.log("Waiting for picking completion success txt..");
      if (await $(QASAPLOGIN.bopisPickingSuccTxt).isDisplayed()) {
        await browser.pause(500);
        console.log("BOPIS order picking is completed now.. ");
        done = true;
        console.log(done);
      } else await browser.pause(5000);
    }
 let ID =await  browser.getWindowHandles()
  for(var i = 0; i< ID.length; i++){
      //if( ID[i]!= parentHandle){
      await browser.switchToWindow(ID[i + 1]);
         // await  browser.maximizeWindow();
          break;
      //}
  }
  await browser.pause(3000);
  //await browser.switchToWindow("http://vcqs7ap01.homedepot.com:8000/sap/bc/gui/sap/its/webgui?sap-client=500&sap-language=EN#");
  // await  browser.pause(3000);
  // await browser.switchWindow(parentHandle);
 //await sap.switchToParent();
  console.log("In parent window..");
});


Then(/^the user verify picking request and DPR created (.*)$/ , async(Tcode) =>{
  await $(QASAPLOGIN.txtTcode).waitForDisplayed({ timeout: 60000 });
      await sap.enterTextInTextBox(QASAPLOGIN.txtTcode,Tcode); 
      await sap.keyboardActions('Enter');
      await browser.pause(2000);
      const orderNum=await sap.getOrderNumber();
      (await $(QASAPLOGIN.va03OrderNumtxtBox)).waitForDisplayed({ timeout: 60000 });
      await $(QASAPLOGIN.va03OrderNumtxtBox).clearValue();
        await sap.enterTextInTextBox(QASAPLOGIN.va03OrderNumtxtBox,orderNum);
      await sap.keyboardActions('Enter');
      await browser.pause(5000);
      console.log("VA03 order opened");
      (await $(QASAPLOGIN.va03WebsiteOrderTxt)).waitForDisplayed({ timeout: 60000 });
      await sap.clicktheBtnXpath(QASAPLOGIN.va03WebsiteOrderTxt);
      console.log("Website order Text is clicked now");
      await browser.pause(2000);
      (await $(QASAPLOGIN.va03DisplayDocumentBtn)).waitForDisplayed({ timeout: 60000 });
      await $(QASAPLOGIN.va03DisplayDocumentBtn).click();
      await browser.pause(4000);
      console.log("Display document flow is opened");
      await browser.pause(2000);
      (await $(QASAPLOGIN.pickingRequest)).waitForDisplayed({ timeout: 60000 });
      if ((await $(QASAPLOGIN.pickingRequest)).isDisplayed)
        {
          console.log("Picking Request is created");
        }
        else
        {
          console.log("Picking Request is not created");
        }
      await browser.pause(2000);
      
      (await $(QASAPLOGIN.va03DPR)).waitForDisplayed({ timeout: 60000 });
      if ((await $(QASAPLOGIN.va03DPR)).isDisplayed)
        {
          console.log("DPR is created");
        }
        else
        {
          console.log("DPR is not created");
        }
      await browser.pause(2000);
    
      });