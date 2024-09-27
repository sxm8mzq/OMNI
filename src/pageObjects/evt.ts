import { faker } from "@faker-js/faker";
import { browser, $, $$, expect } from "@wdio/globals";

class Evt {
  valuesInsideBracketsRegex = /\[([^\]]+)\]/g;
  valuesInsideBrackestSingleRegex = /\[([^\]]+)\]/;

  async evtTrackWithValueLength(obj) {
    const objects = await browser.execute(`return ${obj}`);
    await expect(objects).not.toBeUndefined();
    await expect(Number(objects)).not.toEqual(0);
  }
  async evtTrackWithValue(obj, value) {
    obj = await this.getElementArrayKey(String(obj));
    const objects = await browser.execute(`return ${obj}`);
    await expect(objects).not.toBeUndefined();
    const actualResult = String(objects).toLowerCase();
    await expect(actualResult).toEqual(value);
  }
  async evtTrackContainingValue(obj, value) {
    const objects = await browser.execute(`return ${obj}`);
    await expect(objects).not.toBeUndefined();
    const actualResult = String(objects).toLowerCase();
    await expect(actualResult).toContain(value);
  }

  async evtTrack(obj) {
    obj = await this.getElementArrayKey(String(obj));
    const objects = await browser.execute(`return ${obj}`);
    await expect(objects).not.toBeNull();
    await expect(objects).not.toBeUndefined();
  }

  async getElementArrayKey(key: string) {
    const isAnArray = key.includes("eventArray") ? true : false;
    
    if (!isAnArray) {
      return key;
    }
    let objectKey = "";
    var eventArrayJsonKey = "";
    var eventArraySubElement = "";
    const arrayEvents = key.split("eventArray");

    eventArrayJsonKey = arrayEvents[0]+"eventArray";
    eventArraySubElement = arrayEvents[1];
    

    const objectEvenArray = await browser.execute(
      `return ${eventArrayJsonKey}`
    );
    const jsonEventArray = JSON.parse(JSON.stringify(objectEvenArray));
    const jsonEventArrayKeys = Object.keys(jsonEventArray);

    if (jsonEventArrayKeys.length === 1) {
      objectKey = jsonEventArrayKeys[0];
      eventArraySubElement = eventArraySubElement.indexOf("[") === 0 ? eventArraySubElement.replace(this.valuesInsideBrackestSingleRegex, "[" + objectKey + "]") : `[${objectKey}]`.concat(eventArraySubElement);
    } else {
      objectKey = await this.getEventArrayKeyFromEventArrayList(key, jsonEventArrayKeys, jsonEventArray);
      eventArraySubElement = eventArraySubElement.replace(this.valuesInsideBrackestSingleRegex, "["+objectKey+"]");
    }
   
    const elementArrayObjectFinderKey = eventArrayJsonKey + eventArraySubElement;
    
    return elementArrayObjectFinderKey;
  }

  async getEventArrayKeyFromEventArrayList(eventArrayKey: string, jsonEventArrayKeys,jsonEventArray) {
    let eventArrayTimeStampKey;
    const eventArrayTypeKeys = await  this.extractValuesBetweenBrackets(eventArrayKey);
    let eventArrayTypeKeysArray = []

    for (const value of eventArrayTypeKeys.values()) {
      eventArrayTypeKeysArray.push(value.split(":"));
    }
  
    const expectedKey = eventArrayTypeKeysArray[0][0].trim();
    const expectedValue = eventArrayTypeKeysArray[0][1].trim().replaceAll("'","").replaceAll("\"","");

    for (var index = 0; jsonEventArrayKeys.length; index++) {
      const currentEventArrayKey = jsonEventArrayKeys[index];
      const currentEventArrayObject = jsonEventArray[currentEventArrayKey];
      if (currentEventArrayObject[expectedKey] != null && currentEventArrayObject[expectedKey] === expectedValue) {
        eventArrayTimeStampKey = currentEventArrayKey;
        break;
      }
    }
    return eventArrayTimeStampKey;
  }

  async extractValuesBetweenBrackets(params: string) {
    var results = new Set([]);

    var matchKeys = params.match(this.valuesInsideBracketsRegex);
    matchKeys.forEach((matchKey) => {results.add(matchKey.replace(/\[|\]/g, ""));});
    return results;
  }

  async getIndexFromEventObject(jsonKey: string,jsonValue: string,eventKey: string) {
    const objectEventArray = await browser.execute(`return ${eventKey}`);
    await expect(objectEventArray).not.toBeNull();
    const eventArrayJSONObject = JSON.parse(JSON.stringify(objectEventArray));
    var currentIndex = -1;
    for (var index = 0; index < eventArrayJSONObject.length; index++) {
      const currentJsonObject = eventArrayJSONObject[index];
      if (currentJsonObject[jsonKey] === jsonValue) {
        currentIndex = index;
        break;
      }
    }
    return currentIndex;
  }

  async eventTrackingKeyBuilder(params: string) {
    const eventValueKeys = await this.extractValuesBetweenBrackets(params);
    var eventTrackingKey = "";
    const eventStringList = params.split(this.valuesInsideBracketsRegex);

    for (var index = 0; index < eventStringList.length; index++) {
      var currEnvtstring = eventStringList[index];
      if (eventValueKeys.has(currEnvtstring)) {
        const keyValuePair = currEnvtstring.replaceAll("'", "").split(":");
        var jsonIndex = await this.getIndexFromEventObject(keyValuePair[0].trim(),keyValuePair[1].trim(),eventTrackingKey);
        eventTrackingKey += `[${jsonIndex}]`;
      } else {
        eventTrackingKey += currEnvtstring;
      }
    }
    return eventTrackingKey;
  }

}

export default new Evt();
