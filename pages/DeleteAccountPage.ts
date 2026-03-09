import { Page, expect, Dialog } from '@playwright/test';

export class DeleteAccountPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickDeleteAccount() {
        await this.page.locator("//a[text()='Delete Account']").click();
    }

    async enterAccountNumber(accountNo: string) {
        await this.page.locator("//input[@name='accountno']").fill(accountNo);
    }

    async clickSubmit() {
        await this.page.locator("//input[@name='AccSubmit']").click();
    }

    async clickReset() {
        await this.page.locator("//input[@name='res']").click();
    }

    async verifyValidationText(text: string) {
        await expect(this.page.locator(`//*[text()='${text}']`)).toBeVisible();
    }

    async verifyAlert(dialog: Dialog, message: string) {
        expect(dialog.message()).toContain(message);
        await dialog.accept();
    }

    async verifyAccountNumberCleared() {
        await expect(this.page.locator("//input[@name='accountno']")).toHaveValue('');
    }

    async verifyDeleteAccountPageLoaded() {
        await expect(this.page.locator("//p[text()='Delete Account Form']")).toBeVisible();
    }

}