import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  private page: Page;

  readonly registerPanel: Locator;
  readonly createAccountButton: Locator;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.registerPanel = page.getByTestId('register-panel');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
    this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.signUpButton).toBeVisible();
    await this.signUpButton.click();
    await expect(this.registerPanel).toBeVisible();
  }

  async fillUsername(username: string) {
    await expect(this.usernameTextbox).toBeVisible();
    await this.usernameTextbox.fill(username);
  }

  async fillPassword(password: string) {
    await expect(this.passwordTextbox).toBeVisible();
    await this.passwordTextbox.fill(password);
  }

  async clickCreateAccount() {
    await expect(this.createAccountButton).toBeVisible();
    await this.createAccountButton.click();
  }

  async register(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickCreateAccount();
  }
}