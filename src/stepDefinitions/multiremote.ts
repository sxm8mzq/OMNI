import { Given, Then } from '@wdio/cucumber-framework';
import { browser, $, $$, expect } from '@wdio/globals';

Given(/^the user launches the url in chrome$/, async () => {
  await browser.browser1.url(process.env.QP_APP_URL);
});

Then(/^the user clicks on change store$/, async () => {
  await browser.browser1.$('//*[text() = "Change Store"]').click();
});

Then(/^the user refresh browser in mobile$/, async () => {
  await browser.browser2.refresh();
});

Then(/^the user enters store number$/, async () => {
  await browser.browser1.$('[placeholder = \'Postal Code, City, Province, or Store Number\']').addValue('7001');
});
