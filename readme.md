# APP-E2E

APP-E2E is testing automation framework built with WebdriverIO-v7(Node.js/typescript) and Cucumber(v8.x.x) BDD framework to test e-commerce domain of 'https://www.Homedepot.ca'.It uses the `chromedriver`(for local machine) NPM package that wraps the ChromeDriver for you. This service uses ChromeDriver to communicate with the browser directly.
It generates `Spec` and `CucumberJs Json Reporter`, report.

## Installation

This framework is tested on **Node v14.17.3** , **Node v16.15.1** and above.  While earlier versions of node may be compatible, but they have not been verified.
`Node.JS:` Install  from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally.

Following is the link for step to step guide for initial setup and installation from scratch:
https://confluence.homedepot.ca/display/HEIGS/How+to+use+the+Framework

### Chromedriver
To run your test on local machine you must have `chromedriver` server up and running to execute any webdriverIO tests, or it will fail fast with an error. To start `chromedriver` automatically it has been added as part of `services: ['chromedriver']`  in the `wdio.shared.conf.ts`.

### Config Files

WebdriverIO uses configuration files to setup and execute tests in specific ways.  The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite.  Config files can be found in the `/src/config/` directory and all end with `*.conf.ts`.  These can be called via the `command line interface`.

### Sauce Integration
`Saucelabs` has three config files with specific codes to run each of them. You need to provide `Saucelabs` credentials once in `.env` file for all `Saucelabs` config file.

#### Parallel testing 

`Saucelabs` specific code to run parallel test on `Chrome`, `Firefox`, and `Microsoft Edge` has been added in `wdio.parallel.sauce.conf.ts` under the /test/config folder. To run parallel test on `Saucelabs` use following command:
````
npm run parallel:sauce
````

#### Firefox testing on Saucelabs
 To run test specifically on `Firefox` in `Saucelabs` specific code has been added to `wdio.firefox.sauce.conf.ts` under the /test/config folder.To run this test on `Saucelabs` use following command:

````
npm run firefox:sauce
````

#### Chrome testing on Saucelabs
To run test specifically on `Chrome` in `Saucelabs` specific code has been added to `wdio.chrome.sauce.conf.ts` under the /test/config folder.To run this test on `Saucelabs` use following command:

````
npm run chrome:sauce
````
### Usage - Running Tests

When you run `npm run test`, the following steps will be executed:

1. **Set Configuration**: The script starts by exporting an environment variable `NODE_TLS_REJECT_UNAUTHORIZED` and setting it to `'0'`. This is often required to disable SSL certificate validation in certain testing environments.

2. **Run Regression Tests on Chrome using Sauce Labs**: The main test command is `npm run chrome:sauce`, which utilizes WebDriverIO and Sauce Labs to run the regression tests.

3. **Specify Tag Expression**: An additional argument `--cucumberOpts.tagExpression='@regressionTest'` is provided to focus the tests only on the ones tagged with `@regressionTest`. This way, we can isolate and execute specific subsets of tests.

4. **Specify Test Specification Directory**: Another argument `--specDir=pip` is passed to indicate that the test specification (Cucumber feature files) should be loaded from the `pip` directory.

By executing the `npm run test` command, you ensure that the regression tests are run on Chrome using Sauce Labs, focusing on the `@regressionTest` tagged tests from the `pip` directory.

Make sure you have the necessary dependencies installed and the Sauce Labs credentials set up correctly to execute the tests seamlessly.

Feel free to explore other test scripts defined in the `package.json` file for more testing options and scenarios.

**Note**: Before running the tests, ensure that you have the correct Sauce Labs credentials and the appropriate Sauce Labs WebDriver configuration in the project. Additionally, make sure you have access to the test environments where the application will be tested.
## Reporters

WebdriverIO uses several different types of test reporters to communicate pass/failure.
### Spec


Test reporter, that prints detailed results to console.


### CucumberJs Json

This reporter will generate a **Cucumber JSON** file for each feature that is being tested. The **JSON** file can be used with whatever report you want to use like here we will use `multiple-cucumber-html-reporter`.

It will also add metadata about the running instance to the feature file and last but not least, it will give you the opportunity to add attachments to the JSON output.

