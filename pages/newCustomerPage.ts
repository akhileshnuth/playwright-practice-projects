import { Page, expect } from '@playwright/test';

export class newCustomerPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickNewCustomer() {
        await this.page.getByText('New Customer').click();
    }

    async enterName(name: string) {
        await this.page.locator("//*[@name='name']").fill(name);
    }

    async selectGender() {
        await this.page.locator("(//*[@name='rad1'])[1]").check();
    }

    async enterDOB(dob: string) {
        await this.page.locator("//*[@name='dob']").fill(dob);
    }

    async enterAddress(address: string) {
        await this.page.locator("//*[@name='addr']").fill(address);
    }

    async enterCity(city: string) {
        await this.page.locator("//*[@name='city']").fill(city);
    }

    async enterState(state: string) {
        await this.page.locator("//*[@name='state']").fill(state);
    }

    async enterPin(pin: string) {
        await this.page.locator("//*[@name='pinno']").fill(pin);
    }

    async enterPhone(phone: string) {
        await this.page.locator("//*[@name='telephoneno']").fill(phone);
    }

    async enterEmail(email: string) {
        await this.page.locator("//*[@name='emailid']").fill(email);
    }

    async clickSubmit() {
        await this.page.locator("//*[@name='sub']").click();
    }

    async clickReset() {
        await this.page.locator("//*[@name='res']").click();
    }

    async verifySuccessURL() {
        await expect(this.page).toHaveURL(/insrtCustomer.php/);
    }

    async verifyFailureURL() {
        await expect(this.page).toHaveURL(/addcustomerpage.php/);
    }

    async verifyValidationText(text: string) {
        await expect(this.page.getByText(text)).toBeVisible();
    }

    async verifyAlert(dialog: any, message: string) {

        expect(dialog.message()).toContain(message);
        await dialog.accept();
    }

    async verifyFieldCleared(locator: string) {
        await expect(this.page.locator(locator)).toHaveValue('');
    }
}