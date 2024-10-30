import axios from 'axios';
import { waitForElement } from './page.js';
import slack from './slack.js';
import { scenarioTags } from '../config/wdio.chrome.sauce.conf.js';
import fs from 'fs';
import { browser, $, $$, expect } from '@wdio/globals';
import { Key } from 'webdriverio';

let userCheckOutID = null;
let urlEnvRequest = null;
let storeNumber = null;
let customerToken = null;
let mcycleToggle;
const date = new Date();
const currentTime = parseInt((Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }).format(date)).match(/[\d.,]+/)?.toString());
class Opc {
  async deliveryAddress() {
    const savedSthAdresselem = await $('//*[@symbol=\'check\']');
    if ((await savedSthAdresselem.isExisting()) === true) {
      await $('//*[text()="Edit" or text()="Modifier"]').click();
      await waitForElement(await $(`//*[text()=" Required fields are marked with an asterisk (*). " or text()=" Les champs obligatoires sont marqués d'un astérisque (*). "]`));
      const editaddress= (await $('//span[text()= "Edit" or text()= "Modifier"]')).isExisting();
      if (await editaddress === true) {
        await $('//span[text()= "Edit" or text()= "Modifier"]').click();
      }
      }
    }

  async applianceAddress() {
    await waitForElement(await $('//hdca-purchase-appliance-container'));
    await $('//hdca-purchase-appliance-container').scrollIntoView({ block: 'center' });
    const savedappAdresselem = $('//hdca-purchase-appliance-form-container[@slot=\'edit\']');
    if ((await savedappAdresselem.isExisting()) === false) {
      await $('//hdca-purchase-appliance-container/descendant::span[text()="Edit" or text()="Modifier"]').click();
    }
  }

  async expressDeliveryAddress() {
    await waitForElement(await $('//hdca-purchase-express-delivery-container'));
    await $('//hdca-purchase-express-delivery-container').scrollIntoView({ block: 'center' });
    const savedexpressAdresselem = $('//hdca-purchase-express-delivery-container/descendant::span[text()="Edit" or text()="Modifier"]');
    if ((await savedexpressAdresselem.isExisting()) === true) {
      await savedexpressAdresselem.click();
    }
  }

  async storePickUpFormIsAvailable() {
    const progressCheckSymbol = await $('//*[@symbol=\'check\']');
    if ( await progressCheckSymbol.isExisting() ) {
      await $('//*[text()="Edit" or text()="Modifier"]').click();
      await waitForElement(await $('//*[@class = "acl-mx--xx-small acl-cursor--pointer"]'));
    }
  }

  async setCookie(name: string, value: string, path: string, domain: string) {
    try {
      await browser.setCookies({
        name,
        value,
        path,
        domain,
      });
    } catch (error) {
      /* eslint-disable */
      console.log(`${name} set Cookie Error ::${error}`);
      
    }
  }

  async triggerSemiSignedInState() {
    try {
      await this.setCookie('LastLoginTime', (Date.now() - 86400000).toString(), '/', '.homedepot.ca');
      await browser.deleteCookie('customerJwt');
      await browser.deleteCookie('uuid');
      await browser.refresh();
    } catch (e) {
      console.log(`Error Throwing while modifying the cookie value ${e}`);
      /* eslint-enable */
    }
  }

  async checkPickupDateFormAvailability() {
    return (await $('//*[text()= " When would you like to pick up? " or text()= " Quand souhaitez-vous ramasser votre commande? "]')).isExisting();
  }

  async pickUpDate() {
    const isPickUpDateFormAvailable = this.checkPickupDateFormAvailability();
    if (await isPickUpDateFormAvailable === false) {
      const pickUpDate = (await $('//*[text()=\'Selected Pick-Up Date:\' or text()=\'Date de ramassage sélectionnée :\']/following::span').getText()).match(/\d+/)[0];
      const todayDate = date.toDateString();
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      const nextDate = nextDay.toISOString().slice(0, 10);
      if (currentTime < 20 && currentTime >= 8) {
        await expect(todayDate).toContain(pickUpDate);
      } else {
        await expect(nextDate).toContain(pickUpDate);
      }
    } else {
      await $('//*[@class =\'item ng-star-inserted\' or @class =\'item\']').click();
      await $('//*[text() =\'Continue\' or text() =\'Continuer\']').click();
    }
  }

