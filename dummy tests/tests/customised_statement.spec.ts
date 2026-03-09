import { test, expect, type Page, type Dialog } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://demo.guru99.com/V1/index.php');
  await expect(page.locator("//a[text()='Demo Site']")).toBeVisible();
  await page.locator("//a[text()='Bank Project']").click();
  await page.locator("//input[@name='uid']").fill('mngr653719');
  await page.locator("//input[@name='password']").fill('Unajaty');
  await page.locator("//input[@name='btnLogin']").click();
  await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();
  await expect(page).toHaveURL(/Managerhomepage/);
});

async function goToCustomizedStatement(page: Page) {
  await page.locator("//a[text()='Customized Statement']").click();
}

test('Generate statement with valid inputs', async ({ page }) => {

  await goToCustomizedStatement(page);
  await expect(page).toHaveURL(/CustomisedStatement/);
});