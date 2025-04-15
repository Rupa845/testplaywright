const { BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const EmailValidationPage = require('../../pages/EmailValidationPage.js');
const GoogleLoginPage = require('../../pages/GoogleLoginPage.js');
const KantimeLoginPage = require('../../pages/KantimeLoginPage.js');

setDefaultTimeout(120000); // Increase timeout for login process

let browser, context, page, officePage;
const storageFile = path.resolve('storageState.json'); // File to store session

BeforeAll(async function () {
    console.log("🚀 Launching browser...");
      if (!this.browser) {
        this.browser = await chromium.launch({ headless: false });
        
    }

    // ✅ Check if session exists
    if (fs.existsSync(storageFile)) {
        console.log("🔄 Using saved session...");
        this.context = await this.browser.newContext({ storageState: storageFile });
        
    } else {
        console.log("🔑 No session found, performing fresh login...");

        
        
        this.googleLoginPage = new GoogleLoginPage(this.page);
        await this.googleLoginPage.loginToGoogle('rsimmons@kanrad.com', 'Makhdumpur@9892');
        await this.page.waitForNavigation({ waitUntil: 'networkidle' });

        console.log("✅ Google login successful!");

        //this.officePage = await this.context.newPage();
        //await this.officePage.goto('https://www.kantimehealth.net/identity/v2/Accounts/Authorize', { waitUntil: 'networkidle' });

        //this.kantimeLoginPage = new KantimeLoginPage(this.officePage);
        //await this.kantimeLoginPage.login('Clinician@gmail.com', 'Demo@123456');

        //this.emailValidationPage = new EmailValidationPage(this.officePage);
       // await this.emailValidationPage.enterEmail('rsimmons@kanrad.com');

        //console.log("✅ Kantime login successful!");

        // ✅ Save session state after login
        await this.context.storageState({ path: storageFile });
        console.log("💾 Session saved for future logins!");
    }
this.page = await this.context.newPage();
    //this.browser = browser;
    //this.context = context;
    //this.page = page;
});

//AfterAll(async function () {
  //  console.log("🛑 Closing browser...");
   // await browser.close();
   // console.log("✅ Browser closed after tests.");
//});
