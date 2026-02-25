import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://demo.guru99.com/V1/index.php');
  await page.getByText('Bank Project').click();

  await page.locator('[name="uid"]').fill('mngr653719');
  await page.locator('[name="password"]').fill('Unajaty');
  await page.locator('[name="btnLogin"]').click();
});

test('Add customer with all valid details', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('Akhil');
  await page.locator('[name="rad1"]').first().check();
  await page.locator('[name="dob"]').fill('2001-01-01');
  await page.locator('[name="addr"]').fill('CPT,Palnadu');
  await page.locator('[name="city"]').fill('cpt');
  await page.locator('[name="state"]').fill('Andhra');
  await page.locator('[name="pinno"]').fill('522626');
  await page.locator('[name="telephoneno"]').fill('9876543210');
  await page.locator('[name="emailid"]').fill('akhil@gmail.com');

  await page.locator('[name="sub"]').click();

  // await expect(page).toHaveURL(/insrtCustomer.php/);

});

test('Numeric values in city/state, special characters in customer name & City/state   ', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('Akhil!@#$%^&*()_+-++');
  await page.locator('[name="rad1"]').first().check();
  await page.locator('[name="dob"]').fill('2001-01-01');
  await page.locator('[name="addr"]').fill('CPT,Palnadu');
  await page.locator('[name="city"]').fill('!@#$%^&*()');
  await page.locator('[name="state"]').fill('!@#$%^&*()');
  await page.locator('[name="pinno"]').fill('522626');
  await page.locator('[name="telephoneno"]').fill('9876543210');
  await page.locator('[name="emailid"]').fill('akhil@gmail.com');
  
  await page.locator('[name="sub"]').click();

  await expect(page).toHaveURL(/addcustomerpage.php/);
});

test('Empty fields validation ', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('');
  await page.locator('[name="rad1"]').first().check();
  await page.locator('[name="dob"]').fill('2001-01-01');
  await page.locator('[name="addr"]').fill('hyd');
  await page.locator('[name="city"]').fill('HYD');
  await page.locator('[name="state"]').fill('andhra');
  await page.locator('[name="pinno"]').fill('522626');
  await page.locator('[name="telephoneno"]').fill('9876543210');
  await page.locator('[name="emailid"]').fill('');
  
  await page.locator('[name="sub"]').click();

  await expect(page).toHaveURL(/addcustomerpage.php/);
});

test('Future date of birth', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('Akhil');
  await page.locator('[name="rad1"]').first().check();

  // Type future DOB manually
  await page.locator('[name="dob"]').fill('2031-01-01');

  await page.locator('[name="addr"]').fill('CPT');
  await page.locator('[name="city"]').fill('CPT');
  await page.locator('[name="state"]').fill('Andhra');
  await page.locator('[name="pinno"]').fill('522626');
  await page.locator('[name="telephoneno"]').fill('9876543210');
  await page.locator('[name="emailid"]').fill('akhil@gmail.com');

  await page.locator('[name="sub"]').click();

  //await expect(page).toHaveURL(/addcustomerpage.php/);
});

test('Invalid email id format', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('Akhil');
  await page.locator('[name="rad1"]').first().check();
  await page.locator('[name="dob"]').fill('2001-01-01');
  await page.locator('[name="addr"]').fill('CPT');
  await page.locator('[name="city"]').fill('CPT');
  await page.locator('[name="state"]').fill('Andhra');
  await page.locator('[name="pinno"]').fill('522626');
  await page.locator('[name="telephoneno"]').fill('9876543210');

  // Invalid email
  await page.locator('[name="emailid"]').fill('akhilgmail.com');

  await page.locator('[name="sub"]').click();

  await expect(page).toHaveURL(/addcustomerpage.php/);
});

test('Missing mandatory fields validation', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('Akhil');
  await page.locator('[name="rad1"]').first().check();

  await page.locator('[name="sub"]').click();
  await expect(page).toHaveURL(/addcustomerpage.php/);
});

test('AJAX validation with invalid telephone number and mail', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('Akhil');
  await page.locator('[name="rad1"]').first().check();
  await page.locator('[name="dob"]').fill('2001-01-01');
  await page.locator('[name="addr"]').fill('CPT');
  await page.locator('[name="city"]').fill('CPT');
  await page.locator('[name="state"]').fill('Andhra');
  await page.locator('[name="pinno"]').fill('522626');

  // Invalid phone and mail id
  await page.locator('[name="telephoneno"]').fill('ABCDEF');
  await page.locator('[name="city"]').click();
  await expect(page.getByText('Characters are not allowed')).toBeVisible();

  await page.locator('[name="emailid"]').fill('akhilgmail.com');
  await page.locator('[name="city"]').click();
  await expect(page.getByText('Email-ID is not valid')).toBeVisible();

  await page.locator('[name="sub"]').click();
  await expect(page).toHaveURL(/addcustomerpage.php/);
});

test('Submit button working with valid data', async ({ page }) => {

  await page.getByText('New Customer').click();

  // Valid details
  await page.locator('[name="name"]').fill('SubmitTest');
  await page.locator('[name="rad1"]').first().check();
  await page.locator('[name="dob"]').fill('2001-01-01');
  await page.locator('[name="addr"]').fill('CPT');
  await page.locator('[name="city"]').fill('CPT');
  await page.locator('[name="state"]').fill('Andhra');
  await page.locator('[name="pinno"]').fill('522626');
  await page.locator('[name="telephoneno"]').fill('9876543210');
  await page.locator('[name="emailid"]').fill('submit@test.com');

  await page.locator('[name="sub"]').click();

  // Success page verification
  // await expect(page).toHaveURL(/insrtCustomer.php/);
});

test('Reset button clears all fields', async ({ page }) => {

  await page.getByText('New Customer').click();

  await page.locator('[name="name"]').fill('ayyjcg');
  await page.locator('[name="city"]').fill('hyd');
  await page.locator('[name="emailid"]').fill('bkeab@gmail.com');

  // Click Reset
  await page.locator('[name="res"]').click();

  // Verifing fields cleared or not
  await expect(page.locator('[name="name"]')).toHaveValue('');
  await expect(page.locator('[name="city"]')).toHaveValue('');
  await expect(page.locator('[name="emailid"]')).toHaveValue('');
});