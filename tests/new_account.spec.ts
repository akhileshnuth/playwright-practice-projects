import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.guru99.com/V1/index.php');
  await page.locator("xpath=//a[text()='Bank Project']").click();
  await expect(page.locator("xpath=//a[text()='Demo Site']")).toBeVisible();
  await page.locator("xpath=//input[@name='uid']").fill('mngr653719');
  await page.locator("xpath=//input[@name='password']").fill('Unajaty');
  await page.locator("xpath=//input[@name='btnLogin']").click();
  await expect(page.locator("xpath=//marquee[@class='heading3']")).toBeVisible();
  await expect(page).toHaveURL(/Managerhomepage/);
});

async function goToNewAccount(page: Page) {
  await page.locator("xpath=//a[text()='New Account']").click();
}

async function fillCustomerId(page: Page, value: string) {
  await page.locator("xpath=//input[@name='cusid']").fill(value);
}

async function fillDeposit(page: Page, value: string) {
  await page.locator("xpath=//input[@name='inideposit']").fill(value);
}

async function submitForm(page: Page) {
  await page.locator("xpath=//input[@name='button2']").click();
}

async function resetForm(page: Page) {
  await page.locator("xpath=//input[@name='reset']").click();
}

async function expectTextVisible(page: Page, text: string) {
  await expect(page.locator(`xpath=//*[text()='${text}']`)).toBeVisible();
}

async function expectFieldEmpty(page: Page, fieldName: string) {
  await expect(page.locator(`xpath=//input[@name='${fieldName}']`)).toHaveValue('');
}

test('Add account with valid Customer ID and deposit', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '123456');
  await fillDeposit(page, '5000');
  await submitForm(page);
});

test('Add account with empty Customer ID', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '');
  await fillDeposit(page, '5000');
  await submitForm(page);
  await expectTextVisible(page, 'Customer ID is required');
});

test('Customer ID with alphabets', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, 'abcd');
  await expectTextVisible(page, 'Characters are not allowed');
});

test('Customer ID with non-existing ID', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '99999999');
  await fillDeposit(page, '5000');
  await submitForm(page);
});

test('Add account without filling deposit', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '123456');
  await fillDeposit(page, '');
  await submitForm(page);
});

test('Deposit with zero value', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '123456');
  await fillDeposit(page, '0');
  await submitForm(page);
});

test('Deposit with alphabets', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '123456');
  await fillDeposit(page, 'abc');
  await expectTextVisible(page, 'Characters are not allowed');
});

test('Deposit with special characters', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '123456');
  await fillDeposit(page, '@#$%');
  await expectTextVisible(page, 'Special characters are not allowed');
});

test('Deposit with large value', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '123456');
  await fillDeposit(page, '999999999');
  await submitForm(page);
});

test('Reset button clears fields', async ({ page }) => {

  await goToNewAccount(page);
  await fillCustomerId(page, '123456');
  await fillDeposit(page, '5000');
  await resetForm(page);
  await expectFieldEmpty(page, 'cusid');
  await expectFieldEmpty(page, 'inideposit');
});