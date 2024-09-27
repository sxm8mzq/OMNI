import { Given, Then } from "@wdio/cucumber-framework";
import { scenarioName } from "../config/wdio.chrome.sauce.conf.js";
import { browser, $, $$, expect } from "@wdio/globals";
import skuData from "../resources/data/skuData.json" assert { type: "json" };
import e2eData from "../resources/data/e2eData.json" assert { type: "json" };
import evt from "../pageObjects/evt.js";

Then(/^the user validates if the event "([^"]*)?" has "([^"]*)?"$/,async (obj, value) => {
    await evt.evtTrackWithValue(obj, value);
});

Then(/^the user validates if the event "([^"]*)?" contains "([^"]*)?"$/,async (obj, value) => {
    await evt.evtTrackContainingValue(obj, value);
});

Then(/^the user verifies if the event "([^"]*)?" is not 0$/, async (obj) => {
    await evt.evtTrackWithValueLength(obj);
});

Then(/^the user checks if the event "([^"]*)?" exist and is not null and undefined$/, async (object) => {
    await evt.evtTrack(object);
});

Then(/^the user mock block status of "([^"]*)?"$/, async (uri) => {
    browser.execute("sauce:intercept", {
      url: `${uri}`,
      error: 'AccessDenied'
    });
});

Then(/^the user checks if the event array "([^"]*)?" exist and is not null and undefined$/, async (object) => {
    const convertedEvtParam = await evt.eventTrackingKeyBuilder(object);
    await evt.evtTrack(convertedEvtParam);
});

Then(/^the user checks if the event array "([^"]*)?" has value "([^"]*)?"$/, async (object,value) => {
    const convertedEvtParam = await evt.eventTrackingKeyBuilder(object);
    await evt.evtTrackWithValue(convertedEvtParam,value);
});
