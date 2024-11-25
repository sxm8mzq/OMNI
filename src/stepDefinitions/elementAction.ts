import { Then } from "@wdio/cucumber-framework";
import { waitForElement } from "../pageObjects/page.js";
import { browser, $, $$, expect } from "@wdio/globals";
import { Key } from "webdriverio";
import home from "../pageObjects/home.js";

Then(/^the user enters value "([^"]*)?" in dropdown (.*)$/, async (text, selector) => {
  await $(`//*[contains(text(),${selector})]/following::select`).selectByVisibleText(text);
});

Then(/^the user enter value "([^"]*)?" in dropdown (.*) at index "([^"]*)?"$/, async (text, selector, index) => {
  await $(`//*[contains(text(),${selector})]/following::select[${Number(index)}]`).selectByVisibleText(text);
});

Then(/^the user enters the value "([^"]*)?" in dropdown with html attribute "([^"]*)?" as (.*) at index "([^"]*)?"$/, async (text, attribute, selector, index) => {
  await $(`(//*[@${attribute} = ${selector}])[${Number(index)}]`).selectByVisibleText(text);
});

Then(/^the user enters text "([^"]*)?" in textbox with placeholder (.*)$/, async (text, selector) => {
  await browser.pause(6000);
  try {
    await browser.execute('window.scrollTo(0,document.body.scrollHeight)');
  } catch (e) {
    await browser.takeScreenshot();
   // expect.fail(0, 1, `page scroll till bottom is not working:: ${e}`);
  }
  await browser.pause(2000);
  await $(`[placeholder = ${selector}]`).click();
  await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
  await $(`[placeholder = ${selector}]`).addValue(text);
});

Then(/^the user enters text "([^"]*)?" in the textbox (.*)$/, async (text, selector) => {
  //await $(`//*[contains(text(),${selector})]/following::input[1]`).click();
  await $(`(//*[contains(text(),${selector})]/following::input[1])[1]`).click();
  await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
  await $(`//*[contains(text(),${selector})]/following::input[1]`).addValue(text);
});

Then(/^the user enters the text "([^"]*)?" in the textbox (.*) at index "([^"]*)?"$/, async (text, selector, index) => {
  await $(`//*[contains(text(),${selector})]/following::input[${Number(index)}]`).click();
  await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
  await $(`//*[contains(text(),${selector})]/following::input[${Number(index)}]`).addValue(text);
});

Then(/^the user enters the text "([^"]*)?" on the webelement with html tag "([^"]*)?" as (.*)$/, async (text, htmlTag, selector) => {
  await $(`//*[contains(@${htmlTag},${selector})]`).click();
  await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
  await $(`//*[contains(@${htmlTag},${selector})]`).addValue(text);
});

Then(/^the user enters text "([^"]*)?" on the webelement with html tag "([^"]*)?" as (.*) at index "([^"]*)?"$/, async (text, htmlTag, selector, index) => {
  await $(`(//*[contains(@${htmlTag},${selector})])[${Number(index)}]`).click();
  await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
  await $(`(//*[contains(@${htmlTag},${selector})])[${Number(index)}]`).addValue(text);
});

Then(/^the user clicks on the webelement with html tag "([^"]*)?" as (.*)$/, async (htmlTag, selector) => {
  await $(`//*[@${htmlTag} = ${selector}]`).click();
});

Then(/^the user clicks the webelement containing html tag "([^"]*)?" as (.*)$/, async (htmlTag, selector) => {
  await $(`//*[contains(@${htmlTag},${selector})]`).click();
});

Then(/^the user clicks on the element with html tag "([^"]*)?" as (.*) at index "([^"]*)?"$/, async (htmlTag, selector, index) => {
  await $(`(//*[contains(@${htmlTag}, ${selector})])[${Number(index)}]`).click();
});

Then(/^the user clicks on the (.*) button at index "([^"]*)?"$/, async (selector, index) => {
  await $(`(//span[text() = ${selector}])[${Number(index)}]`).click();
});

Then(/^the user double clicks on the (.*) button$/, async (selector) => {
  await $(`//span[text() = ${selector}]`).doubleClick();
});

Then(/^the user clicks on the link "([^"]*)?"$/, async (selector) => {
  await $(`=${selector}`).click();
});

Then(/^the user clicks on the link (.*) at index "([^"]*)?"$/, async (selector, index) => {
  await $(`(//a[text() = ${selector}])[${Number(index)}]`).click();
});

Then(/^the user clicks on the checkbox (.*)$/, async (selector) => {
  await $(`//*[contains(text(), ${selector})]/preceding::input[@type='checkbox']/following::span`).click();
});

