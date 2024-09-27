import { notDeepEqual } from 'assert';
import { exit } from 'process';
import { waitForElement } from './page';
/* eslint-enable */
import { browser, $, $$, expect } from '@wdio/globals';
const orderSummaryMap = new Map<string, number>();
let moqLimit: number;
let postalBoxAvailable;
let installerFeePrice: number;
let isNotificationBadgeVisible: boolean = false;
const date = new Date();
const currenttime = parseInt((Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }).format(date)).match(/[\d.,]+/)?.toString());
class OrderSummary {
  async orderSummaryTable() {
    const table = await $$('//div[@class="acl-mt--medium"]/child::div');

    for (const element of table) {
      const textContent = await element.getText();
      const keyNameMatch = textContent.match(/^[a-zA-Z\s]+\b((?!FREE))[^ *\s\d]*/);
      let keyName;
      let keys;
      let stringValue: string;
      let valueMatch;

      switch (true) {
        case textContent.includes('3-Hour'):
          keys = 'Delivery';
          valueMatch = textContent.match(/(?:Delivery[^\n]*\n\$)([\d.,]+)/);
          stringValue = valueMatch ? valueMatch[1] : '0.00';
          break;

        case /^Delivery.*\d.*\n\$/.test(textContent):
          keys = 'Delivery';
          valueMatch = textContent.match(/(?:Delivery[^\n]*\n\$)([\d.,]+)/);
          stringValue = valueMatch ? valueMatch[1] : '0.00';
          break;

        case textContent.includes('You Saved'):
          stringValue = '0.00';
          break;

        default:
          keyName = keyNameMatch[0];
          keys = keyName.replace(',', '');
          valueMatch = textContent.match(/[\d.,]+/);
          stringValue = valueMatch ? valueMatch[0] : '0.00';
          break;
      }
      const numberValue = parseFloat(stringValue.replace(',', ''));
      orderSummaryMap.set(keys, numberValue);
    }
  }

  async orderSummaryTableFrench() {
    const table = await $$('//div[@class="acl-mt--medium"]/child::div');
    for (const element of table) {
      const textContent = await element.getText();
      const keyNameMatch = textContent.match(/^[a-zA-Z\s]+\b((?!FREE))[^ *\s\d]*/);
      let keyName;
      let keys;
      let stringValue: string;
      let valueMatch;
      switch (true) {
        case textContent.includes('3 heures'):
          keys = 'Livraison';
          valueMatch = textContent.match(/(?:Livraison.*\n)([\d.,]+)/);
          stringValue = valueMatch ? valueMatch[1] : '0.00';
          break;

        case /^Livraison.*\n/.test(textContent):
          keys = 'Livraison';
          valueMatch = textContent.match(/(?:Livraison.*\n)([\d.,]+)/);
          stringValue = valueMatch ? valueMatch[1] : '0.00';
          break;

        case textContent.includes('You Saved'):
          stringValue = '0.00';
          break;

        default:
          keyName = keyNameMatch[0];
          keys = keyName.replace(',', '').replace(/\n/g, '');
          valueMatch = textContent.match(/[\d.,]+/);
          stringValue = valueMatch ? valueMatch[0] : '0.00';
          break;
      }
      const numberValue = parseFloat(stringValue.replace(',', '.'));
      orderSummaryMap.set(keys, numberValue);
    }
  }

