import { browser, $, $$, expect } from '@wdio/globals';
class Plp {

  plpCUOM: string = null;

  async verifyMaxProducts() {
    const count = 40;
    const productsCount = await $$('//article[contains(@class, \'acl-product-card acl-product-card--is-grid\')]').length;
    const paginationIsPresent = await $('//acl-pagination[@classname = \'acl-mt--small\']').isDisplayed();
    if (paginationIsPresent === true) {
      await expect(productsCount).toEqual(count);
    }
  }

  async verifyChevronStatus(selector, status) {
    if (status === 'Down') {
      await expect($(`//div[text() = ${selector}]/ancestor::button[@class = "acl-accordion-panel__header-button"]//*[name()='use' and @*="#plus"]`)).toBeDisplayed();
    } else {
      await expect($(`//div[text() = ${selector}]/ancestor::button[@class = "acl-accordion-panel__header-button"]//*[name()='use' and @*="#minus"]`)).toBeDisplayed();
    }
  }

  async verifyCssProperty(styleProp, htmlTag, selector, expCss) {
    const elem = await $(`//*[contains(@${htmlTag}, ${selector})]`);
    const actualCss = await elem.getCSSProperty(styleProp);
    await expect(actualCss.value).toEqual(expCss);
  }

  async getCUOMText(index) {
    const elem = await $(`(//span[@class = 'acl-product-card__price-unit ng-star-inserted'])[${Number(index)}]`);
    this.plpCUOM = (await elem.getText());
  }
}
export default new Plp();
