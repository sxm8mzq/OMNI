import { browser, $, $$, expect } from '@wdio/globals';
class BookAnAssociate {
  async selectDateAndTime() {
    await browser.waitUntil(async () => await $('//*[@class = "acl-list acl-list--type--touch-menu-date ng-star-inserted"]').isDisplayed(), { timeout: 8000 });
    const dates = await $$('//li[@classname = "acl-flex--column acl-py--x-small acl-px--xx-large"]');
    for (const date of dates) {
      await date.click();
      await browser.pause(1000);
      const times = await $$('//li[@classname = "acl-py--small acl-px--large"]');
      for (const time of times) {
        await time.click();
        return;
      }
    }
    await $('//acl-icon[@symbol = "chevronright"]').click();
    return this.selectDateAndTime();
  }
}

export default new BookAnAssociate();