  async verifyWeekDaysDateMonthYearofDatePicker(selector: string) {
    const table = await $('//*/table');
    if (selector.match('month')) {
      await expect($(`//*[@id=${selector}]`)).toBeDisplayed();
      const datepickerMonth = await (await $(`//*[@id=${selector}]`)).getText();
      return datepickerMonth;
    }
    if (selector.match('year')) {
      await expect($('//*[@class=\'acl-select acl-date-picker-calender__select\']')).toBeDisplayed();
      const datepickerYear = await (await $('//*[@class=\'acl-select acl-date-picker-calender__select\']')).getText();
      return datepickerYear;
    }
    if (selector.match('week')) {
      const datepickerWeekdays = [];
      await table.$$('.//thead/tr/th').map(async (element) => {
        datepickerWeekdays.push(await element.getText());
      });
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      await expect(daysOfWeek === datepickerWeekdays);
    }
    if (selector.match('semaine')) {
      const datepickerWeekdays = [];
      await table.$$('.//thead/tr/th').map(async (element) => {
        datepickerWeekdays.push(await element.getText());
      });
      const daysOfWeek = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
      await expect(daysOfWeek === datepickerWeekdays);
    }
    if (selector.match('scheduledDeliveryDate')) {
      let datepickerDate: string;
      await table.$$('.//tbody/tr/td').map(async (element) => {
        const attributeArray = [];
        attributeArray.push(await element.getAttribute('aria-selected'));
        if ((await element.getAttribute('aria-selected')) === 'true') {
          datepickerDate = await element.getText();
        }
        expect(attributeArray.some((e) => e === 'true'));
      });
      return datepickerDate;
    }
  }

  async verifyOrderSummaryTotalValue() {
    await this.orderSummaryTable();
    let total = 0;
    orderSummaryMap.forEach((orderSummaryAmount) => {
      total += orderSummaryAmount;
    });
    const estimatedTotal = parseFloat(orderSummaryMap.get('Estimated Order Total').toFixed(2));
    const actualTotal = parseFloat((total - estimatedTotal).toFixed(2));
    await expect(actualTotal).toEqual(estimatedTotal);
  }

  async verifyOrderSummaryTotalValueFrench() {
    await this.orderSummaryTableFrench();
    let total = 0;
    orderSummaryMap.forEach((orderSummaryAmount) => {
      total += orderSummaryAmount;
    });
    const estimatedTotal = parseFloat(orderSummaryMap.get('Montant estimé').toFixed(2));
    const actualTotal = parseFloat((total - estimatedTotal).toFixed(2));
    await expect(actualTotal).toEqual(estimatedTotal);
  }

  async validatePostalCode(selector: any) {
    await expect(`//span[text()='Shipping Postal Code:']/following::div.gettext().toEqual(//*[text()=${selector}]/a)`);
  }

  async verifyTotalItemPriceAndOrderSubTotal() {
    await this.orderSummaryTable();
    const totalItemPriceString = await $$('//*[@class=\'acl-title\']').map(
      async (elem) => (
        await elem.getText()
      )
        .match(/[\d.,]+/)
        ?.toString()
        .replace(',', '') || '0.00',
    );
    const totalItemPriceNumber = totalItemPriceString.map(Number);
    const totalServiceItemPriceString = await $$('//*[@class=\'hdca-cart__product-services-checkbox-total\']').map(
      async (elem) => (
        await elem.getText()
      )
        .match(/[\d.,]+/)
        ?.toString()
        .replace(',', '') || '0.00',
    );
    const totalServiceItemPriceNumber = totalServiceItemPriceString.map(Number);
    if ((await $('//*[text()= \'Installer Travel Fee\']').isExisting()) === true) {
      const installerFee = await (await $('//*[contains(text(),\'Installer Travel Fee\')]/following::div[3]').getText()).replace('$', '');
      installerFeePrice = parseFloat(installerFee);
    } else {
      installerFeePrice = 0.0;
    }
    let totalItemPrice = 0;
    totalItemPriceNumber.forEach((totalItemAmount) => {
      totalItemPrice += totalItemAmount;
    });
    if (totalServiceItemPriceString.length >= 0 || installerFeePrice > 0) {
      let totalServiceItemPrice = 0;
      totalServiceItemPriceNumber.forEach((totalServiceItemAmount) => {
        totalServiceItemPrice += totalServiceItemAmount;
      });
      const totalItemAndServiceAmount = parseFloat(totalItemPrice.toFixed(2))
      + parseFloat(totalServiceItemPrice.toFixed(2)) + parseFloat(installerFeePrice.toFixed(2));
      const orderSubTotal = Number(orderSummaryMap.get('Order Subtotal'));
      await expect(totalItemAndServiceAmount).toEqual(orderSubTotal);
    } else {
      const orderSubTotal = Number(orderSummaryMap.get('Order Subtotal'));
      await expect(totalItemPrice).toEqual(orderSubTotal);
    }
  }

