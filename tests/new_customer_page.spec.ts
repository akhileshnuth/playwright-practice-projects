import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { newCustomerPage } from '../pages/NewCustomerPage';
import { VALID_USERNAME, VALID_PASSWORD } from '../utils/testData';

import {
  VALID_CUSTOMER,
  INVALID_EMAIL,
  INVALID_EMAIL_FORMAT,
  INVALID_PHONE,
  INVALID_NAME_SPECIAL,
  INVALID_CITY,
  INVALID_STATE,
  INVALID_PIN,
  FUTURE_DOB
} from '../utils/customerTestData';


test.describe('Add Customer Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL(/Managerhomepage/);
    await expect(page.locator("//marquee[@class='heading3']")).toBeVisible();

  });


  test('Add customer with valid details', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();

    await customer.enterName(VALID_CUSTOMER.name);
    await customer.selectGender();
    await customer.enterDOB(VALID_CUSTOMER.dob);
    await customer.enterAddress(VALID_CUSTOMER.address);
    await customer.enterCity(VALID_CUSTOMER.city);
    await customer.enterState(VALID_CUSTOMER.state);
    await customer.enterPin(VALID_CUSTOMER.pin);
    await customer.enterPhone(VALID_CUSTOMER.phone);

    await customer.enterEmail(VALID_CUSTOMER.email);
    await customer.clickSubmit();
    await expect(page).toHaveURL(/insrtCustomer.php/);
  });



  test('Invalid email validation', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName(VALID_CUSTOMER.name);
    await customer.selectGender();
    await customer.enterDOB(VALID_CUSTOMER.dob);
    await customer.enterAddress(VALID_CUSTOMER.address);
    await customer.enterCity(VALID_CUSTOMER.city);
    await customer.enterState(VALID_CUSTOMER.state);
    await customer.enterPin(VALID_CUSTOMER.pin);
    await customer.enterPhone(VALID_CUSTOMER.phone);
    await customer.enterEmail(INVALID_EMAIL);
    await page.locator('[name="emailid"]').press('Tab');

    // await customer.clickSubmit();
    await expect(page.getByText('Email-ID is not valid')).toBeVisible();

  });


  test('Invalid phone validation', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName(VALID_CUSTOMER.name);
    await customer.selectGender();
    await customer.enterDOB(VALID_CUSTOMER.dob);
    await customer.enterAddress(VALID_CUSTOMER.address);
    await customer.enterCity(VALID_CUSTOMER.city);
    await customer.enterState(VALID_CUSTOMER.state);
    await customer.enterPin(VALID_CUSTOMER.pin);
    await customer.enterPhone("abcd123");
    // await customer.enterEmail(VALID_CUSTOMER.email);
    // await customer.clickSubmit();
    await page.locator('input[name="emailid"]').click();
    await expect(page.locator('#message7')).toHaveText('Characters are not allowed'); 
 });


  test('Reset button clears fields', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName('test');
    await customer.enterCity('hyd');
    await customer.enterEmail('test@test.com');

    await customer.clickReset();
    await expect(page.locator("//*[@name='name']")).toHaveValue('');
    await expect(page.locator("//*[@name='city']")).toHaveValue('');
    await expect(page.locator("//*[@name='emailid']")).toHaveValue('');

  });


  test('Empty customer name validation', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName('');
    await page.locator("//*[@name='city']").click();
    await expect(page.locator('#message')).toHaveText('Customer name must not be blank');
  });


  test('Customer name with special characters', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName(INVALID_NAME_SPECIAL);
    await page.locator("//*[@name='city']").click();
    await expect(page.locator('#message')).toHaveText('Special characters are not allowed');
  });


  test('Numeric values in City validation', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName(VALID_CUSTOMER.name);
    await customer.selectGender();
    await customer.enterDOB(VALID_CUSTOMER.dob);
    await customer.enterAddress(VALID_CUSTOMER.address);
    await customer.enterCity(INVALID_CITY);
    await page.locator("//*[@name='state']").click();
    await expect(page.locator('#message4')).toHaveText('Numbers are not allowed');

  });


  test('Numeric values in State validation', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName(VALID_CUSTOMER.name);
    await customer.selectGender();
    await customer.enterDOB(VALID_CUSTOMER.dob);
    await customer.enterAddress(VALID_CUSTOMER.address);
    await customer.enterCity(VALID_CUSTOMER.city);

    await customer.enterState(INVALID_STATE);
    await page.locator("//*[@name='pinno']").click();
    await expect(page.locator('#message5')).toHaveText('Numbers are not allowed')

  });


  test('Submit with missing mandatory fields', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();

    page.once('dialog', async dialog => {
        await customer.verifyAlert(dialog, 'Please fill all fields');
    });

    await customer.clickSubmit();
    // page.once('dialog', async dialog => {
    //    await customer.verifyAlert(dialog, 'Please fill all fields');
    // });

  });


  test('Invalid email format validation', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();

    await customer.enterName(VALID_CUSTOMER.name);
    await customer.selectGender();
    await customer.enterDOB(VALID_CUSTOMER.dob);
    await customer.enterAddress(VALID_CUSTOMER.address);
    await customer.enterCity(VALID_CUSTOMER.city);
    await customer.enterState(VALID_CUSTOMER.state);
    await customer.enterPin(VALID_CUSTOMER.pin);
    await customer.enterPhone(VALID_CUSTOMER.phone);

    await customer.enterEmail("test@com");

    await page.locator('body').click();
    await expect(page.locator('#message9')).toHaveText('Email-ID is not valid');

    page.once('dialog', async dialog => {
        await customer.verifyAlert(dialog, 'Please fill all fields');
    });

    await customer.clickSubmit();

  });


  test('AJAX validation for all fields', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();

    // Customer Name validation
    await customer.enterName('');
    await page.locator("[name='city']").click();
    await expect(page.locator('#message')).toHaveText('Customer name must not be blank');

    // Customer Name special characters
    await customer.enterName(INVALID_NAME_SPECIAL);
    await page.locator("[name='city']").click();
    await expect(page.locator('#message')).toHaveText('Special characters are not allowed');

    // City validation (numbers not allowed)
    await customer.enterName(VALID_CUSTOMER.name);
    await customer.enterCity('1234');
    await page.locator("[name='state']").click();
    await expect(page.locator('#message4')).toHaveText('Numbers are not allowed');

    // State validation (numbers not allowed)
    await customer.enterState(INVALID_STATE);
    await page.locator("[name='pinno']").click();
    await expect(page.locator('#message5')).toHaveText('Numbers are not allowed');

    // PIN validation char
    await customer.enterPin('rdkcnxoi');
    await page.locator("[name='city']").click();
    await expect(page.locator('#message6')).toHaveText('Characters are not allowed');

    //pin code length validation
    await customer.enterPin(INVALID_PIN);
    await page.locator("[name='city']").click();
    await expect(page.locator('#message6')).toHaveText('PIN Code must have 6 Digits');

    // Telephone validation (characters not allowed)
    await customer.enterPin(VALID_CUSTOMER.pin);
    await customer.enterPhone(INVALID_PHONE);
    await page.locator("[name='emailid']").click();
    await expect(page.locator('#message7')).toHaveText('Characters are not allowed');

    // Email validation
    await customer.enterPhone(VALID_CUSTOMER.phone);
    await customer.enterEmail(INVALID_EMAIL);
    await page.locator("[name='pinno']").click();
    await expect(page.locator('#message9')).toHaveText('Email-ID is not valid');

  });

  test('Future DOB validation', async ({ page }) => {

    const customer = new newCustomerPage(page);

    await customer.clickNewCustomer();
    await customer.enterName(VALID_CUSTOMER.name);
    await customer.selectGender();

    await customer.enterDOB(FUTURE_DOB);
    await expect(page.locator("[name='dob']")).toHaveValue(FUTURE_DOB);

  });

});