import { Then } from '@wdio/cucumber-framework';
import plp from '../pageObjects/plp.js';
import { randomEmail } from '../pageObjects/home.js';
import { browser, $, $$, expect } from '@wdio/globals';

import 'dotenv/config';

Then(/^the user validates if (.*) text is visible$/, async (selector) => {
  await expect($(`//*[text()= ${selector}]`)).toBeDisplayed();
});

Then(/^the user validates if (.*) text is visible at index "([^"]*)?"$/, async (selector, index) => {
  await expect($(`(//*[text()= ${selector}])[${Number(index)}]`)).toBeDisplayed();
});

Then(/^the user validates if the text (.*) is visible at index "([^"]*)?"$/, async (selector, index) => {
  await expect($(`(//*[contains(text(), ${selector})])[${Number(index)}]`)).toBeDisplayed();
});

Then(/^the user validates if (.*) text is not visible$/, async (selector) => {
  await expect($(`//*[text()= ${selector}]`)).not.toBeDisplayed();
});

Then(/^the user validates if text (.*) is not visible at index "([^"]*)?"$/, async (selector, index) => {
  await expect($(`(//*[contains(text(), ${selector})])[${Number(index)}]`)).not.toBeDisplayed();
});

Then(/^the user validates if placeholder with text (.*) is visible$/, async (selector) => {
  await expect($(`//*[@placeholder = ${selector}]`)).toBeDisplayed();
});

Then(/^the user validates if randomly generated email is visible$/, async () => {
  await expect($(`//*[contains(text(), '${randomEmail}')]`)).toBeDisplayed();
});

Then(/^the user validates if (.*) radio button is selected$/, async (selector) => {
  await expect($(`//*[contains(text(), ${selector})]/parent::*/parent::div//child::input[@type='radio']`)).toBeChecked();
});

Then(/^the user validates if the (.*) radio button at index "([^"]*)?" is selected$/, async (selector, index) => {
  await expect($(`(//*[contains(text(), ${selector})]/parent::*/parent::div//child::input[@type='radio'])[${Number(index)}]`)).toBeChecked();
});

Then(/^the user validates if (.*) radio button is not selected$/, async (selector) => {
  await expect($(`//*[contains(text(), ${selector})]/parent::*/parent::div//child::input[@type='radio']`)).not.toBeChecked();
});

Then(/^the user validates if (.*) checkbox is selected$/, async (selector) => {
  await expect($(`//*[contains(text(), ${selector})]/preceding::input[@type='checkbox'][1]`)).toBeSelected();
});

Then(/^the user validates if (.*) checkbox is not selected$/, async (selector) => {
  await expect($(`//*[contains(text(), ${selector})]/preceding::input[@type='checkbox']`)).not.toBeSelected();
});

Then(/^the user validates if webelement with html tag "([^"]*)?" as (.*) at index "([^"]*)?" is selected$/, async (htmlTag, selector, index) => {
  await expect($(`(//*[contains(@${htmlTag}, ${selector})])[${Number(index)}]`)).toBeSelected();
});

Then(/^the user validates if text for (.*) is "([^"]*)?"$/, async (selector, text) => {
  await expect($(`//*[contains(text(), ${selector})]`)).toHaveText(text);
});

Then(/^the user validates if text for (.*) contains "([^"]*)?"$/, async (selector, text) => {
  await expect($(`//*[contains(text(), ${selector})]`)).toHaveTextContaining(text);
});

Then(/^the user validates if the webelement with html attribute "([^"]*)?" as (.*) has text "([^"]*)?"$/, async (htmlTag, selector, text) => {
  await expect($(`//*[contains(@${htmlTag}, ${selector})]`)).toHaveTextContaining(text);
});

Then(/^the user validates if sort by dropdown has text "([^"]*)?"$/, async (text) => {
  await expect($(`//*[text()=' Sort by 'or text()=' Trier par ']/following-sibling::div/span`)).toHaveTextContaining(text);
});

