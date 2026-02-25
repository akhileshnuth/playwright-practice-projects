import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.guru99.com');
  
  await page.getByText('Bank Project').click();
});


// valid username and password
test('Login with valid username and password', async ({ page }) => {

  await page.locator('[name="uid"]').fill('mngr653719');
  await page.locator('[name="password"]').fill('Unajaty');

  await page.locator('[name="btnLogin"]').click();

  // successful login
  await expect(page).toHaveURL(/Managerhomepage/);

});


// Invalid username and valid password
test('Login with invalid username and valid password', async ({ page }) => {

  await page.locator('[name="uid"]').fill('akhil@1234');
  await page.locator('[name="password"]').fill('Unajaty');

  // Expected login page
  await expect(page).toHaveURL(/index.php/);

});


// valid username and invalid password
test('Login with valid username and invalid password', async ({ page }) => {

  await page.locator('[name="uid"]').fill('mngr653719');
  await page.locator('[name="password"]').fill('@123456');

  await page.locator('[name="btnLogin"]').click();

  await expect(page).toHaveURL(/index.php/);
});


// Invalid username and invalid password
test('Login with invalid username and invalid password', async ({ page }) => {

  await page.locator('[name="uid"]').fill('akhi1234');
  await page.locator('[name="password"]').fill('@123456');

  await page.locator('[name="btnLogin"]').click();

  await expect(page).toHaveURL(/index.php/)

});