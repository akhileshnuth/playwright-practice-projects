import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DeleteCustomerPage } from '../pages/DeleteCustomerPage';
import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';

import {
  VALID_CUSTOMER_ID,
  VALID_CUSTOMER_ID_SHORT,
  INVALID_CUSTOMER_ID_CHARACTERS,
  INVALID_CUSTOMER_ID_ALPHANUMERIC,
  INVALID_CUSTOMER_ID_SPECIAL,
  EMPTY_CUSTOMER_ID
} from '../utils/deleteCustomerData';

test.describe('Delete customer tests', () => {

  test.beforeEach(async ({ page }) => {

      const loginPage = new LoginPage(page);

      await loginPage.navigate();
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

      await expect(page).toHaveURL(/Managerhomepage/);
      await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();

    });


  test('Customer ID with valid input', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);

    await customer.clickDeleteCustomer();
    await customer.enterCustomerId(VALID_CUSTOMER_ID);
    await customer.clickSubmit();

  });


  test('Customer ID with only characters', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);

    await customer.clickDeleteCustomer();
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_CHARACTERS);
    await customer.clickSubmit();

    await customer.verifyCharactersNotAllowedMessage();

  });


  test('Customer ID with alphanumeric value', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);

    await customer.clickDeleteCustomer();
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_ALPHANUMERIC);
    await customer.clickSubmit();

    await customer.verifyCharactersNotAllowedMessage();

  });


  test('Customer ID with special characters', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);

    await customer.clickDeleteCustomer();
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_SPECIAL);
    await customer.clickSubmit();

    await customer.verifySpecialCharactersNotAllowedMessage();

  });


  test('Submit with empty customer id shows alert', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);
    await customer.clickDeleteCustomer();
    page.once('dialog', async dialog => {
      await customer.verifyAlert(dialog, 'Please fill all fields');
    });
    await customer.clickSubmit();

  });


  test('Submit with invalid characters shows alert', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);

    await customer.clickDeleteCustomer();
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_CHARACTERS);
    await page.locator('body').click();
    await customer.verifyCharactersNotAllowedMessage();
    page.once('dialog', async dialog => {
      await customer.verifyAlert(dialog, 'Please fill all fields');
    });

    await customer.clickSubmit();

  });


  test('Customer ID is required message', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);

    await customer.clickDeleteCustomer();
    await customer.enterCustomerId(EMPTY_CUSTOMER_ID);
    await page.locator('body').click();
    await customer.verifyCustomerIdRequiredMessage();

  });


  test('Reset button test', async ({ page }) => {

    const customer = new DeleteCustomerPage(page);
    await customer.clickDeleteCustomer();
    await customer.enterCustomerId(VALID_CUSTOMER_ID_SHORT);
    await customer.clickReset();
    await customer.verifyCustomerIdCleared();

  })

});