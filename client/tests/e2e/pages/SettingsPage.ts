import { Page, Locator, expect } from '@playwright/test';

export class SettingsPage {
  private page: Page;

  readonly settingsMenu: Locator;
  readonly profileSettings: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly bioTextbox: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsMenu = page.getByTestId('settings-menu');
    this.profileSettings = page.getByTestId('profile-settings');
    this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' });
    this.bioTextbox = page.getByRole('textbox', { name: 'Bio' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    await expect(this.page.getByRole('link', { name: 'Settings' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Settings' }).click();
    await expect(this.settingsMenu).toBeVisible();
  }

  async updateProfile(firstName: string, lastName: string, bio: string) {
    await expect(this.firstNameTextbox).toBeVisible();
    await this.firstNameTextbox.fill(firstName);
    await expect(this.lastNameTextbox).toBeVisible();
    await this.lastNameTextbox.fill(lastName);
    await expect(this.bioTextbox).toBeVisible();
    await this.bioTextbox.fill(bio);
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
  }
}