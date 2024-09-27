import { browser, $, $$, expect } from '@wdio/globals';
class MyAccount {
  async shippingAddressesExists() {
    const shippingAddresses = await $('//*[text() = \'Edit Addresses\' or text() = \'Modifier l’adresse\']').isDisplayed();
    if (shippingAddresses) {
      await $('//*[text() = \'Edit Addresses\' or text() = \'Modifier l’adresse\'] ').click();
      const removeAddresses = await $$('//*[text()= \'Delete\' or text()= \'Supprimer\']');
      for (let i = 0; i < removeAddresses.length; i += 1) {
        await removeAddresses[i].click();
        await $('//*[text() = \'Yes\' or text() = \'Oui\']').click();
        await browser.pause(2000);
      }
    }
  }

  async emptyWishlist() {
    await $('(//*[contains(@data-title, "Hi") or contains(@data-title, "Salut")])').click();
    await $("//*[text() = 'Log Out' or text() = 'Fermer la session']").waitForDisplayed({ timeout: 10000 });
    await $("//*[text() = 'List' or text() = 'liste']").click();
    await (await $("//*[text()=' My List ' or text() =' Ma liste ']")).waitForDisplayed({ timeout: 10000 });
    const wishlistItemsIsEmpty = await $('//*[@class = "wish-list-product acl-display--flex acl-flex--row acl-mb--large"]').isDisplayed();

    if (wishlistItemsIsEmpty === true) {
      const wishlistItemsTrash = await $$('//span[text() = "Add To Cart" or text() = "Ajouter au panier"]/ancestor::div[@class = "acl-display--flex acl-flex--row acl-align-items--center"]/div/acl-icon[@symbol = "trash"]');
      for (let i = 0; i < wishlistItemsTrash.length; i += 1) {
        await wishlistItemsTrash[i].click();
        await $("//*[text() = 'Remove' or  @alt = 'Supprimer' ]").click();
      }
    }
  }
}
export default new MyAccount();
                                                                                                                                                                               