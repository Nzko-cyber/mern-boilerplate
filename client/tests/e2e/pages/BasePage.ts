import { Page, Locator, expect } from '@playwright/test';
export class BasePage {
  protected page: Page;
  private Navbar: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.Navbar = page.getByTestId('Navbar');

  }

    async NavigatetoSite() {
    await this.page.goto('localhost:3000');
    
  }


}