import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';
import { MiniStatementPage } from '../pages/MiniStatementPage';

import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';

import {
  VALID_MINI_STATEMENT,
  EMPTY_ACCOUNT,
  INVALID_ACCOUNT_ALPHA,
  INVALID_ACCOUNT_SPECIAL
} from '../utils/miniStatementTestData';


test.describe('Mini Statement Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();
    await expect(page).toHaveURL(/Managerhomepage/);
  });



  test('Opening mini statement with valid account number', async ({ page }) => {

    const miniStatement = new MiniStatementPage(page);
    await miniStatement.clickMiniStatement();
    await miniStatement.enterAccountNumber(VALID_MINI_STATEMENT.accountNo);
    await miniStatement.clickSubmit();
  });



  test('Opening mini statement with empty account number', async ({ page }) => {

    const miniStatement = new MiniStatementPage(page);
    await miniStatement.clickMiniStatement();
    page.once('dialog', async dialog => {
        await miniStatement.verifyAlert(dialog, 'Please fill all fields');
    });
    await miniStatement.clickSubmit();
  });



  test('Opening mini statement with alphabets in account number', async ({ page }) => {

    const miniStatement = new MiniStatementPage(page);
    await miniStatement.clickMiniStatement();
    await miniStatement.enterAccountNumber(INVALID_ACCOUNT_ALPHA);
    await miniStatement.verifyValidationMessage('Characters are not allowed');
  });

  test('Opening mini statement with special characters in account number', async ({ page }) => {

    const miniStatement = new MiniStatementPage(page);
    await miniStatement.clickMiniStatement();
    await miniStatement.enterAccountNumber(INVALID_ACCOUNT_SPECIAL);
    await miniStatement.verifyValidationMessage('Special characters are not allowed');

  });

  test('Reset button clears account number field', async ({ page }) => {

    const miniStatement = new MiniStatementPage(page);
    await miniStatement.clickMiniStatement();
    await miniStatement.enterAccountNumber(VALID_MINI_STATEMENT.accountNo);
    await miniStatement.clickReset();
    await miniStatement.verifyAccountNumberCleared();
  });

});