import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  readonly loginPanel: Locator;
  readonly loginButton: Locator;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly createAccountLink: Locator;
  readonly rememberMeText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginPanel = page.getByTestId('login-panel');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
    this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
    this.createAccountLink = page.getByRole('link', { name: 'Create an account.' });
    this.rememberMeText = page.getByText('Remember me');
  }

  async goto() {
    await expect(this.page.getByRole('link', { name: 'Login' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Login' }).click();
    await expect(this.loginPanel).toBeVisible();
  }

  async fillUsername(username: string) {
    await expect(this.usernameTextbox).toBeVisible();
    await this.usernameTextbox.fill(username);
  }

  async fillPassword(password: string) {
    await expect(this.passwordTextbox).toBeVisible();
    await this.passwordTextbox.fill(password);
  }

  async clickLogin() {
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async clickCreateAccount() {
    await this.createAccountLink.click();
  }
}