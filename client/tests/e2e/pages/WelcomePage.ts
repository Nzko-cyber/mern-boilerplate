import { Page, Locator, expect } from '@playwright/test';

export class WelcomePage {
  private page: Page;
  private baseUrl: string;

  readonly welcomeMessage: Locator;
  readonly signUpButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.APP_URL || 'http://localhost:3000';
    this.welcomeMessage = page.getByTestId('welcome-page').getByRole('paragraph');
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
  }

  async goto() {
    await this.page.goto(this.baseUrl);
    await expect(this.welcomeMessage).toBeVisible();
  }

  async clickSignUp() {
    await expect(this.signUpButton).toBeVisible();
    await this.signUpButton.click();
  }

  async clickLogin() {
    await expect(this.loginLink).toBeVisible();
    await this.loginLink.click();
  }
}