  async verifyTotalItemPriceAndOrderSubTotalFrench() {
    await this.orderSummaryTableFrench();
    const totalItemPriceString = await $$('//*[@class=\'acl-title\']').map(
      async (elem) => (
        await elem.getText()
      )
        .match(/[\d][\d.,\s]+/)
        ?.toString()
        .replace(/\s/g, '')
        .replace(',', '.') || '0.00',
    );
    const totalItemPriceNumber = totalItemPriceString.map(Number);
    const totalServiceItemPriceString = await $$('//*[@class=\'hdca-cart__product-services-checkbox-total\']').map(async (elem) => (await elem.getText()).match(/[\d.,]+/)?.toString() || '0.00');
    const totalServiceItemPriceNumber = totalServiceItemPriceString.map(Number);
    let totalItemPrice = 0;
    totalItemPriceNumber.forEach((totalItemAmount) => {
      totalItemPrice += totalItemAmount;
    });
    if (totalServiceItemPriceString.length >= 0) {
      let totalServiceItemPrice = 0;
      totalServiceItemPriceNumber.forEach((totalServiceItemAmount) => {
        totalServiceItemPrice += totalServiceItemAmount;
      });
      const totalItemAndServiceAmount = totalItemPrice + totalServiceItemPrice;
      const orderSubTotal = Number(orderSummaryMap.get('Total partiel'));
      await expect(totalItemAndServiceAmount).toEqual(orderSubTotal);
    } else {
      const orderSubTotal = Number(orderSummaryMap.get('Total partiel'));
      await expect(totalItemPrice).toEqual(orderSubTotal);
    }
  }

  async deSelectAllServiceCheckBox() {
    const checkBoxes = await $$('.hdca-checkbox__checkbox:checked');
    for (let i = 0; i < checkBoxes.length; i += 1) {
      $('form div:nth-child(1) .hdca-checkbox__checkbox:checked~.hdca-checkbox__faux-checkbox').click();
    }
  }

  async validateItemTotalCount() {
    const itemCount = await $$('//select[@aria-label="ACL_PANEL_PRODUCT_CARD.QUANTITY"]').map(async (elem) => elem.getValue());
    const itemCountNumber = itemCount.map(Number);
    let totalItemCount = 0;
    itemCountNumber.forEach((totalItem) => {
      totalItemCount += totalItem;
    });
    var itemCountminicart;
    const itemCountminicartText = (await $('//*[contains(text(),\' Cart \')]/ancestor-or-self::a/descendant::span').getText());
    if (itemCountminicartText.includes('+')){
      itemCountminicart = itemCountminicartText;
    }
    else{
      itemCountminicart = Number(itemCountminicartText);
    }
    const itemCountCartHeader = Number(await (await $('//*[contains(text(),\'My Cart\')]/child::span').getText()).replace(' item(s)', ''));
    if(itemCountminicart === '99+'){
      expect (String(itemCountCartHeader) === '^[1-9][0-9]{2}$');
    }
    else{
    expect(totalItemCount === itemCountminicart);
    expect(totalItemCount === itemCountCartHeader);
    }
  }

  async validateItemTotalCountFrench() {
    const itemCount = await $$('//select[@aria-label="ACL_PANEL_PRODUCT_CARD.QUANTITY"]').map(async (elem) => elem.getValue());
    const itemCountNumber = itemCount.map(Number);
    let totalItemCount = 0;
    itemCountNumber.forEach((totalItem) => {
      totalItemCount += totalItem;
    });

    const itemCountminicart = Number(await $('//*[contains(text(),\' Panier \')]/ancestor-or-self::a/descendant::span').getText());
    const itemCountCartHeader = Number(await (await $('//*[contains(text(),\'Mon Panier\')]/child::span').getText()).replace(' article(s)', ''));
    expect(totalItemCount === itemCountminicart);
    expect(totalItemCount === itemCountCartHeader);
  }

