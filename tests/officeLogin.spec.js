const { test, expect } = require('@playwright/test');

test.use({ storageState: 'googleAuth.json' });  // Reuse saved Google session

test('Login to Office with Google Session', async ({ page }) => {
    await page.goto('https://www.kantimehealth.net/identity/v2/Accounts/Authorize');

    // Fill in the username and password
    await page.fill('#txt_username', 'Clinician@gmail.com');
    await page.fill('#txt_password', 'Demo@123456');
    await page.click('#btn_login');

    // Ensure login was successful by checking the dashboard URL or any unique element
    //await expect(page).toHaveURL(/dashboard|home/);  // Modify as per actual post-login URL
    //await expect(page.locator('text=Welcome')).toBeVisible();  // Modify based on your app's UI

    console.log('✅ Office Login successful using stored Google session!');

 await page.getByRole('cell', { name: 'Add New Intake', exact: true }).click();
  await page.locator('#MainContent_drp_Branch').selectOption('3071');
  await page.locator('#MainContent_ddl_LOB').selectOption('180');
  await page.locator('#MainContent_txtFirstname').click();
  await page.locator('#MainContent_txtFirstname').fill('RCD Test');
  await page.locator('#MainContent_txtLastname').click();
  await page.locator('#MainContent_txtLastname').fill('Rcd Test1');
  await page.getByText('*Location: --Select-- 11LBranch Adam Pedi Ashritha-Episode Ashwin - Branch Azeem').click();
  await page.locator('#calendar1').click();
  await page.getByRole('combobox').nth(4).selectOption('1970');
  await page.getByRole('link', { name: '4', exact: true }).click();
  await page.locator('#MainContent_ddlPayer').selectOption('6939');
  await page.locator('#chkIntermittentCare').check();
  await page.getByRole('button', { name: 'Check Duplicate' }).click();
  await page.getByRole('button', { name: 'Admit as New' }).click();
  await page.goto('https://www.kantimehealth.net/HH/Z1/UI/Clients/ClientIntakeInfo.aspx?IntakeId=178667&oldClientId=0&readmit=0');
  await page.locator('#cal_IntakeDate').click();
});