  async applianceDeliveryFormIsAvailable() {
    const formAvailability = await this.checkFormAvailability('applianceDelivery');
    if (formAvailability === true) {
      const applianceDeliveryForm = String(await $('//hdca-purchase-appliance-form-container').isDisplayed());
      if (applianceDeliveryForm !== 'true') {
        await $('//div[contains(text(), \'Appliance Delivery\')]/parent::header/div[2]/button[@class = \'acl-reset-button acl-link\']').click();
      }
    }
  }

  async standardShippingFormIsAvailable(isBadgeVisible: boolean) {
    if (isBadgeVisible === true) {
      const formAvailability = await this.checkFormAvailability('shipping');
      if (formAvailability === true) {
        const standardShippingForm = await $('//standard-shipping-form').isDisplayed();
        if (standardShippingForm !== true) {
          await $('//div[contains(text(), \'Standard Shipping\')]/parent::header/div[2]/button[@class = \'acl-reset-button acl-link\']').click();
          const purchaseApplianceForm = await $('//hdca-purchase-appliance-form-container').isDisplayed();
          if (purchaseApplianceForm) {
            await $('(//span[@class = "acl-radio__faux-button"])[2]').click();
          }
        }
      }
    }
  }

  async getUserCheckOutID() {
    const cookie = 'checkoutId';
    let cookieData;
    let checkOutUserID;
    try {
      cookieData = await browser.getCookies(cookie);
      checkOutUserID = cookieData[0].value;
    } catch (e) {
      console.log(`Error trying to get cookie value ${e}`);
    }
    return checkOutUserID;
  }

  async getStoreNumber() {
    const storeId = 'store';
    let storeData;
    let storeNo;
    try {
      storeData = await browser.getCookies(storeId);
      storeNo = storeData[0].value;
    } catch (e) {
      console.log(`Error trying to get cookie value ${e}`);
    }
    return storeNo;
  }

  async getBearerToken() {
    const customerJWT = 'customerJwt';
    let bearer;
    let token;
    try {
      bearer = await browser.getCookies(customerJWT);
      token = bearer[0].value;
    } catch (e) {
      console.log(`Error trying to get cookie value ${e}`);
    }
    return token;
  }

  async getUrlEnvRequest(checkOutUserID) {
    let urlToRequest;
    switch (process.env.Env) {
      case 'QP':
        urlToRequest = `https://www.qp-gcp.homedepot.ca/api/checkoutsvc/v1/checkouts/${checkOutUserID}`;
        break;
      case 'QA':
        urlToRequest = `https://www.qa-gcp.homedepot.ca/api/checkoutsvc/v1/checkouts/${checkOutUserID}`;
        break;
      default:
        console.error(`Sorry, we do not have this env ${process.env.Env}.`);
        break;
    }
    return urlToRequest;
  }

  async requestUserDataFromApi() {
    try {
      const response = await axios.get(urlEnvRequest, { headers: { 'X-store-id': `'${storeNumber}'`, Authorization: `Bearer ${customerToken}` } });
      return [response.data, response.status];
    } catch (error) {
      console.error(`This request is not available: ${error}`);
      return [null, 500];
    }
  }

  async checkFormAvailability(formType: string) {
    if (userCheckOutID === null) {
      userCheckOutID = await this.getUserCheckOutID();
    }
    if (storeNumber === null) {
      storeNumber = await this.getStoreNumber();
    }
    if (customerToken === null) {
      customerToken = await this.getBearerToken();
    }
    if (urlEnvRequest === null) {
      urlEnvRequest = await this.getUrlEnvRequest(userCheckOutID);
    }

    for (let index = 0; index < 3; index++) {
      const [responseUserData, responseStatusCode] = await this.requestUserDataFromApi();
      if (responseUserData !== null && responseStatusCode === 200) {
        if (responseUserData.hasOwnProperty(formType)) {
          return true;
        }
      }
    }
    return false;
  }

