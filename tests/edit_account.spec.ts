import { test, expect, type Page, type Dialog } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://demo.guru99.com/V1/index.php');
  await page.locator("//a[text()='Bank Project']").click();
  await expect(page.locator("//a[text()='Demo Site']")).toBeVisible();
  await page.locator("//input[@name='uid']").fill('mngr653719');
  await page.locator("//input[@name='password']").fill('Unajaty');
  await page.locator("//input[@name='btnLogin']").click();
  await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();
});

async function expectAlert(page: Page, expectedMessage: string) {
  page.once('dialog', async (dialog: Dialog) => {
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.accept();
  });
}

test('Account No with valid input', async ({ page }) => {

  await page.locator("//a[@href='editAccount.php']").click({ force: true });
  await page.locator("//input[@name='accountno']").fill('1234567890');
  await page.locator("//input[@name='AccSubmit']").click();
});

test('Account No with only characters', async ({ page }) => {

  await page.locator("//a[@href='editAccount.php']").click({ force: true });
  await page.locator("//input[@name='accountno']").fill('bsbs');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//*[text()='Characters are not allowed']")).toBeVisible();
});

test('Account No with alphanumeric value', async ({ page }) => {

  await page.locator("//a[@href='editAccount.php']").click({ force: true });
  await page.locator("//input[@name='accountno']").fill('4343jdf');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//*[text()='Characters are not allowed']")).toBeVisible();
  await expectAlert(page, 'Please fill all fields');
});

test('Account No with special characters', async ({ page }) => {

  await page.locator("//a[@href='editAccount.php']").click({ force: true });
  await page.locator("//input[@name='accountno']").fill('@#$457852');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//*[text()='Special characters are not allowed']")).toBeVisible();
});

test('Submit with empty account no shows alert', async ({ page }) => {

  await page.locator("//a[@href='editAccount.php']").click({ force: true });
  await page.locator("//input[@name='AccSubmit']").click();
  await expectAlert(page, 'Please fill all fields');
});

test('Submit with invalid characters shows alert', async ({ page }) => {

  await page.locator("//a[@href='editAccount.php']").click({ force: true });
  await page.locator("//input[@name='accountno']").fill('gdfgch');
  await page.locator("//input[@name='AccSubmit']").click();
  await expect(page.locator("//*[text()='Characters are not allowed']")).toBeVisible();
  await expectAlert(page, 'Please fill all fields');
});

test('Reset button test', async ({ page }) => {

  await page.locator("//a[@href='editAccount.php']").click({ force: true });
  await page.locator("//input[@name='accountno']").fill('123456');
  await page.locator("//input[@name='res']").click();
  await expect(page.locator("//input[@name='accountno']")).toHaveValue('');
});