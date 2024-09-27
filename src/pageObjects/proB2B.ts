import { Key } from "webdriverio";

class proB2B {
  phoneNumber: string;

  generateRandomPhoneNumber(extension: string) {
    this.phoneNumber = extension + Math.floor(100000 + Math.random() * 900000).toString();
  }

  async enterRandomPhoneNumberInTextbox(selector: string) {
    await $(`//*[contains(text(),${selector})]/following::input[1]`).click();
    await browser.action("key").down(Key.Ctrl).down("a").pause(2).up(Key.Ctrl).up("a").perform();
    await $(`//*[contains(text(),${selector})]/following::input[1]`).addValue(this.phoneNumber);
  }
}

export default new proB2B();
