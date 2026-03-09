import { test, expect, Dialog } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';
import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';


test.describe('Logout Tests', () => {
  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
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

});