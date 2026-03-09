import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { NewAccountPage } from '../pages/NewAccountPage';
import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';

import {

  VALID_ACCOUNT,
  EMPTY_CUSTOMER_ID,
  INVALID_CUSTOMER_ALPHA,
  NON_EXISTING_CUSTOMER,
  EMPTY_DEPOSIT,
  ZERO_DEPOSIT,
  INVALID_DEPOSIT_ALPHA,
  INVALID_DEPOSIT_SPECIAL,
  LARGE_DEPOSIT

} from '../utils/newAccountTestData';

test.describe('New Account Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL(/Managerhomepage/);
    await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();

  });


  test('Add account with valid Customer ID and deposit', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(VALID_ACCOUNT.customerId);
    await account.enterInitialDeposit(VALID_ACCOUNT.deposit);
    await account.clickSubmit();

  });


  test('Add account with empty Customer ID', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(EMPTY_CUSTOMER_ID);
    await account.enterInitialDeposit(VALID_ACCOUNT.deposit);
    await account.clickSubmit();
    await account.verifyValidationMessage('Customer ID is required');

  });


  test('Customer ID with alphabets', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(INVALID_CUSTOMER_ALPHA);
    await account.verifyValidationMessage('Characters are not allowed');

  });



  test('Customer ID with non-existing ID', async ({ page }) => {

    const account = new NewAccountPage(page);

    await account.clickNewAccount();
    await account.enterCustomerId(NON_EXISTING_CUSTOMER);
    await account.enterInitialDeposit(VALID_ACCOUNT.deposit);
    await account.clickSubmit();

  });

  test('Add account without filling deposit', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(VALID_ACCOUNT.customerId);
    await account.enterInitialDeposit(EMPTY_DEPOSIT);
    await account.clickSubmit();

  });

  test('Deposit with zero value', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(VALID_ACCOUNT.customerId);
    await account.enterInitialDeposit(ZERO_DEPOSIT);
    await account.clickSubmit();

  });


  test('Deposit with alphabets', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(VALID_ACCOUNT.customerId);
    await account.enterInitialDeposit(INVALID_DEPOSIT_ALPHA);
    await account.verifyValidationMessage('Characters are not allowed');

  });


  test('Deposit with special characters', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(VALID_ACCOUNT.customerId);
    await account.enterInitialDeposit(INVALID_DEPOSIT_SPECIAL);
    await account.verifyValidationMessage('Special characters are not allowed');

  });



  test('Deposit with large value', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(VALID_ACCOUNT.customerId);
    await account.enterInitialDeposit(LARGE_DEPOSIT);
    await account.clickSubmit();

  });



  test('Reset button clears fields', async ({ page }) => {

    const account = new NewAccountPage(page);
    await account.clickNewAccount();
    await account.enterCustomerId(VALID_ACCOUNT.customerId);
    await account.enterInitialDeposit(VALID_ACCOUNT.deposit);
    await account.clickReset();
    await account.verifyCustomerIdEmpty();
    await account.verifyDepositEmpty();
  });

});