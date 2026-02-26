import { test, expect, type Page, type Dialog } from '@playwright/test';

async function assertSuccessURL(page: Page) {
  await expect(page).toHaveURL(/insrtCustomer.php/);
}

async function assertFailureURL(page: Page) {
  await expect(page).toHaveURL(/addcustomerpage.php/);
}

async function assertValidationText(page: Page, text: string) {
  await expect(page.getByText(text)).toBeVisible();
}

async function handleAlert(page: Page, message: string) {
  page.once('dialog', async (dialog: Dialog) => {
    expect(dialog.message()).toContain(message);
    await dialog.accept();
  });
}

test.beforeEach(async ({ page }) => {

  await page.goto('https://demo.guru99.com/V1/index.php');
  await page.getByText('Bank Project').click();
  await page.locator("xpath=//*[@name='uid']").fill('mngr653719');
  await page.locator("xpath=//*[@name='password']").fill('Unajaty');
  await page.locator("xpath=//*[@name='btnLogin']").click();
  await expect(page.locator("xpath=//marquee[@class='heading3']")).toBeVisible();
});

test('Add customer with all valid details', async ({ page }) => {
  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('Akhil');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await page.locator("xpath=//*[@name='dob']").fill('2001-01-01');
  await page.locator("xpath=//*[@name='addr']").fill('CPT,Palnadu');
  await page.locator("xpath=//*[@name='city']").fill('cpt');
  await page.locator("xpath=//*[@name='state']").fill('Andhra');
  await page.locator("xpath=//*[@name='pinno']").fill('522626');
  await page.locator("xpath=//*[@name='telephoneno']").fill('9876543210');
  await page.locator("xpath=//*[@name='emailid']").fill('akhil@gmail.com');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertSuccessURL(page);
});

test('Numeric values in city/state, special characters in customer name & City/state   ', async ({ page }) => {

  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('Akhil!@#$%^&*()_+-++');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await page.locator("xpath=//*[@name='dob']").fill('2001-01-01');
  await page.locator("xpath=//*[@name='addr']").fill('CPT,Palnadu');
  await page.locator("xpath=//*[@name='city']").fill('!@#$%^&*()');
  await page.locator("xpath=//*[@name='state']").fill('!@#$%^&*()');
  await page.locator("xpath=//*[@name='pinno']").fill('522626');
  await page.locator("xpath=//*[@name='telephoneno']").fill('9876543210');
  await page.locator("xpath=//*[@name='emailid']").fill('akhil@gmail.com');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertFailureURL(page);
});

test('Empty fields validation ', async ({ page }) => {

  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await page.locator("xpath=//*[@name='dob']").fill('2001-01-01');
  await page.locator("xpath=//*[@name='addr']").fill('hyd');
  await page.locator("xpath=//*[@name='city']").fill('HYD');
  await page.locator("xpath=//*[@name='state']").fill('andhra');
  await page.locator("xpath=//*[@name='pinno']").fill('522626');
  await page.locator("xpath=//*[@name='telephoneno']").fill('9876543210');
  await page.locator("xpath=//*[@name='emailid']").fill('');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertFailureURL(page);
});

test('Future date of birth', async ({ page }) => {

  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('Akhil');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await page.locator("xpath=//*[@name='dob']").fill('2031-01-01');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertFailureURL(page);
});

test('Invalid email id format', async ({ page }) => {
  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('Akhil');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await page.locator("xpath=//*[@name='emailid']").fill('akhilgmail.com');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertFailureURL(page);
});

test('Missing mandatory fields validation', async ({ page }) => {

  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('Akhil');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await handleAlert(page, 'Please fill all fields');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertFailureURL(page);
});

test('AJAX validation with invalid telephone number and mail', async ({ page }) => {

  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('Akhil');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await page.locator("xpath=//*[@name='telephoneno']").fill('ABCDEF');
  await page.locator("xpath=//*[@name='city']").click();
  await assertValidationText(page, 'Characters are not allowed');
  await page.locator("xpath=//*[@name='emailid']").fill('akhilgmail.com');
  await page.locator("xpath=//*[@name='city']").click();
  await assertValidationText(page, 'Email-ID is not valid');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertFailureURL(page);
});

test('Submit button working with valid data', async ({ page }) => {

  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('SubmitTest');
  await page.locator("xpath=(//*[@name='rad1'])[1]").check();
  await page.locator("xpath=//*[@name='dob']").fill('2001-01-01');
  await page.locator("xpath=//*[@name='addr']").fill('CPT');
  await page.locator("xpath=//*[@name='city']").fill('CPT');
  await page.locator("xpath=//*[@name='state']").fill('Andhra');
  await page.locator("xpath=//*[@name='pinno']").fill('522626');
  await page.locator("xpath=//*[@name='telephoneno']").fill('9876543210');
  await page.locator("xpath=//*[@name='emailid']").fill('submit@test.com');
  await page.locator("xpath=//*[@name='sub']").click();
  await assertSuccessURL(page);
});

test('Reset button clears all fields', async ({ page }) => {

  await page.getByText('New Customer').click();
  await page.locator("xpath=//*[@name='name']").fill('ayyjcg');
  await page.locator("xpath=//*[@name='city']").fill('hyd');
  await page.locator("xpath=//*[@name='emailid']").fill('bkeab@gmail.com');
  await page.locator("xpath=//*[@name='res']").click();
  await expect(page.locator("xpath=//*[@name='name']")).toHaveValue('');
  await expect(page.locator("xpath=//*[@name='city']")).toHaveValue('');
  await expect(page.locator("xpath=//*[@name='emailid']")).toHaveValue('');
});