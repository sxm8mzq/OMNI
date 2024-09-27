import { browser, $, $$, expect } from "@wdio/globals";
class SelectDateForToolRental {
  async selectDateAndTime() {
    await $(`//*[text()='Date']`).click();
    const dates = await $$('//*[@class = "acl-date-picker-calender__date acl-date-picker-calender__date--is-selectable ng-star-inserted"]');
    for (const date of dates) {
      await date.click();
      await $(`//*[text() = 'Done' or text() = 'Terminé']`).click();
      await $(`//*[text() = 'Time' or text() = 'Heure']`).click();
      await browser.keys("Space");
      (await $(`//*[contains(text(), ' AM') or contains(text(), ' PM')]`)).click();
      await browser.pause(2000);
      const container = await (await $("//pick-up-locations-component")).isDisplayed();
      if ((await container) === true) {
        break;
      } else {
        await $(`//*[text()='Date']`).click();
      }
    }
  }
}

export default new SelectDateForToolRental();
