const axios = require('axios');
const gulp = require('gulp');
const run = require('gulp-run');

const { parallel } = require('gulp');
const apiData = require('./src/resources/data/apiData.json');

let flag = 0;

async function loginApi() {
  try {
    const response = await axios.post(apiData.loginApi.uri, apiData.loginApi.data, {
      headers: {
        'Content-Type': apiData.loginApi.header.content,
      },
    });
    return console.log('loginApi Status: ', response.status);
  } catch (error) {
    /* eslint no-console: 'off' */
    console.error(`Api for Login failed with following error: ${error}`);
    return (flag += 1);
  }
}

async function frenchApi() {
  try {
    const response = await axios.get(apiData.frenchApi.uri);
    return console.log('frenchApi Status: ', response.status);
  } catch (error) {
    console.error(`Api for French failed with following error: ${error}`);
    return (flag += 1);
  }
}

async function searchStoreApi() {
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
    return console.log('searchStoreApi Status: ', response.status);
  } catch (error) {
    console.log(`Api for Search store failed with following error: ${error}`);
    return (flag += 1);
  }
}

async function changeStorePopupApi() {
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
    return console.log('changeStorePopupApi Status: ', response.status);
  } catch (error) {
    console.log(`Api for Change Store Popup failed with following error: ${error}`);
    return (flag += 1);
  }
}

gulp.task('compile-code', async () => { run('npm run lint').exec(); });

gulp.task('fix-lint', async () => { run('npm run fix-lint').exec(); });

gulp.task('eslint', async () => { run('npm run eslint').exec(); });

gulp.task('page-obj', async () => { run('npm run lint-page-obj').exec(); });

gulp.task('step-def', async () => { run('npm run lint-step-def').exec(); });

gulp.task('e2e', gulp.parallel('compile-code', 'fix-lint', 'eslint', 'page-obj', 'step-def'));

exports.default = parallel(loginApi, frenchApi, searchStoreApi, changeStorePopupApi);
