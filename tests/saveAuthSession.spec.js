const { test, expect } = require('@playwright/test');

test('Save Google Authenticated Session', async ({ page, context }) => {
    await page.goto('https://accounts.google.com/'); // Open Google login page

    // Enter Google account credentials
    await page.fill('input[type="email"]', 'rsimmons@kanrad.com');
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(3000);
    
    await page.fill('input[type="password"]', 'Makhdumpur@9892');
    await page.click('button:has-text("Next")');

    // Wait for OTP/MFA step (Manually enter OTP)
    console.log("Enter the OTP manually in the browser...");
    await page.waitForTimeout(20000); // Gives time to enter OTP manually

    // Save Google authentication session
    await context.storageState({ path: 'googleAuth.json' });

    console.log('✅ Google authentication state saved!');
});