Then(/^the user verifies if the webelement with html attribute "([^"]*)?" as (.*) at index "([^"]*)?" has text "([^"]*)?"$/, async (htmlTag, selector, index, text) => {
  await expect($(`(//*[contains(@${htmlTag}, ${selector})])[${Number(index)}]`)).toHaveTextContaining(text);
});

Then(/^the user validates if the webelement with html attribute "([^"]*)?" as (.*) do not have text "([^"]*)?"$/, async (htmlTag, selector, text) => {
  await expect($(`//*[contains(@${htmlTag}, ${selector})]`)).not.toHaveTextContaining(text);
});

Then(/^the user verifies if webelement with "([^"]*)?" as (.*) and attribute as "([^"]*)?" has text "([^"]*)?"$/, async (htmlTag, selector, attributeHtmlTag, text) => {
  await expect(await $(`(//*[contains(@${htmlTag},${selector})])`)).toHaveAttr(attributeHtmlTag, expect.stringContaining(text));
});

Then(/^the user verifies if value from webelement with html attribute "([^"]*)?" as (.*) contains "([^"]*)?"$/, async (htmlTag, selector, text) => {
  await expect(await $(`//*[@${htmlTag} = ${selector}]`).getValue()).toContain(text);
});

Then(/^the user validates if dropdown (.*) has value "([^"]*)?"$/, async (selector, value) => {
  await expect($(`//*[contains(text(),${selector})]/following::select`)).toHaveValue(value);
});

Then(/^the user validates if the dropdown (.*) at index "([^"]*)?" in its options it has the value "([^"]*)?"$/, async (selector, index, value) => {
  const dropdownOptions = await $(`(//*[contains(text(),${selector})]/following::select)[${Number(index)}]`).getText();
  await expect(dropdownOptions.includes(value)).toEqual(true)
});

Then(/^the user validates if the dropdown (.*) do not have value "([^"]*)?"$/, async (selector, value) => {
  await expect($(`//*[contains(text(),${selector})]/following::select`)).not.toHaveValue(value);
});

Then(/^the user validates if the dropdown (.*) at index "([^"]*)?" in its options it does not have the value "([^"]*)?"$/, async (selector, index, value) => {
  const dropdownOptions = await $(`(//*[contains(text(),${selector})]/following::select)[${Number(index)}]`).getText();
  await expect(dropdownOptions.includes(value)).toEqual(false)
});

Then(/^the user validates if the webelement with the html attribute "([^"]*)?" as (.*) has value "([^"]*)?"$/, async (htmlTag, selector, value) => {
  await expect($(`//*[contains(@${htmlTag}, ${selector})]`)).toHaveValue(value);
});

Then(/^the user validates if (.*) button is not clickable$/, async (selector) => {
  await expect($(`//*[text()= ${selector}]/parent::button`)).not.toBeClickable();
});

Then(/^the user validates if button (.*) is enabled$/, async (selector) => {
  await expect($(`//*[text()= ${selector}]/parent::button`)).toBeEnabled();
});

Then(/^the user validates if button (.*) is disabled$/, async (selector) => {
  await expect($(`//*[text()= ${selector}]/parent::button`)).toBeDisabled();
});

Then(/^the user verifies if checkbox (.*) is disabled$/, async (selector) => {
  await expect($(`//span[contains(text(), ${selector})]/parent::label/div/input[@type = 'checkbox']`)).toBeDisabled();
});

Then(/^the user verifies if webelement with html tag "([^"]*)?" as (.*) is enabled$/, async (htmlTag, selector) => {
  await expect($(`//*[contains(@${htmlTag},${selector})]`)).toBeEnabled();
});

Then(/^the user validates if webelement with html tag "([^"]*)?" as (.*) at index "([^"]*)?" is enabled$/, async (htmlTag, selector, index) => {
  await expect($(`(//*[contains(@${htmlTag},${selector})])[${Number(index)}]`)).toBeEnabled();
});

Then(/^the user verifies if webelement with html tag "([^"]*)?" as (.*) is disabled$/, async (htmlTag, selector) => {
  await expect($(`//*[contains(@${htmlTag},${selector})]`)).toBeDisabled();
});