Then(/^the user clicks on checkbox (.*) at index "([^"]*)?"$/, async (selector, index) => {
  await $(`(//*[contains(text(), ${selector})]/parent::span/preceding-sibling::div/child::input[@type='checkbox']/following-sibling::span)[${Number(index)}]`).click();
});

Then(/^the user click on (.*)$/, async (selector) => {
  await browser.pause(1000);
  (await $(`//*[text() = ${selector}]`)).waitForDisplayed({ timeout: 60000 });
  await $(`//*[text() = ${selector}]`).click();
});

Then(/^the user clicks on text (.*) at index "([^"]*)?"$/, async (selector, index) => {
  await $(`(//*[contains(text(), ${selector})])[${Number(index)}]`).click();
});
// Then(/^the user waits for place order button to be visible$/, async () => {
//    (await $(QASAPLOGIN.XXX)).waitForDisplayed({ timeout: 60000 });
// });
Then(/^the user waits for text (.*) to be visible$/, async (selector) => {
   
  (await $(`//*[contains(text(),${selector})]`)).waitForDisplayed({ timeout: 60000 });
});

Then(/^the user waits for "([^"]*)?" seconds$/, async (seconds) => {
  await browser.pause(seconds * 1000);
});

Then(/^the user waits for webelement (.*) with html attribute "([^"]*)?" to be visible$/, async (selector, attribute) => {
  await browser.pause(3000);
  await waitForElement(await $(`//*[contains(@${attribute},${selector})]`));
});

Then(/^the user waits for webelement (.*) with html attribute "([^"]*)?" not to be visible$/, async (selector, attribute) => {
  (await $(`//*[contains(@${attribute},${selector})]`)).waitForExist({ reverse: true });
});

Then(/^the user waits until the spinner is no longer visible$/, async () => {
  (await $(`//*[contains(@class, 'acl-spinner__spinner')]`)).waitForExist({ reverse: true });
});

Then(/^the user switches to the frame (.*)$/, async (frameName) => {
  await browser.pause(6000);
  await waitForElement(await $(`//orange-pay-component`));
  await $(`iframe[name*=${frameName}]`).scrollIntoView({ block: "center" });
  await browser.switchToFrame(await $(`iframe[name*=${frameName}]`));
});

Then(/^the user switches to the parent frame$/, async () => {
  await browser.switchToParentFrame();
});

Then(/^the user scrolls to (.*) with html attribute "([^"]*)?" at index "([^"]*)?"$/, async (selector, attribute, index) => {
  await $(`(//*[contains(@${attribute},${selector})])[${Number(index)}]`).scrollIntoView({ block: "center" });
});

Then(/^the user scrolls to (.*)$/, async (selector) => {
  await $(`//*[text()=${selector}]`).scrollIntoView({ block: "center" });
});

Then(/^the user gets text from the textbox with placeholder (.*)$/, async (selector) => {
  await $(`//input[@placeholder = ${selector}]`).getValue();
});

Then(/^the user clears the value from textbox(.*)$/, async (selector) => {
  await $(`//*[contains(text(),${selector})]/following::input[1]`).clearValue();
});

Then(/^the user selects the radio button (.*)$/, async (selector) => {
  await $(`//*[contains(text(), ${selector})]/preceding-sibling::div`).click();
});

Then(/^the user hover on the "([^"]*)?" with name as (.*)$/, async (tag, selector) => {
  await $(`//*[contains(text(),${selector})]/following::${tag}`).moveTo();
});

Then(/^the user verifies if the photo of the webelement (.*) with html attribute "([^"]*)?" at index "([^"]*)?" is as expected$/, async (selector, htmlTag, index) => {
  await home.compareScreenShot(selector, htmlTag, index);
});

Then(/^the user clicks on the "([^"]*)?" icon at index "([^"]*)?"$/, async (iconName, index) => {
  const ariaIcon = (await $(`(//*[contains(@aria-label,'${iconName}')])[${Number(index)}]`));
  iconName = iconName.toLowerCase();
  const useIcon= await $(`(//*[name()='use' and @*='#${iconName}']/../..)[${Number(index)}]`);
  const useIconExist=await useIcon.isExisting();
  if (useIconExist === true){
    await useIcon.click();
  }
  else{
    await ariaIcon.click();
  }
});

Then(/^the user clicks on the image with hover text "([^"]*)?"$/, async (text) => {
   (await $(`//img[@alt='${text}' or @title='${text}']`)).click();
});