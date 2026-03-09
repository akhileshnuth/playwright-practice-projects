import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginPage';
import { EditAccountPage } from '../pages/EditAccountPage';

import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';

import {

  VALID_ACCOUNT,
  INVALID_ACCOUNT_ALPHA,
  INVALID_ACCOUNT_ALPHANUMERIC,
  INVALID_ACCOUNT_SPECIAL,
  INVALID_ACCOUNT_ALERT,
  EMPTY_ACCOUNT

} from '../utils/editAccountTestData';


test.describe('Edit Account Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();
    await expect(page).toHaveURL(/Managerhomepage/);

  });


  test('Account No with valid input', async ({ page }) => {

    const editAccount = new EditAccountPage(page);
    await editAccount.clickEditAccount();
    await editAccount.enterAccountNumber(VALID_ACCOUNT.accountNo);
    await editAccount.clickSubmit();

  });


  test('Account No with only characters', async ({ page }) => {

    const editAccount = new EditAccountPage(page);
    await editAccount.clickEditAccount();
    await editAccount.enterAccountNumber(INVALID_ACCOUNT_ALPHA);
    await editAccount.clickSubmit();
    await editAccount.verifyValidationText('Characters are not allowed');

  });


  test('Account No with alphanumeric value', async ({ page }) => {

    const editAccount = new EditAccountPage(page);
    await editAccount.clickEditAccount();
    await editAccount.enterAccountNumber(INVALID_ACCOUNT_ALPHANUMERIC);
    await editAccount.clickSubmit();
    await editAccount.verifyValidationText('Characters are not allowed');
    page.once('dialog', async dialog => {
        await editAccount.verifyAlert(dialog, 'Please fill all fields');
    });

  });


  test('Account No with special characters', async ({ page }) => {

    const editAccount = new EditAccountPage(page);
    await editAccount.clickEditAccount();
    await editAccount.enterAccountNumber(INVALID_ACCOUNT_SPECIAL);
    await editAccount.clickSubmit();
    await editAccount.verifyValidationText('Special characters are not allowed');

  });


  test('Submit with empty account no shows alert', async ({ page }) => {

    const editAccount = new EditAccountPage(page);
    await editAccount.clickEditAccount();
    page.once('dialog', async dialog => {
        await editAccount.verifyAlert(dialog, 'Please fill all fields');
    });
    await editAccount.clickSubmit();

  });


  test('Submit with invalid characters shows alert', async ({ page }) => {

    const editAccount = new EditAccountPage(page);
    await editAccount.clickEditAccount();
    await editAccount.enterAccountNumber(INVALID_ACCOUNT_ALERT);
    await editAccount.clickSubmit();
    await editAccount.verifyValidationText('Characters are not allowed');
    page.once('dialog', async dialog => {
        await editAccount.verifyAlert(dialog, 'Please fill all fields');
    });

  });


  test('Reset button test', async ({ page }) => {

    const editAccount = new EditAccountPage(page);
    await editAccount.clickEditAccount();
    await editAccount.enterAccountNumber('123456');
    await editAccount.clickReset();
    await editAccount.verifyAccountNumberCleared();
  });

});