import { test, expect, type Page, type Dialog } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://demo.guru99.com/V1/index.php');
  await expect(page.locator("xpath=//a[text()='Demo Site']")).toBeVisible();
  await page.locator("xpath=//a[text()='Bank Project']").click();
  await page.locator("xpath=//input[@name='uid']").fill('mngr653719');
  await page.locator("xpath=//input[@name='password']").fill('Unajaty');
  await page.locator("xpath=//input[@name='btnLogin']").click();
  await expect(page.locator("xpath=//marquee[@class='heading3']")).toBeVisible();
  await expect(page).toHaveURL(/Managerhomepage/);
});

async function goToMiniStatement(page: Page) {
  await page.locator("xpath=//a[text()='Mini Statement']").click();
}

async function fillAccountNo(page: Page, value: string) {
  await page.locator("xpath=//input[@name='accountno']").fill(value);
  await page.locator("body").click();
}

async function submitForm(page: Page) {
  await page.locator("xpath=//input[@name='AccSubmit']").click();
}

async function resetForm(page: Page) {
  await page.locator("xpath=//input[@name='res']").click();
}

async function expectAlert(page: Page, expectedMessage: string) {
  page.once('dialog', async (dialog: Dialog) => {
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.accept();
  });
}

async function expectValidationMessage(page: Page, keyword: string) {
  await expect(page.locator(`xpath=//label[starts-with(@id,'message') and contains(text(),'${keyword}')]`)).toBeVisible();
}

async function expectFieldEmpty(page: Page) {
  await expect(page.locator("xpath=//input[@name='accountno']")).toHaveValue('');
}

test('Opening mini statement with valid account number', async ({ page }) => {

  await goToMiniStatement(page);
  await fillAccountNo(page, '123456');
  await submitForm(page);
});

test('Opening mini statement with empty account number', async ({ page }) => {

  await goToMiniStatement(page);
  await expectAlert(page, 'Please fill all fields');
  await submitForm(page);
});

test('Opening mini statement with alphabets in account number', async ({ page }) => {

  await goToMiniStatement(page);
  await fillAccountNo(page, 'qwert');
  await expectValidationMessage(page, 'Characters');
});

test('Opening mini statement with special characters in account number', async ({ page }) => {

  await goToMiniStatement(page);
  await fillAccountNo(page, '@#$%');
  await expectValidationMessage(page, 'Special characters are not allowed');
});

test('Reset button clears account number field', async ({ page }) => {

  await goToMiniStatement(page);
  await fillAccountNo(page, '123456');
  await resetForm(page);
  await expectFieldEmpty(page);
});