/* eslint-disable */
import { faker } from "@faker-js/faker";
let randomEmail: string;
let environment: string;
import { browser, $, $$, expect } from "@wdio/globals";
import { Key } from "webdriverio";
import { promises as fs } from "fs";
let phoneNumber;
/* eslint-enable */
class Home {
  async emailGenerator() {
    randomEmail = faker.internet.email().toLowerCase();
    return randomEmail;
  }

  async phoneNumberGenerator(digitsToAdd: number) {
    do {
      const randomNumber = faker.phone.number().replace(/-/g, "");
      const digitsOnly = randomNumber.replace(/\D/g, "");
      phoneNumber = digitsOnly.slice(0, digitsToAdd);
    } while (phoneNumber[0] === "0" || phoneNumber[0] === "1");
    return phoneNumber;
  }

  async emailGenerated() {
    return randomEmail;
  }

  async launchOneUrl() {
    if (process.env.Env.toUpperCase() === "QP") {
      await browser.url(process.env.QP_APP_URL);
      await browser.maximizeWindow();
      await $('//*[text() = "OK"]').click();
      await $('//*[text() = "Change Store"]').click();
      environment = "QP";
      return environment;
    }
    if (process.env.Env.toUpperCase() === "PROD") {
      await browser.url(process.env.PROD_APP_URL);
      await browser.maximizeWindow();
      await $('//*[text() = "OK"]').click();
      await $('//*[text() = "Change Store"]').click();
      environment = "PROD";
      return environment;
    }
    if (process.env.Env.toUpperCase() === "QA") {
      await browser.url(process.env.QA_APP_URL);
      await browser.maximizeWindow();
      await $('//*[text() = "OK"]').click();
     // await browser.pause(3000);
      const changeStore=await $('//*[text() = "Change Store"]').isDisplayed();
      if(changeStore===true)
        {
          await $('//*[text() = "Change Store"]').click();
         
        }
         environment = "QA";
          return environment;
  }
    if (process.env.Env.toUpperCase() === "DEV") {
      await browser.url(process.env.DEV_APP_URL);
      await browser.maximizeWindow();
      environment = "DEV";
      await $('//*[text() = "OK"]').click();
      await $('//*[text() = "Change Store"]').click();
      return environment;
    }
  }

  async enterSkuData(selector, skuData, e2eData, scenarioName) {
    if (environment === "QP") {
      await $(`[placeholder = ${selector}]`).click();
      await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
      if (typeof skuData[scenarioName] !== "undefined") {
        await $(`[placeholder = ${selector}]`).addValue(skuData[scenarioName].QP.sku);
      } else if (typeof e2eData[scenarioName] !== "undefined") {
        await $(`[placeholder = ${selector}]`).addValue(e2eData[scenarioName].QP.sku);
      }
    } else if (environment === "PROD") {
      await $(`[placeholder = ${selector}]`).click();
      await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
      await $(`[placeholder = ${selector}]`).addValue(skuData[scenarioName].PROD.sku);
    } else if (environment === "QA") {
      await $(`[placeholder = ${selector}]`).click();
      await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
      await browser.keys("Escape");
      if (typeof skuData[scenarioName] !== "undefined") { 
      await $(`[placeholder = ${selector}]`).addValue(skuData[scenarioName].QA.sku);
      }
    } else if (environment === "DEV") {
      await $(`[placeholder = ${selector}]`).click();
      await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
      await $(`[placeholder = ${selector}]`).addValue(skuData[scenarioName].DEV.sku);
    }
  }

  async validateNowHoursStatus() {
    const storeNowStatus = await $("global-header-localization .acl-store-hours-menu__status-now").getText();
    const storeFutureStatus = await $("global-header-localization .acl-store-hours-menu__status-future").getText();
    if (storeNowStatus.includes("Closed") || storeNowStatus.includes("Fermé")) {
      await expect(storeFutureStatus).toContain("Opens");
    } else if (storeNowStatus.includes("Open") || storeNowStatus.includes("Ouvert")) {
      await expect(storeFutureStatus).toContain("Closes");
    } else {
      console.log("Store is not localised");
    }
  }

  async checkboxIsSelected(checkbox) {
    const checkboxischecked = await $(`//span[text()=${checkbox}]/ancestor::acl-checkbox-container[contains(@class,'--is-checked')]`).isDisplayed();
    if (checkboxischecked === false) {
      await $(`//span[text()=${checkbox}]`).click();
    }
  }

  async compareScreenShot(selector, htmlTag, index) {
    const ele = await $(`(//*[contains(@${htmlTag},${selector})])[${Number(index)}]`);
    await expect(await browser.checkElement(ele)).toEqual(0);
  }

  async loadConfig(filePath: string) {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  }
}

export default new Home();
export { randomEmail };
