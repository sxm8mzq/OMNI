import axios from 'axios';
import apiData from './resources/data/apiData.json' assert {type: 'json'};

const date = new Date();
const currenttime = parseInt((Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }).format(date)).match(/[\d.,]+/)?.toString(), 10);
let uuid: String;
let flag = 0;
class Apicall {
  async loginApi() {
    try {
      const response = await axios.post(apiData.loginApi.uri, apiData.loginApi.data, {
        headers: {
          'Content-Type': apiData.loginApi.header.content,
        },
      });
      return response.status;
    } catch (error) {
      /* eslint no-console: 'off' */
      console.error(`Api for Login failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async frenchApi() {
    try {
      const response = await axios.get(apiData.frenchApi.uri);
      return response.status;
    } catch (error) {
      console.error(`Api for French failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async searchStoreApi() {
    try {
      const response = await axios.get(apiData.searchStoreApi.uri, {
        params: {
          pageSize: apiData.searchStoreApi.pageSize,
          currentPage: apiData.searchStoreApi.currentPage,
          query: apiData.searchStoreApi.query,
          fields: apiData.searchStoreApi.fields,
          lang: apiData.searchStoreApi.lang,
        },
      });
      return response.status;
    } catch (error) {
      console.error(`Api for Search store failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async changeStorePopupApi() {
    try {
      const response = await axios.get(apiData.changeStorePopupApi.uri, {
        params: {
          user: apiData.changeStorePopupApi.user,
          lang: apiData.changeStorePopupApi.lang,
        },
      });
      const popupJson = JSON.stringify(response.data);
      const popupModalIndex = popupJson.indexOf('Modal');
      const popupModalIndexPresent = String(
        popupJson
          .slice(popupModalIndex + 7)
          .replace('}', '')
          .replace('"', '')
          .toString(),
      );
      if (popupModalIndexPresent === 'false') {
        console.log('Api for Change Store Popup failed with popupModalpresent as :', popupModalIndexPresent);
        return (flag += 1);
      }
      return response.status;
    } catch (error) {
      console.error(`Api for Change Store Popup failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async createCartApi() {
    try {
      const response = await axios.post(apiData.createCartApi.uri, {
        params: {
          customerId: apiData.createCartApi.customerId,
          jobDescription: apiData.createCartApi.jobDescription,
          onlineOrderType: apiData.createCartApi.onlineOrderType,
          orderBalanceDue: apiData.createCartApi.orderBalanceDue,
          orderId: apiData.createCartApi.orderId,
          orderIdLink: apiData.createCartApi.orderIdLink,
          orderLastUpdatedAt: apiData.createCartApi.orderLastUpdatedAt,
          repriced: apiData.createCartApi.repriced,
          source: apiData.createCartApi.source,
          status: apiData.createCartApi.status,
          storeId: apiData.createCartApi.storeId,
        },
      });
      const uuidJson = JSON.stringify(response.data);
      const uuidIndex = uuidJson.indexOf('id');
      uuid = uuidJson
        .slice(uuidIndex + 5)
        .replace('}', '')
        .replace('"', '');
      return response.status;
    } catch (error) {
      console.error(`Api for Create cart failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async updateCartApi() {
    try {
      const response = await axios.patch(apiData.updateCartApi.uri + uuid, {
        params: {
          appliancePostalCode: apiData.updateCartApi.appliancePostalCode,
          shippingPostalCode: apiData.updateCartApi.shippingPostalCode,
          storeDeliveryPostalCode: apiData.updateCartApi.storeDeliveryPostalCode,
          storeId: apiData.updateCartApi.storeId,
          updated: apiData.updateCartApi.updated,
        },
      });
      return response.status;
    } catch (error) {
      console.error(`Api for Updating cart failed with following error: ${error}`);
    }
    return (flag += 1);
  }

  async addToCartSthApi() {
    try {
      const response = await axios.post(`${apiData.addToCartSthApi.uri + uuid}/entries`, {
        fulfillment: {
          type: apiData.addToCartSthApi.fulfillment.type,
          typeId: apiData.addToCartSthApi.fulfillment.typeId,
        },
        sku: apiData.addToCartSthApi.sku,
        quantity: apiData.addToCartSthApi.quantity,
        store: apiData.addToCartSthApi.store,
        uom: apiData.addToCartSthApi.uom,
        source: apiData.addToCartSthApi.source,
      });
      const quantityAddedJson = JSON.stringify(response.data);
      const quantityAddedIndex = quantityAddedJson.indexOf('Added');
      const quantityAdded = Number(
        quantityAddedJson
          .slice(quantityAddedIndex + 7)
          .split(',')
          .slice(0, 1)
          .toString(),
      );
      if (quantityAdded !== 1) {
        console.log('Api for STH Add to cart failed with quantity:', quantityAdded, 'not equal to 1');
        return (flag += 1);
      }
      return response.status;
    } catch (error) {
      console.error(`Api for STH Add to cart failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async addToCartBossApi() {
    try {
      const response = await axios.post(`${apiData.addToCartBossApi.uri + uuid}/entries`, {
        fulfillment: {
          type: apiData.addToCartBossApi.fulfillment.type,
          typeId: apiData.addToCartBossApi.fulfillment.typeId,
        },
        sku: apiData.addToCartBossApi.sku,
        quantity: apiData.addToCartBossApi.quantity,
        store: apiData.addToCartBossApi.store,
        uom: apiData.addToCartBossApi.uom,
        source: apiData.addToCartBossApi.source,
      });
      const quantityAddedJson = JSON.stringify(response.data);
      const quantityAddedIndex = quantityAddedJson.indexOf('Added');
      const quantityAdded = Number(
        quantityAddedJson
          .slice(quantityAddedIndex + 7)
          .split(',')
          .slice(0, 1)
          .toString(),
      );
      if (quantityAdded !== 1) {
        console.log('Api for BOSS Add to cart failed with quantity:', quantityAdded, 'not equal to 1');
        return (flag += 1);
      }
      return response.status;
    } catch (error) {
      console.error(`Api for BOSS Add to cart failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async addToCartExpressSd4Api() {
    try {
      const response = await axios.post(`${apiData.addToCartExpressSd4Api.uri + uuid}/entries`, {
        fulfillment: {
          type: apiData.addToCartExpressSd4Api.fulfillment.type,
          typeId: apiData.addToCartExpressSd4Api.fulfillment.typeId,
        },
        sku: apiData.addToCartExpressSd4Api.sku,
        quantity: apiData.addToCartExpressSd4Api.quantity,
        store: apiData.addToCartExpressSd4Api.store,
        uom: apiData.addToCartExpressSd4Api.uom,
        source: apiData.addToCartExpressSd4Api.source,
      });
      const quantityAddedJson = JSON.stringify(response.data);
      const quantityAddedIndex = quantityAddedJson.indexOf('Added');
      const quantityAdded = Number(
        quantityAddedJson
          .slice(quantityAddedIndex + 7)
          .split(',')
          .slice(0, 1)
          .toString(),
      );
      if (quantityAdded !== 1) {
        console.log('Api for Express Same Day Delivery Before 4 Add to cart failed with quantity:', quantityAdded, 'not equal to 1');
        return (flag += 1);
      }
      return response.status;
    } catch (error) {
      console.error(`Api for Express Same Day Delivery Before 4 Add to cart failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async addToCartExpressScdApi() {
    try {
      const response = await axios.post(`${apiData.addToCartExpressScdApi.uri + uuid}/entries`, {
        fulfillment: {
          type: apiData.addToCartExpressScdApi.fulfillment.type,
          typeId: apiData.addToCartExpressScdApi.fulfillment.typeId,
        },
        sku: apiData.addToCartExpressScdApi.sku,
        quantity: apiData.addToCartExpressScdApi.quantity,
        store: apiData.addToCartExpressScdApi.store,
        postalCode: apiData.addToCartExpressScdApi.postalCode,
        uom: apiData.addToCartExpressScdApi.uom,
        source: apiData.addToCartExpressScdApi.source,
      });
      const quantityAddedJson = JSON.stringify(response.data);
      const quantityAddedIndex = quantityAddedJson.indexOf('Added');
      const quantityAdded = Number(
        quantityAddedJson
          .slice(quantityAddedIndex + 7)
          .split(',')
          .slice(0, 1)
          .toString(),
      );
      if (quantityAdded !== 1) {
        console.log('Api for Express Schedule Delivery Add to cart failed with quantity:', quantityAdded, 'not equal to 1');
        return (flag += 1);
      }
      return response.status;
    } catch (error) {
      console.error(`Api for Express Schedule Delivery Add to cart failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async addToCartBopisApi() {
    try {
      const response = await axios.post(`${apiData.addToCartBossApi.uri + uuid}/entries`, {
        fulfillment: {
          type: apiData.addToCartBopisApi.fulfillment.type,
          typeId: apiData.addToCartBopisApi.fulfillment.typeId,
        },
        sku: apiData.addToCartBopisApi.sku,
        quantity: apiData.addToCartBopisApi.quantity,
        store: apiData.addToCartBopisApi.store,
        postalCode: apiData.addToCartBopisApi.postalCode,
        uom: apiData.addToCartBopisApi.uom,
        source: apiData.addToCartBopisApi.source,
      });
      const quantityAddedJson = JSON.stringify(response.data);
      const quantityAddedIndex = quantityAddedJson.indexOf('Added');
      const quantityAdded = Number(
        quantityAddedJson
          .slice(quantityAddedIndex + 7)
          .split(',')
          .slice(0, 1)
          .toString(),
      );
      if (quantityAdded !== 1) {
        console.log('Api for BOPIS Add to cart failed with quantity:', quantityAdded, 'not equal to 1');
        return (flag += 1);
      }
      return response.status;
    } catch (error) {
      console.error(`Api for BOPIS Add to cart failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async addToCartApplianceApi() {
    try {
      const response = await axios.post(`${apiData.addToCarApplianceApi.uri + uuid}/entries`, {
        fulfillment: {
          type: apiData.addToCarApplianceApi.fulfillment.type,
          typeId: apiData.addToCarApplianceApi.fulfillment.typeId,
        },
        sku: apiData.addToCarApplianceApi.sku,
        quantity: apiData.addToCarApplianceApi.quantity,
        store: apiData.addToCarApplianceApi.store,
        postalCode: apiData.addToCarApplianceApi.postalCode,
        uom: apiData.addToCarApplianceApi.uom,
        source: apiData.addToCarApplianceApi.source,
      });
      const quantityAddedJson = JSON.stringify(response.data);
      const quantityAddedIndex = quantityAddedJson.indexOf('Added');
      const quantityAdded = Number(
        quantityAddedJson
          .slice(quantityAddedIndex + 7)
          .split(',')
          .slice(0, 1)
          .toString(),
      );
      if (quantityAdded !== 1) {
        console.log('Api for Appliance Add to cart failed with quantity:', quantityAdded, 'not equal to 1');
        return (flag += 1);
      }
      return response.status;
    } catch (error) {
      console.error(`Api for Appliance Add to cart failed with following error: ${error}`);
      return (flag += 1);
    }
  }

  async apiTest() {
    await this.loginApi();
    await this.frenchApi();
    await this.searchStoreApi();
    await this.changeStorePopupApi();
    await this.createCartApi();
    await this.updateCartApi();
    await this.addToCartSthApi();
    await this.addToCartBopisApi();
    await this.addToCartBossApi();
    await this.addToCartExpressScdApi();
    await this.addToCartApplianceApi();
    if (currenttime < 16 && currenttime >= 8) {
      await this.addToCartExpressSd4Api();
    }
    return flag;
  }
}

export default new Apicall();
