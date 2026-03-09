import { Page, expect } from '@playwright/test';

export class EditCustomerPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickEditCustomer() {
        await this.page.locator("//a[text()='Edit Customer']").click();
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

    

    async verifyCustomerIdRequiredMessage() {
        await expect(this.page.locator("//label[contains(text(),'Customer ID is required')]")).toBeVisible();
    }

    async verifyCharactersNotAllowedMessage() {
        await expect(this.page.locator("//label[contains(text(),'Characters are not allowed')]")).toBeVisible();
    }

    async verifySpecialCharactersNotAllowedMessage() {
        await expect(this.page.locator("//label[contains(text(),'Special characters are not allowed')]")).toBeVisible();
    }

    async verifyValidationText(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async verifyAlert(dialog: any, message: string) {
        expect(dialog.message()).toContain(message);
        await dialog.accept();
    }

    async verifyCustomerIdCleared() {
        await expect(this.page.locator("//input[@name='cusid']")).toHaveValue('');
    }

    async verifyEditCustomerFormLoaded() {
        await expect(this.page.locator("//p[contains(text(),'Edit Customer Form')]")).toBeVisible();
    }

    async verifyEditCustomerURL() {
        await expect(this.page).toHaveURL(/EditCustomer/);
    }

}