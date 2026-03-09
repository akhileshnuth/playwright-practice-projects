import { Page, expect, Dialog } from '@playwright/test';

export class MiniStatementPage {

    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickMiniStatement() {
        await this.page.locator("//a[text()='Mini Statement']").click();
    }

    async enterAccountNumber(accountNo: string) {
        await this.page.locator("//input[@name='accountno']").fill(accountNo);
        await this.page.locator("//body").click();
    }

    async clickSubmit() {
        await this.page.locator("//input[@name='AccSubmit']").click();
    }

    async clickReset() {
        await this.page.locator("//input[@name='res']").click();
    }

    async verifyValidationMessage(keyword: string) {
        await expect(
            this.page.locator(`//label[starts-with(@id,'message') and contains(text(),'${keyword}')]`)
        ).toBeVisible();
    }

    async verifyAlert(dialog: Dialog, message: string) {
        expect(dialog.message()).toContain(message);
        await dialog.accept();
    }

    async verifyAccountNumberCleared() {
        await expect(this.page.locator("//input[@name='accountno']")).toHaveValue('');
    }

    async verifyMiniStatementPageLoaded() {
        await expect(this.page.locator("//p[text()='Mini Statement Form']")).toBeVisible();
    }

}