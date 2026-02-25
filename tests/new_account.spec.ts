import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://demo.guru99.com/V1/index.php');
  await page.getByText('Bank Project').click();

  await page.locator('[name="uid"]').fill('mngr653719');
  await page.locator('[name="password"]').fill('Unajaty');
  await page.locator('[name="btnLogin"]').click();
});


test('Add account with valid Customer ID and deposit', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('123456');
  await page.locator('[name="inideposit"]').fill('5000');

  await page.locator('[name="button2"]').click();
});


test('Add account with empty Customer ID', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('');
  await page.locator('[name="inideposit"]').fill('5000');

  await page.locator('[name="button2"]').click();
  await expect(page.getByText('Customer ID is required')).toBeVisible();
});


test('Customer ID with alphabets', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('abcd');

  await expect(page.getByText('Characters are not allowed')).toBeVisible();
});


test('Customer ID with non-existing ID', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('99999999');
  await page.locator('[name="inideposit"]').fill('5000');

  await page.locator('[name="button2"]').click();
});


test('Add account without filling deposit', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('123456');
  await page.locator('[name="inideposit"]').fill('');

  await page.locator('[name="button2"]').click();
});


test('Deposit with zero value', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('123456');
  await page.locator('[name="inideposit"]').fill('0');

  await page.locator('[name="button2"]').click();
});


test('Deposit with alphabets', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('123456');
  await page.locator('[name="inideposit"]').fill('abc');

  await expect(page.getByText('Characters are not allowed')).toBeVisible();
});


test('Deposit with special characters', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('123456');
  await page.locator('[name="inideposit"]').fill('@#$%');

  await expect(page.getByText('Special characters are not allowed')).toBeVisible();
});


test('Deposit with large value', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('123456');
  await page.locator('[name="inideposit"]').fill('999999999');

  await page.locator('[name="button2"]').click();
});


test('Reset button clears fields', async ({ page }) => {

  await page.getByRole('link', { name: 'New Account' }).click();

  await page.locator('[name="cusid"]').fill('123456');
  await page.locator('[name="inideposit"]').fill('5000');

  await page.locator('[name="reset"]').click();

  await expect(page.locator('[name="cusid"]')).toHaveValue('');
  await expect(page.locator('[name="inideposit"]')).toHaveValue('');
});