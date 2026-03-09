import { Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://demo.guru99.com');
        await this.page.locator("//a[text()='Demo Site']").click();
        await this.page.locator("//a[text()='Bank Project']").click();
    }

    async enterUsername(username: string) {
        await this.page.locator("//input[@name='uid']").fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator("//input[@name='password']").fill(password);
    }

    async clickLogin() {
        await this.page.locator("//input[@name='btnLogin']").click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}