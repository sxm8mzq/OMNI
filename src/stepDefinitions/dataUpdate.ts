import { Then } from '@wdio/cucumber-framework';
import JsonData from '../pageObjects/skuData.js';

Then(/^the user updates "([^"]*)?" to "([^"]*)?"$/, async (oldSku, newSku) => {
  await JsonData.skuReplacer(oldSku, newSku);
});