  async getSlackDetails() {
    const mcycle = await slack.readSlack();
    if (String(mcycle) === 'CITI Simulator switch to MCYCLE for additional testing') {
      mcycleToggle = 'on';
      return mcycleToggle;
    }
    if (String(mcycle) === 'CITI Mcycle switch to Simulator for additional testing') {
      mcycleToggle = 'off';
      return mcycleToggle;
    }
    mcycleToggle = 'off';
    console.log('Cannot get details of mcycle');
    return mcycleToggle;
  }

  async paymentMethod(card) {
    //await this.getSlackDetails();
    mcycleToggle = 'on';
    if (mcycleToggle === 'on') {
      await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('6035294444500461');
      await $('//*[contains(text(),\'CVV\')]/following::input[1]').addValue('369');
    } else {
      switch (card) {
        case 'Visa':
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('4012000033330026');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'CVV\')]/following::input[1]').addValue('123');
          break;
        case 'Mastercard':
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('5424180279791732');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'CVV\')]/following::input[1]').addValue('123');
          break;
        case 'Amex':
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('373235387881015');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'CID\')]/following::input[1]').addValue('1234');
          break;
        case 'Hdcc':
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('6035294430363981');
          await $('//*[contains(text(),\'CVV\')]/following::input[1]').addValue('123');
          break;
        default:
          console.error('This payment method is not available');
          break;
      }
    }
  }

  async paymentMethodQS(card) {
    //await this.getSlackDetails();
if(card!==null){
      switch (card) {
        case 'Visa':
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('4012000033330026');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'CVV\')]/following::input[1]').addValue('123');
          break;
        case 'Mastercard':
          await browser.pause(3000);
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('5424180279791732');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'CVV\')]/following::input[1]').addValue('123');
          break;
        case 'Amex':
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('373235387881015');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'CID\')]/following::input[1]').addValue('1234');
          break;
        case 'Hdcc':
          await $('//*[contains(text(),\'Card Number\')]/following::input[1]').addValue('6035294430363981');
          await $('//*[contains(text(),\'CVV\')]/following::input[1]').addValue('123');
          break;
        default:
          console.error('This payment method is not available');
          break;
      }
    }
  }

  async paymentMethodFrench(card) {
    //await this.getSlackDetails();
    mcycleToggle = 'on';
    if (mcycleToggle === 'on') {
      await $('//*[contains(text(),\'Numéro de carte\')]/following::input[1]').addValue('6035294444500461');
      await $('//*[contains(text(),\'Code CVV\')]/following::input[1]').addValue('369');
    } else {
      switch (card) {
        case 'Visa':
          await $('//*[contains(text(),\'Numéro de carte\')]/following::input[1]').addValue('4012000033330026');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'Code CVV\')]/following::input[1]').addValue('123');
          break;
        case 'Mastercard':
          await $('//*[contains(text(),\'Numéro de carte\')]/following::input[1]').addValue('5424180279791732');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'Code CVV\')]/following::input[1]').addValue('123');
          break;
        case 'Amex':
          await $('//*[contains(text(),\'Numéro de carte\')]/following::input[1]').addValue('373235387881015');
          await $('//*[contains(@name,\'expiry-month\')]').selectByVisibleText('10');
          await $('//*[contains(@name,\'expiry-year\')]').selectByVisibleText('28');
          await $('//*[contains(text(),\'Code CID\')]/following::input[1]').addValue('1234');
          break;
        case 'Hdcc':
          await $('//*[contains(text(),\'Numéro de carte\')]/following::input[1]').addValue('6035294430363981');
          await $('//*[contains(text(),\'Code CVV\')]/following::input[1]').addValue('123');
          break;
        default:
          console.error('This payment method is not available');
          break;
      }
    }
  }

  async hdConsumerAddress(cardType) {
    mcycleToggle = 'on';
    if (mcycleToggle === 'on') {
      if (cardType === 'Visa' || cardType === 'Mastercard' || cardType === 'Amex' || cardType === 'Hdcc') {
        await $('//*[contains(text(),\'First Name\')]/following::input[1]').addValue('Scoring');
        await $('//*[contains(text(),\'Last Name\')]/following::input[1]').addValue('Samuel');
        await $('//*[text()=\' Address \']/following::input[1]').addValue('621 Rue Habel');
        await $('//*[contains(text(),\'City\')]/following::input[1]').addValue('Lavaltrie');
        await $('//*[contains(text(),\'Province\')]/following::select').selectByVisibleText('Quebec');
        await $('//*[contains(text(),\'Phone\')]/following::input[1]').addValue('4123456789');
        await $('//*[contains(text(),\'Postal Code\')]/following::input[1]').addValue('J5T2A1');
      }
    } else if (mcycleToggle === 'off') {
      if (cardType === 'Hdcc') {
        await $('//*[contains(text(),\'First Name\')]/following::input[1]').addValue('Test');
        await $('//*[contains(text(),\'Last Name\')]/following::input[1]').addValue('Jack');
        await $('//*[text()=\' Address \']/following::input[1]').addValue('1335 James Street');
        await $('//*[contains(text(),\'City\')]/following::input[1]').addValue('St Catharines');
        await $('//*[contains(text(),\'Province\')]/following::select').selectByVisibleText('Ontario');
        await $('//*[contains(text(),\'Phone\')]/following::input[1]').addValue('9726538068');
        await $('//*[contains(text(),\'Postal Code\')]/following::input[1]').addValue('L2R 3H6');
      } else if (cardType === 'Visa' || cardType === 'Mastercard' || cardType === 'Amex') {
        await $('//*[contains(text(),\'First Name\')]/following::input[1]').addValue('Scoring');
        await $('//*[contains(text(),\'Last Name\')]/following::input[1]').addValue('Samuel');
        await $('//*[text()=\' Address \']/following::input[1]').addValue('621 Rue Habel');
        await $('//*[contains(text(),\'City\')]/following::input[1]').addValue('Lavaltrie');
        await $('//*[contains(text(),\'Province\')]/following::select').selectByVisibleText('Quebec');
        await $('//*[contains(text(),\'Phone\')]/following::input[1]').addValue('4123456789');
        await $('//*[contains(text(),\'Postal Code\')]/following::input[1]').addValue('J5T2A1');
      }
    } else {
      console.error('The billing detail is not available for this payment');
    }
  }

  async hdConsumerAddressFrench(cardType) {
    mcycleToggle = 'on';
    if (mcycleToggle === 'on') {
      if (cardType === 'Visa' || cardType === 'Mastercard' || cardType === 'Amex' || cardType === 'Hdcc') {
        await $('//*[contains(text(),\'Prénom\')]/following::input[1]').addValue('Scoring');
        await $('//*[contains(text(),\'Nom de famille\')]/following::input[1]').addValue('Samuel');
        await $('//*[text()=\' Adresse \']/following::input[1]').addValue('621 Rue Habel');
        await $('//*[contains(text(),\'Ville\')]/following::input[1]').addValue('Lavaltrie');
        await $('//*[contains(text(),\'Province\')]/following::select').selectByVisibleText('Quebec');
        await $('//*[contains(text(),\'Téléphone\')]/following::input[1]').addValue('4123456789');
        await $('//*[contains(text(),\'Code postal\')]/following::input[1]').addValue('J5T2A1');
      }
    } else if (mcycleToggle === 'off') {
      if (cardType === 'Hdcc') {
        await $('//*[contains(text(),\'Prénom\')]/following::input[1]').addValue('Test');
        await $('//*[contains(text(),\'Nom de famille\')]/following::input[1]').addValue('Jack');
        await $('//*[text()=\' Adresse \']/following::input[1]').addValue('1335 James Street');
        await $('//*[contains(text(),\'Ville\')]/following::input[1]').addValue('St Catharines');
        await $('//*[contains(text(),\'Province\')]/following::select').selectByVisibleText('Ontario');
        await $('//*[contains(text(),\'Téléphone\')]/following::input[1]').addValue('9726538068');
        await $('//*[contains(text(),\'Code postal\')]/following::input[1]').addValue('L2R 3H6');
      } else if (cardType === 'Visa' || cardType === 'Mastercard' || cardType === 'Amex' || cardType === 'Hdcc') {
        await $('//*[contains(text(),\'Prénom\')]/following::input[1]').addValue('Scoring');
        await $('//*[contains(text(),\'Nom de famille\')]/following::input[1]').addValue('Samuel');
        await $('//*[text()=\' Adresse \']/following::input[1]').addValue('621 Rue Habel');
        await $('//*[contains(text(),\'Ville\')]/following::input[1]').addValue('Lavaltrie');
        await $('//*[contains(text(),\'Province\')]/following::select').selectByVisibleText('Quebec');
        await $('//*[contains(text(),\'Téléphone\')]/following::input[1]').addValue('4123456789');
        await $('//*[contains(text(),\'Code postal\')]/following::input[1]').addValue('J5T2A1');
      }
    } else {
      console.error('The billing detail is not available for this payment');
    }
  }

  async addressContinueButton() {
    await $('//*[text()=,\'Continue\']').click();
  }

  async saveOrderDetails(){
    const orderNumber = (await $('//*[@class="acl-col--12 acl-text-size--x-large acl-weight--bold acl-color--title"]').getText()).match(/\d+/)[0];
    const fulfillmentType = await $$('//*[@class="acl-pr--x-small acl-title--x-large acl-text-size--large acl-color--inverse"]').map(async (elem) => (
      await elem.getText()
    ));
    const skuNumber = await $$('//*[@class="acl-color--default"]').map(async (elem) => (
      await elem.getText()).match(/\d+/)[0]
    );
    const price = await $$('//*[@class="acl-display--show"]').map(async (elem) => (
      await elem.getText()
    ));
    const qty = await $$('//*[@class="acl-col--6 md:acl-col--2 acl-pl--large"]/span').map(async (elem)=>(
      await elem.getText()
    ));
    const cardTags = ['@paypal','@hdcc','@visaCard','@amex','@masterCard'];
    const matchingTagNames = scenarioTags.filter(scenarioTag =>
      cardTags.includes(scenarioTag.name)
    );
    const paymentCard = matchingTagNames.map(tag => tag.name.replace(/^@/, ''));
    const orderDetails = {
      orderNumber,
      paymentCard,
      fulfillmentType,
      skuNumber,
      price,
      qty
    };
    let jsonData = [];
    try {
      const fileContents = fs.readFileSync('./src/resources/data/orderDetails.json', 'utf8');
      jsonData = JSON.parse(fileContents);
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
    jsonData.push(orderDetails);
    try {
      fs.writeFileSync('./src/resources/data/orderDetails.json', `${JSON.stringify(jsonData, null, 2)}`, 'utf8');
    } catch (error) {
      console.error('Error writing to JSON file:', error);
    }
}
  async fillInContactPhoneForPickUp(phoneNum){
    const isContactFormPrefilled = await (await $('//input[contains(@formcontrolname,"")][@disabled]')).isDisplayed();
    if(isContactFormPrefilled === true){
      await $(`//*[contains(text(),' Phone Number ')]/following::input[1]`).click();
      await $(`//*[contains(text(),' Phone Number ')]/following::input[1]`).clearValue();
      await $(`//*[contains(text(),' Phone Number ')]/following::input[1]`).addValue(phoneNum);
      await $(`//*[text() = 'Continue']`).click();
    }
  }
}

export default new Opc();