  async isCartEmpty() {
    isNotificationBadgeVisible = await $('//span[@class = "acl-icon__notification-badge acl-icon__notification-badge--warning"]').isDisplayed();
    if (isNotificationBadgeVisible === true) {
      await (await $('//acl-icon[@symbol = "cart"]')).click();
      await this.removeAllItemsFromCart('remove');
    }
  }

  async removeAllItemsFromCart(selector) {
    await browser.waitUntil(async () => await $('//span[@class = "acl-weight--regular"]').isDisplayed(), { timeout: 8000 });
    const isCartEmpty = await $('//span[@class = "acl-weight--regular"]').getText();
    if (!isCartEmpty.includes('0')) {
      await $('(//span[text() = " Remove " or text() = "Remove" or text() = "Supprimer" or text() = " Supprimer "])[1]').click();
      await browser.pause(3000);
      return this.removeAllItemsFromCart(selector);
    }
  }

  async verifyPricePerItemWithItemTotal() {
    const itemPerPrice = Number((await (await $('//*[@class=\'hdca-cart__product-pricing-unit-price ng-star-inserted\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    const itemTotalPrice = Number((await (await $('//*[@class =\'hdca-cart__product-pricing-total\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    const itemQuantity = Number(await (await $('//*[contains(text(),\'Quantity\')]/following::select')).getValue());
    await expect(itemTotalPrice === itemPerPrice * itemQuantity);
  }

  async verifyPricePerItemWithItemTotalFrench() {
    const itemPerPrice = Number(
      (await (
        await $('//*[@class=\'hdca-cart__product-pricing-unit-price ng-star-inserted\']').getText()
      )
        .match(/[\d][\d.,\s]+/)
        ?.toString()
        .replace(/\s/g, '')
        .replace(',', '.')) || '0.00',
    );
    const itemTotalPrice = Number(
      (await (
        await $('//*[@class =\'hdca-cart__product-pricing-total\']').getText()
      )
        .match(/[\d][\d.,\s]+/)
        ?.toString()
        .replace(/\s/g, '')
        .replace(',', '.')) || '0.00',
    );
    const itemQuantity = Number(await (await $('//*[contains(text(),\'Quantité\')]/following::select')).getValue());
    await expect(itemTotalPrice === itemPerPrice * itemQuantity);
  }

  async verifyOrderSubTotalforTier(quantity) {
    const itemTierPrice = Number((await (await $('//*[@class=\'acl-line-through acl-pr--small ng-star-inserted\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    const itemTotalPrice = Number((await (await $('//*[@class =\'acl-title ng-star-inserted\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    let itemQuantity = null;
    if (quantity < 10) {
      itemQuantity = Number(await (await $('//*[contains(text(),\'Qty\')]/following::select')).getValue());
    } else {
      itemQuantity = Number(await (await $('//*[@type = \'tel\']')).getValue());
    }
    await expect(itemTotalPrice === itemTierPrice * itemQuantity);
  }

  async verifyOrderTotalSavingforTier(quantity) {
    const actualPrice = Number((await (await $('//*[contains(@class, "acl-pt--xx-small acl-display--flex")]/span[2]').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    const itemTierPrice = Number((await (await $('//*[@class=\'acl-line-through acl-pr--small ng-star-inserted\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    const itemTotalSavedPrice = Number((await (await $('//div[contains(@class, "acl-color--success acl-weight--bold ng-star-inserted")]/div[2]').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    let itemQuantity;
    let itemSavedPrice = null;
    if (actualPrice > itemTierPrice) {
      itemSavedPrice = actualPrice - itemTierPrice;
      if (quantity < 10) {
        itemQuantity = Number(await (await $('//*[contains(text(),\'Qty\')]/following::select')).getValue());
      } else {
        itemQuantity = Number(await (await $('//*[@type = \'tel\']')).getValue());
      }
    }
    await expect(itemTotalSavedPrice === itemSavedPrice * itemQuantity);
  }

  async getMoqLimit() {
    moqLimit = Number((await (await $('//*[@data-qa = "wdio-pip-max-order-limit"]').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
  }

  async verifyQuantityDropdown() {
    const dropDownList = await $$('//*[@class = \'acl-select\']/child::option').map(async (elem) => elem.getValue());
    const dropDownListNumber = dropDownList.map(Number);
    if (moqLimit > 1 && moqLimit < 10) {
      await expect(dropDownListNumber.length === moqLimit);
    }
    if (moqLimit >= 10) {
      await expect(dropDownListNumber.length === 10);
    }
  }

  async addToCart() {
    if (await $('//*[text() = \'Add To Cart\']').isDisplayed()) {
      try {
        await $('//*[text() = \'Add To Cart\']').click();
        await browser.waitUntil(async () => $('//*[contains(@class,\'acl-modal__container\')]').isDisplayed(), {
          timeout: 30000,
        });
      } catch (Error) {
        browser.refresh();
        await browser.waitUntil(async () => $('//*[text() = \'Add To Cart\']').isDisplayed(), {
          timeout: 30000,
        });
        await $('//*[text() = \'Add To Cart\']').click();
        await browser.waitUntil(async () => $('//*[contains(@class,\'acl-modal__container\')]').isDisplayed(), {
          timeout: 30000,
        });
      }
    } else if (await $('//*[text() = \'Ajouter au panier\']').isDisplayed()) {
      try {
        await $('//*[text() = \'Ajouter au panier\']').click();
        await browser.waitUntil(async () => $('//*[contains(@class,\'acl-modal__container\')]').isDisplayed(), {
          timeout: 30000,
        });
      } catch (Error) {
        browser.refresh();
        await browser.waitUntil(async () => $('//*[text() = \'Ajouter au panier\']').isDisplayed(), {
          timeout: 30000,
        });
        await $('//*[text() = \'Ajouter au panier\']').click();
        await browser.waitUntil(async () => $('//*[contains(@class,\'acl-modal__container\')]').isDisplayed(), {
          timeout: 30000,
        });
      }
    }
  }

  async validateDeliveryDateUpdated() {
    const oldDeliveryDate = await $('//*[contains(@id, "deliveryDate")]').getText();
    await $('.hdca-cart__change-date .hdca-input-group__action-link').click();
    const calendarDate = new Date(await (await $('//*[contains(@class, "acl-date-picker-calender__date--is-selected")]')).getAttribute('data-date'));
    calendarDate.setDate(calendarDate.getDate() + 4);
    const newCalendarDate = calendarDate.toDateString();
    if (calendarDate.getDate() <= 4) await $('(//*[contains(@classname, "acl-date-picker-calender__month-nav-icon")])[2]').click();
    await $(`//*[contains(@data-date, "${newCalendarDate}")]`).click();
    await $('//*[contains(@classname, "acl-date-picker-calender__done-button")]').click();
    const newDeliveryDate = await $('//*[contains(@id, "deliveryDate")]').getText();
    expect(oldDeliveryDate !== newDeliveryDate);
  }

  async postalboxExpressDelivery(postalCode) {
    if (currenttime < 16 && currenttime >= 8) {
      if (await (await $('//input[@id=\'postalCode\']')).isDisplayed() === true) {
        await $('//input[@id=\'postalCode\']').addValue(postalCode);
        await $('//button[@id=\'btnPostalCode\']').click();
        postalBoxAvailable = 'Yes';
        return postalBoxAvailable;
      }

      postalBoxAvailable = 'Yes';
      return postalBoxAvailable;
    }
    await browser.pause(1000);
    if (await (await $('//input[@id=\'postalCode\']')).isDisplayed() === true) {
      await $('//input[@id=\'postalCode\']').addValue(postalCode);
      await $('//button[@id=\'btnPostalCode\']').click();
      (await $('//input[contains(@id,\'express-DELIVERY_SCD\')]')).waitForDisplayed({ timeout: 20000 });
      await browser.pause(1000);
      await $('//*[contains(@class,\'acl-mr--xx-small ng-star-inserted\')]').click();
    } else {
      (await $('//input[contains(@id,\'express-DELIVERY_SCD\')]')).waitForDisplayed({ timeout: 20000 });
      await browser.pause(1000);
      await $('//*[contains(@class,\'acl-mr--xx-small ng-star-inserted\')]').click();
    }
    postalBoxAvailable = 'No';
    return postalBoxAvailable;
  }

  async expressDeliverySameday(postalcode) {
    await this.postalboxExpressDelivery(postalcode);
    if (postalBoxAvailable === 'Yes') {
      (await $('//label[contains(@for,\'express-DELIVERY_SD4\')]')).waitForDisplayed({ timeout: 20000 });
      (await $('//label[contains(@for,\'express-DELIVERY_SD4\')]')).click();
      await browser.pause(1000);
      await expect($('//*[text()= \'SAME-DAY (WITHIN 3 HOURS):\']')).toBeDisplayed();
      await expect($('//*[text()= \'If ordered within \']')).toBeDisplayed();
    }
  }

  async expressDeliverySamedayFrench(postalcode) {
    await this.postalboxExpressDelivery(postalcode);
    if (postalBoxAvailable === 'Yes') {
      (await $('//*[contains(text(),\'(dans un délai de 3 heures):\')]')).waitForDisplayed({ timeout: 20000 });
      (await $('//label[contains(@for,\'express-DELIVERY_SD4\')]')).click();
      await browser.pause(1000);
      await expect($('//*[text()= \'MÊME JOUR (DANS UN DÉLAI DE 3 HEURES):\']')).toBeDisplayed();
      await expect($('//*[text()= \'Si commandé dans un délai de \']')).toBeDisplayed();
    }
  }

  async expressDeliveryScheduled(postalcode) {
    await this.postalboxExpressDelivery(postalcode);
    await browser.pause(1000);
    if (postalBoxAvailable === 'Yes') {
      (await $('//label[contains(@for,\'express-DELIVERY_SCD\')]')).waitForDisplayed({ timeout: 20000 });
      await browser.pause(1000);
      (await $('//label[contains(@for,\'express-DELIVERY_SCD\')]')).click();
    }
  }

  async quantityVerification(productQuantity, index) {
    let quantityCheck;
    if (await (($(`(//*[contains(@type,'tel')])[${Number(index)}]`)).isDisplayed()) === true) {
      quantityCheck = await (await $(`(//*[contains(@type,'tel')])[${Number(index)}]`)).getValue();
    } else {
      quantityCheck = await ($(`(//*[@class='acl-select'])[${Number(index)}]`)).getValue();
    }
    if (productQuantity === '10 +') {
      productQuantity = 10;
    }
    if (productQuantity !== Number(quantityCheck)) {
      if (Number(productQuantity) >= 10 && Number(quantityCheck) <= 10) {
        await $(`(//*[@class='acl-select'])[${Number(1)}]`).selectByVisibleText('10 +');
        await (await $(`(//*[contains(@type,'tel')])[${Number(index)}]`)).setValue(productQuantity);
        browser.keys('Enter');
      } else if (Number(productQuantity) >= 10 && Number(quantityCheck) >= 10) {
        await (await $(`(//*[contains(@type,'tel')])[${Number(index)}]`)).setValue(productQuantity);
        browser.keys('Enter');
      } else {
        await $(`(//*[@class='acl-select'])[${Number(index)}]`).selectByVisibleText(productQuantity);
      }
    }
  }

  async itemsAddedToCartAreEqualsTo(itemQuantity: number) {
    const itemCountFromATC = Number((await (await $('//*[@symbol=\'cart\']/child::span').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    expect(itemCountFromATC === itemQuantity);
  }

  async continueButton() {
    const isContinueButtonVisible = await $('//*[text() = \'Will someone else be picking up this order?\' or text()=\'Est-ce que quelqu’un d’autre va ramasser cette commande?\']').isDisplayed();
    if (await isContinueButtonVisible === true) {
      await $('//*[text() =\'Continue\' or text() =\'Continuer\']').click();
    }
  }

  async getCurrentDate() {
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currenMonth = monthArray[currentDate.getMonth()];
    const currenDay = currentDate.getDate();
    return `${currenMonth} ${currenDay}`;
  }

  async validateDeliveryDateIsEqualToEstimatedArrival() {
    let estimatedArrivalDate = await $('//div[contains(@class, "acl-weight--bold md:acl-pl--x-small")]').getText();
    let deliveryDate = await $('//*[contains(@class, "acl-card--border-color--highlight")]//div[contains(@class, "acl-title--x-small")]/div').getText();
    if (deliveryDate === 'Today within 3 hours') {
      const currentDate = await this.getCurrentDate();
      return await expect(estimatedArrivalDate).toEqual(currentDate);
    }
    const estimatedArrivalDateArray = estimatedArrivalDate.split(' ');
    const deliveryDateeArray = deliveryDate.split(' ');
    if (estimatedArrivalDateArray.length > 2) {
      estimatedArrivalDate = estimatedArrivalDateArray.slice(0, 2).join(' ');
    }
    if (deliveryDateeArray.length > 2) {
      deliveryDate = deliveryDateeArray.slice(1, 3).join(' ');
    }
    await expect(estimatedArrivalDate).toEqual(deliveryDate);
  }

  async compareDate(index) {
    let header = await $(`(//*[contains(@class,"acl-weight--bold md:acl-pl--x-small")])[${Number(index)}]`).getText();
    if (header.length > 6) {
      header = header.substring(0, 6);
    }
    const container = await $(`(//*[contains(@class,"acl-card--border-color acl-card--border-color--highlight")])[${Number(index)}]`).getText();
    await expect(container).toContain(header);
  }

  async compareStore(index) {
    const header = await $(`(//*[@classname = "acl-link acl-text-size--large"])[${Number(index)}]`).getText();
    const container = await $(`(//*[contains(@class,"acl-card--border-color acl-card--border-color--highlight")])[${Number(index)}]`).getText();
    await expect(container).toContain(header);
  }

  async compareDeliveryType(index) {
    let header = await $(`(//*[@class = "acl-title--large acl-ml--x-small"])[${Number(index)}]`).getText();
    if (header === 'Delivery to'){
      header = 'Delivery'
    }
    const container = await $(`(//*[@style="order: 1;"])[${Number(index)}]`).getText();
    await expect(container).toContain(header);
  }

  async compareFree(index) {
    const header = await $(`(//*[contains(@class,"acl-color--savings")])[${Number(index)}]`).getText();
    const container = await $(`(//*[contains(@class,"acl-card--border-color acl-card--border-color--highlight")])[${Number(index)}]`).getText();
    await expect(container).toContain(header);
  }

  async compareOrderSummaryDate(index) {
    const orderSummaryDate = await $('//div[contains(@class,\'medium acl-color--title\')]//div[starts-with(text(),\' Delivery \')]').getText();
    const regex = /\bDelivery\b/gi;
    const dayMonth = orderSummaryDate.replace(regex, '').trim();
    const container = await $(`(//*[contains(@class,"acl-card--border-color acl-card--border-color--highlight")])[${Number(index)}]`).getText();
    await expect(container).toContain(dayMonth);
  }

  async validateCartHeaderAndContainerHasSameVariable(variable, index) {
    const compareSection = {
      date: this.compareDate,
      store: this.compareStore,
      deliveryType: this.compareDeliveryType,
      freePickup: this.compareFree,
      orderSummaryDate: this.compareOrderSummaryDate,
    };
    await compareSection[variable](index);
  }

  isBadgeVisible() {
    return isNotificationBadgeVisible;
  }

  async chooseSameDayDeliverOption() {
    if (currenttime < 16 && currenttime >= 8) {
      (await $('//*[contains(@id,\'fulfillment_DELIVERY_SD4_\')]')).click();
    } else {
      (await $('//*[contains(@id,\'fulfillment_DELIVERY_SCD_\')]')).click();
    }
  }
}
export default new OrderSummary();
