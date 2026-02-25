import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://demo.guru99.com/V1/index.php');
  await page.getByText('Bank Project').click();

  await page.locator('[name="uid"]').fill('mngr653719');
  await page.locator('[name="password"]').fill('Unajaty');
  await page.locator('[name="btnLogin"]').click();
});


test('Customer ID with valid input', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  await page.locator('[name="cusid"]').fill('1234567890');
  await page.locator('[name="AccSubmit"]').click();

});


test('Customer ID with only characters', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  await page.locator('[name="cusid"]').fill('bsbs');
  await page.locator('[name="AccSubmit"]').click();

  await expect(page.getByText('Characters are not allowed')).toBeVisible();
});


test('Customer ID with alphanumeric value', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  await page.locator('[name="cusid"]').fill('4343jdf');
  await page.locator('[name="AccSubmit"]').click();

  await expect(page.getByText('Special characters are not allowed')).toBeVisible();
});


test('Customer ID with special characters', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  await page.locator('[name="cusid"]').fill('@#$457852');
  await page.locator('[name="AccSubmit"]').click();

  await expect(page.getByText('Special characters are not allowed')).toBeVisible();
});


test('Submit with empty customer id shows alert', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Please fill all fields');
    await dialog.accept();
  });

  await page.locator('[name="AccSubmit"]').click();
});


test('Submit with invalid characters shows alert', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  await page.locator('[name="cusid"]').fill('gdfgch');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Please fill all fields');
    await dialog.accept();
  });

  await page.locator('[name="AccSubmit"]').click();

  await expect(page.getByText('Characters are not allowed')).toBeVisible();
});


test('Customer ID is required message', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  await page.locator('[name="cusid"]').fill('');

  await expect(page.getByText('Customer ID is required')).toBeVisible();
});


test('Reset button test', async ({ page }) => {

  await page.getByRole('link', { name: 'Delete Customer' }).click();

  await page.locator('[name="cusid"]').fill('123456');

  await page.locator('[name="res"]').click();

  await expect(page.locator('[name="cusid"]')).toHaveValue('');
});