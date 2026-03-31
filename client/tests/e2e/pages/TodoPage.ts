import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  private page: Page;

  readonly addTextbox: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addTextbox = page.getByRole('textbox');
    this.addButton = page.getByRole('button', { name: 'Add' });
  }

  async goto() {
    await expect(this.page.getByRole('link', { name: 'Todo' })).toBeVisible();
    await this.page.getByRole('link', { name: 'Todo' }).click();
    await expect(this.addTextbox).toBeVisible();
  }

  todoItem(index: number) {
    return this.page.getByTestId(`todo-${index}`);
  }

  todoToggle(index: number) {
    return this.page.getByTestId(`todo-toggle-${index}`);
  }

  todoEdit(index: number) {
    return this.page.getByTestId(`todo-edit-${index}`);
  }

  todoTextarea(index: number) {
    return this.page.getByTestId(`todo-textarea-${index}`);
  }

  todoSave(index: number) {
    return this.page.getByTestId(`todo-save-${index}`);
  }

  todoDelete(index: number) {
    return this.page.getByTestId(`todo-delete-${index}`);
  }

  todoText(index: number) {
    return this.page.getByTestId(`todo-text-${index}`);
  }

  todoItemByText(text: string) {
    return this.page.locator('li[data-testid^="todo-"]', { hasText: text }).first();
  }

  async addTodo(text: string) {
    await expect(this.addTextbox).toBeVisible();
    await this.addTextbox.fill(text);
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();
  }

  async editTodo(index: number, newText: string) {
    await this.todoEdit(index).click();
    await this.todoTextarea(index).fill(newText);
    await this.todoSave(index).click();
  }

  async toggleTodo(index: number) {
    await this.todoToggle(index).click();
  }

  async deleteTodo(index: number) {
    await this.todoDelete(index).click();
    await this.todoItem(index).getByText('Delete', { exact: true }).click();
  }

  async editTodoByText(currentText: string, newText: string) {
    const itemByText = this.todoItemByText(currentText);
    await expect(itemByText).toBeVisible();

    // Capture a stable test id before text changes, then re-locate by that id.
    const itemTestId = await itemByText.getAttribute('data-testid');
    if (!itemTestId) {
      throw new Error(`Could not resolve todo item test id for text: ${currentText}`);
    }

    const item = this.page.getByTestId(itemTestId);
    await item.locator('[data-testid^="todo-edit-"]').first().click();
    const textarea = item.locator('[data-testid^="todo-textarea-"]').first();
    await expect(textarea).toBeVisible();
    await textarea.fill(newText);
    const saveButton = item.locator('[data-testid^="todo-save-"]').first();
    await expect(saveButton).toBeVisible();
    await saveButton.click();
  }

  async toggleTodoByText(text: string) {
    const item = this.todoItemByText(text);
    await expect(item).toBeVisible();
    await item.locator('[data-testid^="todo-toggle-"]').first().click();
  }

  async deleteTodoByText(text: string) {
    const item = this.todoItemByText(text);
    await expect(item).toBeVisible();
    await item.locator('[data-testid^="todo-delete-"]').click();
    await item.getByText('Delete', { exact: true }).click();
  }
}