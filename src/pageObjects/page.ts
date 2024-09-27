import { browser, $, $$, expect } from '@wdio/globals';
/* eslint-disable */
export const waitForElement = async (element: { isDisplayed: () => boolean | Promise<boolean> }) => {
  /* eslint-enable */
  await browser.waitUntil(() => element.isDisplayed(), {
    timeout: 40000,
    timeoutMsg: 'element not displayed',
  });
};
