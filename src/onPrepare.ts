import SevereServiceError from 'webdriverio/build/utils/SevereServiceError';
import apitesting from './api';

class OnPrepare {
  async onPrepare() {
    if (process.env.Env.toUpperCase() === 'QP') {
      if (await apitesting.apiTest() >= 1) {
        throw new SevereServiceError('API TEST FAIL REGRESSION RUN ABORTED');
      } else if (await apitesting.apiTest() === 0) {
        /* eslint no-console: 'off' */
        console.info('ENVIRONMENT GOOD TO TEST');
      }
    } else if (process.env.Env.toUpperCase() === 'QA') {
      console.info('ENVIRONMENT GOOD TO TEST IN QA');
    } else {
      throw new SevereServiceError('Please select QA or QP env');
    }
  }
}

export default new OnPrepare();