It can be install as dependency either by adding in `package.json` or by following command:
````
npm install wdio-cucumberjs-json-reporter --save-dev
````

It has been added as part of `reporters: ['cucumberjs-json', {
      jsonFolder: './src/reports/cucumber-results/json',
      language: 'en',
    }]`
in all config files. And `afterStep` is added in all config file to attach screenshot after every step.

### Multiple-cucumber-html-reporter
This reporter is added to use **JSON** file generated by **CucumberJs Json**. This reporter will parse that **JSON** file result into beautiful **.HTML** result. 

This reporter can be install either by adding it in `package.json` or by following command:
````
npm install multiple-cucumber-html-reporter
````
It has been import in all `*.config.ts` files and added in\
` onComplete: () => {
    generate({
      jsonDir: './src/reports/cucumber-results/json',
      reportPath: './src/reports/cucumber-results/report',
      openReportInBrowser: false,
    });
  },`\

`openReportInBrowser` can be change to true if you want browser to open automatically after test run with results.

### Develop automation scripts

You can write test by using Cucumber BDD framework. You can choose TypeScript based design pattern.

Refer complete [WebdriverIO v7 API](https://webdriver.io/docs/api.html) methods to write your automation tests.


##### Using Cucumber TypeScript framework

Tests are written in the Cucumber framework using the Gherkin Syntax. More about Gherkin & Cucumber can be found at https://cucumber.io/docs/reference

Tests are place in `*.feature` files in the `src/features/` directory. A typical test will look similar to this:
```
Feature: Verify customer is successfully able to validate the price for the product

  Background: User launches url
    Given the user launches the url

  @cart @regressionTest
  Scenario Outline: User should able to add appliance to shopping cart
     Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    Then the user clicks on the button with html tag "title" as "Search"
    And the user waits for "1" seconds
    Then the user click on "Select"
    Then the user enters text "<sku>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the button with html tag "class" as "acl-action-button"
    Then the user clicks on the "View Details" button at index "2"
    Then the user enters text "<postalCode>" in textbox with placeholder "A1A 1A1"
    Then the user click on "Submit"
    And the user waits for "5" seconds
    Then the user validates if "Earliest Delivery Date" text is visible
    Then the user validates if " Delivery Fee for " text is visible
    Then the user validates if text for " Delivery Fee for " contains "<postalCode>"
    Then the user validates if " Add Installation Including Parts " checkbox is not selected
    Then the user click on " Add Installation Including Parts "
    Then the user validates if " Add Installation Including Parts " checkbox is selected
    Then the user click on "Add To Cart"
    Then the user click on "View Cart"
    Then the user validates the order summary table
    Then the user click on "Checkout Now"
    

    Examples:
      | sku        | postalCode |
      | 123456789  | A1A 1A1    |

  @cart @regressionTest
  Scenario Outline: User should able to add product to shopping cart
    Then the user presses keyboard key "Escape"
    Then the user enters text "<sku>" in textbox with placeholder "What can we help you find?"
    Then the user clicks on the button with html tag "class" as "acl-action-button"
    Then the user click on "Add To Cart"
    Then the user clicks on the "Add To Cart" button at index "2"
    Then the user click on "View Cart"
    Then the user validates the order summary table
    Then the user click on "Checkout Now"

    Examples:
      | sku        | postalCode |
      | 10000000   | A1A 1A1    |


```
## License
UNLICENSED

## Visual Testing Configuration
In-order to utilize image comparison methods "wdio-image-comparison-service" has to be added to the dev dependency in package.json,additional services pertaining to image-comparison has to be added in the config file with necessary options and the types in tsconfig has to be appended with "wdio-image-comparison-service".
It is highly likely to get gyp error and canvas error during initial installation of "wdio-image-comparison-service" when one can try running the below command in terminal followed by an npm i which will sort out any issue
"brew install pkg-config cairo pango libpng jpeg giflib librsvg"
Detailed step by step instruction can be found in below confluence link:
https://confluence.homedepot.ca/display/HEIGS/THDA-351-Implementation+of+Visual+Assertion+using+webdriverio-image-services