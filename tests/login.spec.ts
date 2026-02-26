import { test, expect, type Page, type Dialog } from '@playwright/test';

const VALID_USERNAME = 'mngr653719';
const VALID_PASSWORD = 'Unajaty';

const INVALID_USERNAME = 'akhil@1234';
const INVALID_PASSWORD = '@123456';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.guru99.com');
  await expect(page.locator("//a[text()='Demo Site']")).toBeVisible();
  await page.locator("//a[text()='Bank Project']").click();
});

async function login(page: Page, username: string, password: string) {

  await page.locator("//input[@name='uid']").fill(username);
  await page.locator("//input[@name='password']").fill(password);
  await page.locator("//input[@name='btnLogin']").click();
}

async function expectInvalidLoginAlert(page: Page) {
  page.once('dialog', async (dialog: Dialog) => {
    expect(dialog.message().toLowerCase()).toContain('not valid');
    await dialog.accept();
  });
}

test('Login with valid username and valid password', async ({ page }) => {
  await login(page, VALID_USERNAME, VALID_PASSWORD);
  await expect(page.locator("xpath=//marquee[@class='heading3']")).toBeVisible();
  await expect(page).toHaveURL(/Managerhomepage/);
});

test('Login with invalid username and valid password', async ({ page }) => {
  await expectInvalidLoginAlert(page);
  await login(page, INVALID_USERNAME, VALID_PASSWORD);
});

test('Login with valid username and invalid password', async ({ page }) => {
  await expectInvalidLoginAlert(page);
  await login(page, VALID_USERNAME, INVALID_PASSWORD);
});

test('Login with invalid username and invalid password', async ({ page }) => {
  await expectInvalidLoginAlert(page);
  await login(page, INVALID_USERNAME, INVALID_PASSWORD);
});