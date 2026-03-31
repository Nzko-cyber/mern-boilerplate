import { test, expect } from '@playwright/test';
import { WelcomePage, LoginPage } from '../../pages';
import { readCredentials } from '../../../support/helper/helpers';

test.describe('Smoke - Login', () => {
  test('logs in with credentials from test-credentials.json', async ({ page }) => {
    const credentials = readCredentials();
    const welcomePage = new WelcomePage(page);
    const loginPage = new LoginPage(page);

    await welcomePage.goto();
    await loginPage.goto();

    await test.step('checking login elements', async () => {
      await expect(loginPage.loginPanel).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.usernameTextbox).toBeVisible();
      await expect(loginPage.passwordTextbox).toBeVisible();
      await expect(loginPage.createAccountLink).toBeVisible();
      await expect(loginPage.rememberMeText).toBeVisible();
    });

    await test.step('logging in with saved credentials', async () => {
      await loginPage.login(credentials.username, credentials.password);
      await expect(page.getByText('Success!Logged in successfully')).toBeVisible();
      await expect(page.getByText('Home Page')).toBeVisible();
    });
  });
});