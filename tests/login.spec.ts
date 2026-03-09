import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { VALID_USERNAME, VALID_PASSWORD, INVALID_USERNAME, INVALID_PASSWORD} from '../utils/testData';

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Login with valid username and valid password', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await expect(page).toHaveURL(/Managerhomepage/);
        await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();
    });

    test('Login with invalid username and valid password', async ({ page }) => {

        const loginPage = new LoginPage(page);

        page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);
        await expect(page).toHaveURL(/index.php/);
    });

    test('Login with valid username and invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page);

        page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await loginPage.login(VALID_USERNAME, INVALID_PASSWORD);
        await expect(page).toHaveURL(/index.php/);
    });

    test('Login with invalid username and invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page);

        page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
        await expect(page).toHaveURL(/index.php/);
    });

});