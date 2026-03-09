import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { EditCustomerPage } from '../pages/EditCustomerPage';
import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';

import {
  VALID_CUSTOMER_ID,
  VALID_CUSTOMER_ID_SHORT,
  INVALID_CUSTOMER_ID_CHARACTERS,
  INVALID_CUSTOMER_ID_ALPHANUMERIC,
  INVALID_CUSTOMER_ID_SPECIAL,
  EMPTY_CUSTOMER_ID
} from '../utils/editCustomerData';


test.describe('Edit Customer Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await expect(page).toHaveURL(/Managerhomepage/);
    await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();

  });

  test('Customer ID AJAX validations', async ({ page }) => {

    const customer = new EditCustomerPage(page);
    await customer.clickEditCustomer();

    // Empty validation
    await customer.enterCustomerId(EMPTY_CUSTOMER_ID);
    await page.locator('body').click();
    await expect(page.locator("//label[contains(text(),'Customer ID is required')]")).toBeVisible();


    // Characters validation
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_CHARACTERS);
    await page.locator('body').click();
    await expect(page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();


    // Alphanumeric validation
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_ALPHANUMERIC);
    await page.locator('body').click();
    await expect.soft(page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();

    // Special characters validation
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_SPECIAL);
    await page.locator('body').click();
    await expect(page.locator("//label[contains(text(),'Special characters are not allowed')]")).toBeVisible();

  });


  test('Submit with valid Customer ID', async ({ page }) => {

    const customer = new EditCustomerPage(page);
    await customer.clickEditCustomer();
    await customer.enterCustomerId(VALID_CUSTOMER_ID);
    await customer.clickSubmit();
    await expect(page).toHaveURL(/editCustomerPage.php/);

  });


  test('Submit with special characters', async ({ page }) => {

    const customer = new EditCustomerPage(page);
    await customer.clickEditCustomer();
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_SPECIAL);
    await page.locator('body').click();
    // await expect(page.locator("//label[contains(text(),'Special characters are not allowed')]")).toBeVisible();
    
    page.once('dialog', async (dialog) => {
      await customer.verifyAlert(dialog, 'Please fill all fields');
    });

    await customer.clickSubmit();
    await expect(page.locator("//label[contains(text(),'Special characters are not allowed')]")).toBeVisible();

  });


  test('Submit with alphanumeric customer ID', async ({ page }) => {

    const customer = new EditCustomerPage(page);
    await customer.clickEditCustomer();
    await customer.enterCustomerId(INVALID_CUSTOMER_ID_ALPHANUMERIC);
    await page.locator('body').click();
    
    await expect.soft(page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();

    const dialogPromise = page.waitForEvent('dialog');

    await customer.clickSubmit();

    const dialog = await dialogPromise;
    await customer.verifyAlert(dialog, 'Please fill all fields');

  });


  test('Submit with only characters', async ({ page }) => {

    const customer = new EditCustomerPage(page);

    await customer.clickEditCustomer();

    await customer.enterCustomerId(INVALID_CUSTOMER_ID_CHARACTERS);
    await page.locator('body').click();
    await expect(page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();

    page.once('dialog', async (dialog) => {
      await customer.verifyAlert(dialog, 'Please fill all fields');
    });

    await customer.clickSubmit();

  });


  test('Submit with float value customer ID', async ({ page }) => {

    const customer = new EditCustomerPage(page);
    await customer.clickEditCustomer();
    await customer.enterCustomerId('452.45');
    await page.locator('body').click();
    await expect(page.locator("//label[contains(text(),'Special characters are not allowed')]")).toBeVisible();
    
    page.once('dialog', async (dialog) => {
      await customer.verifyAlert(dialog, 'Please fill all fields');
    });
    await customer.clickSubmit();
    

  });

  test('Submit with empty customer ID', async ({ page }) => {

    const customer = new EditCustomerPage(page);

    await customer.clickEditCustomer();
    await customer.enterCustomerId('');

    page.once('dialog', async dialog => {
      await customer.verifyAlert(dialog, 'Please fill all fields');
    });

    await customer.clickSubmit();

  });

  test('Reset button clears customer ID', async ({ page }) => {

    const customer = new EditCustomerPage(page);

    await customer.clickEditCustomer();
    await customer.enterCustomerId(VALID_CUSTOMER_ID_SHORT);
    await customer.clickReset();
    await expect(page.locator("//input[@name='cusid']")).toHaveValue('');

  });

});