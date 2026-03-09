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

test('Logout functionality', async ({ page }) => {

  page.once('dialog', async (dialog: Dialog) => {
    expect(dialog.message().toLowerCase())
      .toContain('successfully logged out');
    await dialog.accept();
  });

  await page.locator("//a[text()='Log out']").click();
  await expect(page).toHaveURL(/index.php/);
});