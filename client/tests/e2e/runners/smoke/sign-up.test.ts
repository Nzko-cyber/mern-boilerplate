import { test, expect } from '@playwright/test';
import { WelcomePage, RegisterPage, SettingsPage } from '../../pages';

test.describe('Smoke - Sign Up', () => {
  test('registers a new user and lands on settings page', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    const registerPage = new RegisterPage(page);
    const settingsPage = new SettingsPage(page);
    const uniqueUsername = `smoke_${Date.now()}`;
    const password = 'SmokePass123!';

    await test.step('checking welcome page elements', async () => {
      await welcomePage.goto();
      await expect(welcomePage.welcomeMessage).toContainText('Welcome Page!');
      await expect(welcomePage.signUpButton).toBeVisible();
      await expect(welcomePage.loginLink).toBeVisible();
    });

    await test.step('opening sign up form', async () => {
      await welcomePage.clickSignUp();
      await expect(registerPage.registerPanel).toBeVisible();
      await expect(registerPage.createAccountButton).toBeVisible();
    });

    await test.step('registering new user and validating settings page', async () => {
      await registerPage.register(uniqueUsername, password);
      await expect(settingsPage.settingsMenu).toBeVisible();
      await expect(settingsPage.profileSettings).toContainText(uniqueUsername);
    });
  });
});