import { Page, expect } from '@playwright/test';

export class NewAccountPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickNewAccount() {
        await this.page.locator("//a[text()='New Account']").click();
    }

    async enterCustomerId(cusid: string) {
        await this.page.locator("//input[@name='cusid']").fill(cusid);
    }

    async enterInitialDeposit(deposit: string) {
        await this.page.locator("//input[@name='inideposit']").fill(deposit);
    }

    async clickSubmit() {
        await this.page.locator("//input[@name='button2']").click();
    }

    async clickReset() {
        await this.page.locator("//input[@name='reset']").click();
    }

    async verifyValidationMessage(text: string) {
        await expect(this.page.locator(`//*[text()='${text}']`)).toBeVisible();
    }

    async verifyCustomerIdEmpty() {
        await expect(this.page.locator("//input[@name='cusid']")).toHaveValue('');
    }

    async verifyDepositEmpty() {
        await expect(this.page.locator("//input[@name='inideposit']")).toHaveValue('');
    }

    async verifySuccessURL() {
        await expect(this.page).toHaveURL(/addAccount/);
    }

}