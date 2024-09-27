/* eslint-disable */
import { Options } from '@wdio/types';
/* eslint-enable */
import 'dotenv/config';
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import SlackReporter from '@moroo/wdio-slack-reporter';
import { generate } from 'multiple-cucumber-html-reporter';
import { join } from 'path';
import { browser, $, $$, expect } from '@wdio/globals';
import pkg from 'fs-extra';
const { removeSync } = pkg;



let scenarioName: any;
const specDir = process.argv.pop().split('=')[1];

export const config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },
  specs: [
    `${process.cwd()}/src/features/${specDir || 'e2e'}/**/*.feature`],
  exclude: [],
  maxInstances: 35,
  capabilities: [ 
    { maxInstances: 5, 
      browserName: "chrome", 
      acceptInsecureCerts: true, 
      browserVersion: "122.0.6261.39", 
    },
  ],
  logLevel: 'error',
  bail: 0,
  baseUrl: 'https://www.qp-gcp.homedepot.ca/en/home.html',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [ 'chromedriver'],
  framework: 'cucumber',
  reporters: [
    'spec',
    [
      'cucumberjs-json',
      {
        jsonFolder: `${process.cwd()}/src/reports/cucumber-results/json`,
        language: 'en',
      },
    ],
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
  cucumberOpts: {
    require: [`${process.cwd()}/src/stepDefinitions/**/*.ts`],
    backtrace: false,
    requireModule: ['@babel/register'],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
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
