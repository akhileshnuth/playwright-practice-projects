import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';
import { DeleteAccountPage } from '../pages/DeleteAccountPage';

import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';

import {

  VALID_DELETE_ACCOUNT,
  INVALID_ACCOUNT_ALPHA,
  INVALID_ACCOUNT_ALPHANUMERIC,
  INVALID_ACCOUNT_SPECIAL,
  INVALID_ACCOUNT_ALERT,
  EMPTY_ACCOUNT

} from '../utils/deleteAccountTestData';


test.describe('Delete Account Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();

  });



  test('Account No with valid input', async ({ page }) => {

    const deleteAccount = new DeleteAccountPage(page);
    await deleteAccount.clickDeleteAccount();
    await deleteAccount.enterAccountNumber(VALID_DELETE_ACCOUNT.accountNo);
    await deleteAccount.clickSubmit();

  });



  test('Account No with only characters', async ({ page }) => {

    const deleteAccount = new DeleteAccountPage(page);
    await deleteAccount.clickDeleteAccount();
    await deleteAccount.enterAccountNumber(INVALID_ACCOUNT_ALPHA);
    await page.locator("body").click();
    // await deleteAccount.clickSubmit();
    await deleteAccount.verifyValidationText('Characters are not allowed');
    page.once('dialog', async dialog => {
        await deleteAccount.verifyAlert(dialog, 'Please fill all fields');
    });
    await deleteAccount.clickSubmit();

  });



  test('Account No with alphanumeric value', async ({ page }) => {

    const deleteAccount = new DeleteAccountPage(page);
    await deleteAccount.clickDeleteAccount();
    await deleteAccount.enterAccountNumber(INVALID_ACCOUNT_ALPHANUMERIC);
    await page.locator("body").click();
    // await deleteAccount.clickSubmit();
    await deleteAccount.verifyValidationText('Characters are not allowed');
    page.once('dialog', async dialog => {
        await deleteAccount.verifyAlert(dialog, 'Please fill all fields');
    });
    await deleteAccount.clickSubmit();

  });



  test('Account No with special characters', async ({ page }) => {

    const deleteAccount = new DeleteAccountPage(page);
    await deleteAccount.clickDeleteAccount();
    await deleteAccount.enterAccountNumber(INVALID_ACCOUNT_SPECIAL);
    await page.locator("body").click();
    await deleteAccount.verifyValidationText('Special characters are not allowed');
    page.once('dialog', async dialog => {
        await deleteAccount.verifyAlert(dialog, 'Please fill all fields');
    });
    await deleteAccount.clickSubmit();

  });



  test('Submit with empty account number shows alert', async ({ page }) => {

    const deleteAccount = new DeleteAccountPage(page);
    await deleteAccount.clickDeleteAccount();
    await page.locator("body").click();
    page.once('dialog', async dialog => {
        await deleteAccount.verifyAlert(dialog, 'Please fill all fields');
    });
    await deleteAccount.clickSubmit();

  });
-

  test('Reset button test', async ({ page }) => {

    const deleteAccount = new DeleteAccountPage(page);
    await deleteAccount.clickDeleteAccount();
    await deleteAccount.enterAccountNumber('123456');
    await deleteAccount.clickReset();
    await deleteAccount.verifyAccountNumberCleared();
  });

});