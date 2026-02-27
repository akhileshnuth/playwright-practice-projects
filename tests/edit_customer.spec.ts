import { test, expect, type Page, type Dialog } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.guru99.com/V1/index.php');
  await page.locator("//a[text()='Bank Project']").click();
  await expect(page.locator("//a[text()='Demo Site']")).toBeVisible();
  await page.locator("//input[@name='uid']").fill('mngr653719');
  await page.locator("//input[@name='password']").fill('Unajaty');
  await page.locator("//input[@name='btnLogin']").click();
  await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();
  await expect(page).toHaveURL(/Managerhomepage/);
});

async function expectAlert(page: Page, expectedMessage: string) {
  page.once('dialog', async (dialog: Dialog) => {
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.accept();
  });
}

test('Customer ID with valid input', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await page.locator("//input[@name='cusid']").fill('1234567890');
  await page.locator("//input[@name='AccSubmit']").click();
});

test('Customer ID with only characters', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await page.locator("//input[@name='cusid']").fill('asasa');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();
});

test('Customer ID with alphanumeric value', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await page.locator("//input[@name='cusid']").fill('4343jdf');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();
});

test('Customer ID with special characters', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await page.locator("//input[@name='cusid']").fill('@#$457852');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//label[contains(text(),'characters are not allowed')]")).toBeVisible();
});

test('Submit with empty customer id shows alert', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await expectAlert(page, 'Please fill all fields');
  await page.locator("//input[@name='AccSubmit']").click();
});
 
test('Submit with invalid characters shows alert', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await page.locator("//input[@name='cusid']").fill('gdfgch');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();
  await expectAlert(page, 'Please fill all fields');
});

test('Customer ID is required message', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await page.locator("//input[@name='cusid']").fill('');
  await expect(page.locator("//label[contains(text(),'Customer ID is required')]")).toBeVisible();
  await page.locator("//input[@name='AccSubmit']").click();
  await expectAlert(page, 'Please fill all fields');
});

test('Reset button test', async ({ page }) => {
  await page.locator("//a[text()='Edit Customer']").click();
  await page.locator("//input[@name='cusid']").fill('123456');
  await page.locator("//input[@name='res']").click();
  await expect(page.locator("//input[@name='cusid']")).toHaveValue('');
});