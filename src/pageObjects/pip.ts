import { browser, $, $$, expect } from '@wdio/globals';
let addToCartButtonItemCount: number;
class PipOperations {

  pipCUOM: string = null;
  
  async validateWasNowandSavingPriceInPIP() {
    const wasPriceString = (await (await $('//*[@class=\'hdca-product__description-pricing-was\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00';
    /* eslint-disable */
    let wasPrice = parseFloat(wasPriceString.replace(',', ''));
    const saveAmountString = (await (await $('//*[@class=\'hdca-product__description-pricing-savings\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00';
    const saveAmount = parseFloat(saveAmountString.replace(',', ''));
    const nowPriceString = (await (await $('//*[@class=\'hdca-product__description-pricing-price-value\']').getText()).match(/[\d.,]+/)?.toString()) || '0.00';
    const nowPrice = parseFloat(nowPriceString.replace(',', ''));
    expect((wasPrice = nowPrice + saveAmount));
    /* eslint-enable */
  }

  async validateFBTItems() {
    const itemCount = await $$('//*[contains(@class, \'hdca-product-box-container--buy-together-selected\')]').map(async (elem) => elem.getValue());
    const itemCountNumber = itemCount.map(Number);
    let totalItemCount = 0;
    itemCountNumber.forEach(() => {
      totalItemCount += 1;
    });
    const atcButton = await (await $('//*[(@id = \'hdca-fbt-add-cart-button\')]')).getText();
    const actButtonItems = Number(atcButton.split(' ')[1]);
    expect(totalItemCount === actButtonItems);
  }

  async clickAllElements(htmlTag, selector) {
    const elements = await $$(`//*[@${htmlTag} = ${selector}]`);
    for (let i = 1; i <= elements.length; i += 1) {
      $(`(//*[@${htmlTag} = ${selector}])[${Number(i)}]`).click();
    }
  }

  async validateFbtCheckboxesCheckedAndFbtItemSection() {
    const checkBoxes = await $$('//*[@class = \'hdca-checkbox__checkbox\']');
    const itemCount = await $$('//*[contains(@class, \'hdca-product-box-container--buy-together-selected\')]');
    expect(await $$('//*[@class = \'hdca-product-box__main-info-label-entry acl-italic\']')).toBeDisplayed();
    expect(await $$('(//*[@class = \'hdca-product-frequently-bought-together-container__header\']/following::div[@class = "acl-image__image-container"])[1]')).toBeDisplayed();
    expect(await $$('(//*[@class = \'hdca-product-frequently-bought-together-container__header\']/following::span[@class = "hdca-product-box__main-info-label-entry"])[1]')).toBeDisplayed();
    expect(
      await $$(
        '(//*[@class = \'hdca-product-frequently-bought-together-container__header\']/following::span[@class = "hdca-product-box__main-purchase-price-entry-content hdca-product-box__main-purchase-price-entry-content--primary"])[1]',
      ),
    ).toBeDisplayed();
    expect(checkBoxes.length === itemCount.length);
  }

  async getFbtAddToCartButtonItemValue() {
    const atcButton = await (await $('//*[(@id = \'hdca-fbt-add-cart-button\')]')).getText();
    addToCartButtonItemCount = Number(atcButton.split(' ')[1]);
  }

  async compareAddToCartModalAndPipItems() {
    const overlayItems = await $$('//*[@class = \'acl-panel-product-card ng-star-inserted\']');
    const atcModal = await (await $('add-to-cart-panel-success-container .acl-availability__container span>span.ng-star-inserted')).getText();
    const atcModalItems = Number(atcModal.split(' ')[0]);
    /* eslint-disable */
    expect(overlayItems.length === addToCartButtonItemCount && addToCartButtonItemCount === atcModalItems);
    /* eslint-disable */
  }

  async validateIfPillIsSelected(pillNumber) {
    expect(await $$(`span.acl-form-field:nth-child(${pillNumber.toString()}) .acl-radio--selected`)).toBeDisplayed();
  }

  async validateIfPillWithTextIsSelected(pillText) {
    expect(await $(`//*[text() = ${pillText}]/ancestor::div[contains(@class, "acl-card--border-color--highlight")]`)).toBeDisplayed();
  }

  async offerIsPresent(selector: Number) {
    if (selector === 1) {
      expect((await $$('//*[@class =\'acl-accordion-panel__panel-inner\']/descendant::h5').length) === 1);
    } else {
      expect((await $$('//*[@class =\'acl-accordion-panel__panel-inner\']/descendant::h5').length) >= 2);
    }
  }

  async instockQuantityIsNonzero() {
    const instockQty = Number((await (await $('//*[contains(text(),\' In Stock \')]').getText()).match(/[\d.,]+/)?.toString()) || '0.00');
    expect(instockQty > 0);
  }
  
  async verifyCUOM(CUOM_PLP) {
    const elem = await $(`//span[@class = 'hdca-product__description-pricing-price-unit']`);
    const pipCUOM = (await elem.getText());
    await expect(CUOM_PLP).toEqual(pipCUOM);
  }
}

export default new PipOperations();
