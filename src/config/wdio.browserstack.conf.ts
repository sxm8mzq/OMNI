import { config as sharedConfig } from './wdio.shared.conf.js';

exports.config = {
  services: [
    ['@browserstack/wdio-browserstack-service', { browserstackLocal: true }],
  ],
};

export const config = {
  ...sharedConfig,
  ...{
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    host: 'hub.browserstack.com',
    services: ['browserstack'],

    capabilities: [
      {
        maxInstances: 10,
        browserName: 'chrome',
        browserVersion: 'latest',
        platformName: 'WINDOWS',
        'cjson:metadata': {
          device: 'SauceLabs',
          platform: {
            name: 'Windows',
            version: '10',
          },
        },
        'goog:chromeOptions': {
        },
      },

      {
        maxInstances: 10,
        browserName: 'firefox',
        browserVersion: 'latest',
        platformName: 'WINDOWS',
        'cjson:metadata': {
          device: 'SauceLabs',
          platform: {
            name: 'Windows',
            version: '10',
          },
        },
        'moz:firefoxOptions': {
        },
      },
    ],
  },
};
