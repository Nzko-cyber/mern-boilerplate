import { Page } from '@playwright/test';

export class LostPage {
  constructor(private page: Page) {}

  get lostMessage() {
    return this.page.getByText('Lost Page'); 
  }
}