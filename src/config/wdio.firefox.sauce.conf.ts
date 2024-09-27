import cucumberJson from 'wdio-cucumberjs-json-reporter';
import SlackReporter from '@moroo/wdio-slack-reporter';
import { config as sharedConfig } from './wdio.shared.conf.js';
import { browser, $, $$, expect } from '@wdio/globals'
import { generate } from 'multiple-cucumber-html-reporter';
import pkg from 'fs-extra';
const { removeSync } = pkg;

let scenarioName: any;
const specName = process.argv[4]?.split('@')[1]?.split(' ')[0] || 'regressionTest';
export const config = {
  ...sharedConfig,
  ...{
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    sauceConnect: true,
    region: 'us',
    services: ['sauce'],
    channel: 'desktop',
    setWindowRect: true,
    pageLoadStrategy: 'normal',
    capabilities: [
      {
        maxInstances: 45,
        browserName: 'firefox',
        browserVersion: 'latest',
        platformName: 'Windows 10',
        'cjson:metadata': {
          device: 'SauceLabs',
          platform: {
            name: 'Windows',
            version: '10',
          },
        },
        'sauce:options': {
          build: `app-e2e ${specName} : ${Date()}`,
          screenResolution: '2560x1600',
        },
      },
    ],
    timeouts: {
      script: 20000,
      pageLoad: 400000,
      implicit: 7000,
    },
  },
  reporters: [
    'spec',
    ['cucumberjs-json', {
      jsonFolder: `${process.cwd()}/src/reports/cucumber-results/json`,
      language: 'en',
    }],
    [
      SlackReporter,
      {
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/services/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',
        },
        title: 'Test Summary Notification',
        notifyTestStartMessage: false,
        notifyTestFinishMessage: false,
        attachFailedCase: true,
      },
    ],
    ['allure', {
      outputDir: `${process.cwd()}/src/reports/allure-results`,
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
  onPrepare: async () => {
    removeSync(`${process.cwd()}/src/reports/`);
    // await OnPrepare.onPrepare();
  },
  onComplete: () => {
    generate({
      jsonDir: `${process.cwd()}/src/reports/cucumber-results/json`,
      reportPath: `${process.cwd()}/src/reports/cucumber-results/report`,
      openReportInBrowser: false,
      reportName: 'HomeDepot Canada ECom Regression Report',
      displayDuration: true,
    });
  },
  beforeScenario(scenario: any) {
    scenarioName = scenario.pickle.name;
  },
  afterScenario: async () => {
    await browser.deleteAllCookies();
  },
  afterStep: async () => {
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
  },
};
export { scenarioName };
