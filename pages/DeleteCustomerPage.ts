import { Page, expect, Dialog } from '@playwright/test';

export class DeleteCustomerPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickDeleteCustomer() {
    await this.page.locator("//a[text()='Delete Customer']").click();
    await expect(this.page.locator("//p[text()='Delete Customer Form']")).toBeVisible();

  }

  async enterCustomerId(customerId: string) {
    await this.page.locator("//input[@name='cusid']").fill(customerId);
  }

  async clickSubmit() {
    await this.page.locator("//input[@name='AccSubmit']").click();
  }

  async clickReset() {
    await this.page.locator("//input[@name='res']").click();
  }

  async verifyCharactersNotAllowedMessage() {
    await expect(this.page.locator("//*[text()='Characters are not allowed']")).toBeVisible();
  }

  async verifySpecialCharactersNotAllowedMessage() {
    await expect(this.page.locator("//*[text()='Special characters are not allowed']")).toBeVisible();
  }

  async verifyCustomerIdRequiredMessage() {
    await expect(this.page.locator("//*[text()='Customer ID is required']")).toBeVisible();
  }

  async verifyCustomerIdCleared() {
    await expect(this.page.locator("//input[@name='cusid']")).toHaveValue('');
  }

  async verifyAlert(dialog: Dialog, expectedMessage: string) {
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.accept();
  }

}