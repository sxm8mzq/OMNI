import { browser, $, $$, expect } from '@wdio/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
class HomeServices {

  async uploadMockImage(){
    const input = await $(`//*[@id = "uploadImg"]`);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '../resources/images/mockImage.png');
    const remoteFilePath = await browser.uploadFile(filePath);
    browser.execute(function(){
      document.getElementById('uploadImg').style.display = 'block'
    });
    input.setValue(remoteFilePath);
  }

}

export default new HomeServices();
