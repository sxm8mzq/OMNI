import { Then } from "@wdio/cucumber-framework";
import { browser, $, $$, expect } from "@wdio/globals";
import "dotenv/config";

Then(/^the user navigates to the "([^"]*)?"$/, async (url) => {
  await browser.navigateTo(url);
});

Then(/^the user presses keyboard key "([^"]*)?"$/, async (key) => {
  await browser.keys(key);
});

Then(/^the user presses key "([^"]*)?" "([^"]*)?" times$/, async (key, times) => {
  for (let i = 0; i < times; i++) {
    await browser.keys(key);
  }
});

Then(/^the user enters text "([^"]*)?" in current textbox$/, async (text) => {
  await browser.keys(text);
});

Then(/^the user validates the url to have "([^"]*)?"$/, async (text) => {
  await expect(browser).toHaveUrl(expect.stringContaining(text));
});

Then(/^the user validates the url not to have "([^"]*)?"$/, async (text) => {
  expect(await browser.getUrl()).not.toContain(text);
});

Then(/^the user refresh the page$/, async () => {
  await browser.refresh();
});

Then(/^the user switch the tab to "([^"]*)?"$/, async (tabNumber) => {
  const Tabs = await browser.getWindowHandles();
  browser.switchToWindow(Tabs[tabNumber]);
});

Then(/^the user close the current tab$/, async () => {
  browser.closeWindow();
});

Then(/^the user go back on browser$/, async () => {
  browser.back();
});

Then(/^the user go forward on browser$/, async () => {
  browser.forward();
});
