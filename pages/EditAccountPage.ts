import { Page, expect, Dialog } from '@playwright/test';

export class EditAccountPage {

    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickEditAccount() {
        await this.page.locator("//a[@href='editAccount.php']").click({ force: true });
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

    async verifyEditAccountPageLoaded() {
        await expect(this.page.locator("//p[text()='Edit Account Form']")).toBeVisible();
    }

}