Then(/^the user validates if webelement with html tag "([^"]*)?" as (.*) at index "([^"]*)?" is disabled$/, async (htmlTag, selector, index) => {
  await expect($(`(//*[contains(@${htmlTag},${selector})])[${Number(index)}]`)).toBeDisabled();
});

Then(/^the user validates if webelement with html attribute "([^"]*)?" as (.*) is visible$/, async (htmlTag, selector) => {
  await expect($(`//*[contains(@${htmlTag}, ${selector})]`)).toBeDisplayed();
});

Then(/^the user validates if the webelement with html attribute "([^"]*)?" as (.*) at index "([^"]*)?" is visible$/, async (htmlTag, selector, index) => {
  await expect($(`(//*[contains(@${htmlTag}, ${selector})])[${Number(index)}]`)).toBeDisplayed();
});

Then(/^the user validates if the webelement with html attribute "([^"]*)?" as (.*) at index "([^"]*)?" is not visible$/, async (htmlTag, selector, index) => {
  await expect($(`(//*[contains(@${htmlTag}, ${selector})])[${Number(index)}]`)).not.toBeDisplayed();
});

Then(/^the user validates if shadow element is visible under html tag "([^"]*)?" as (.*)$/, async (htmlTag, selector) => {
  const element = await $(`//*[contains(@${htmlTag}, ${selector})]`);
  expect(await element.shadow$('div[role=dialog]')).toBeDisplayed();
});

Then(/^the user validates if xhref webelement (.*) at index "([^"]*)?" is visible$/, async (selector, index) => {
  await expect($(`(//*[name()='use' and @*=${selector}])[${Number(index)}]`)).toBeDisplayed();
});

Then(/^the user validates if webelement with html attribute "([^"]*)?" as (.*) is not visible$/, async (htmlTag, selector) => {
  await expect($(`//*[contains(@${htmlTag}, ${selector})]`)).not.toBeDisplayed();
});

Then(/^the user validates if the xhref webelement (.*) at index "([^"]*)?" is not visible$/, async (selector, index) => {
  await expect($(`(//*[name()='use' and @*=${selector}])[${Number(index)}]`)).not.toBeDisplayed();
});

Then(/^the user validates if the icon "([^"]*)?" at index "([^"]*)?" is visible$/, async (iconName, index) => {
  iconName = iconName.toLowerCase();
  await expect($(`(//*[name()='use' and @*='#${iconName}'])[${Number(index)}]`)).toBeDisplayed();
});

Then(/^the user validates if the icon "([^"]*)?" at index "([^"]*)?" is not visible$/, async (iconName, index) => {
  iconName = iconName.toLowerCase();
  await expect($(`(//*[name()='use' and @*='#${iconName}'])[${Number(index)}]`)).not.toBeDisplayed();
});

Then(/^the user validates is html attribute "([^"]*)?" as (.*) is having the count as "([^"]*)?"$/, async (htmlTag, selector, count) => {
  const elementArray = await $$(`//*[@${htmlTag} =${selector}]`);
  if(selector == "acl-bloomreach__card"){
    await expect(elementArray.length).toBeLessThanOrEqual(Number(count));
  }
  else{
    await expect(elementArray.length).toEqual(Number(count));
  }
});

Then(/^the user validates if  (.*) at index "([^"]*)?" is selected$/, async (selector, index) => {
  expect($(`(//*[text() = ${selector}]//ancestor::button[@aria-checked = 'true'])[${index}]`)).toBeSelected();
});

Then(/^the user validates if the "([^"]*)?" of webelement with html tag "([^"]*)?" as (.*) is "([^"]*)?"$/, async (styleProp, htmlTag, selector, expCss) => {
  await plp.verifyCssProperty(styleProp, htmlTag, selector, expCss);
});

Then(/^the user verifies if cart notification badge in pip is visible$/, async () => {
  await expect($(`//*[@class = 'acl-icon__notification-badge acl-icon__notification-badge--warning']`)).toBeDisplayed();
});