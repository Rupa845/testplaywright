// @ts-check
const {  devices } = require('@playwright/test');
const config ={

  testDir: './tests',
 
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : 'chromium'
  },


};
module.exports = config;

