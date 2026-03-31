import { test, expect } from '@playwright/test';
import { WelcomePage, LoginPage, TodoPage, SettingsPage } from '../../pages';
import { readCredentials } from '../../../support/helper/helpers';

test.describe('Smoke - Todo and Settings', () => {
  test('manages todos and updates profile using credentials from file', async ({ page }) => {
    const credentials = readCredentials();
    const welcomePage = new WelcomePage(page);
    const loginPage = new LoginPage(page);
    const todoPage = new TodoPage(page);
    const settingsPage = new SettingsPage(page);
    const firstTodoText = `todo_${Date.now()}_1`;
    const secondTodoText = `todo_${Date.now()}_2`;
    const editedTodoText = `edited_${Date.now()}`;

    await test.step('logging in with saved credentials', async () => {
      await welcomePage.goto();
      await loginPage.goto();
      await loginPage.login(credentials.username, credentials.password);
      await expect(page.getByText('Success!Logged in successfully')).toBeVisible();
    });

    await test.step('creating todo items', async () => {
      await todoPage.goto();
      await todoPage.addTodo(firstTodoText);
      await todoPage.addTodo(secondTodoText);
      await expect(todoPage.todoItemByText(firstTodoText)).toBeVisible();
      await expect(todoPage.todoItemByText(secondTodoText)).toBeVisible();
    });

    await test.step('editing, toggling and deleting a todo', async () => {
      await todoPage.editTodoByText(secondTodoText, editedTodoText);
      await expect(todoPage.todoItemByText(editedTodoText)).toBeVisible();
      await todoPage.toggleTodoByText(editedTodoText);
      await todoPage.deleteTodoByText(editedTodoText);
      await expect(todoPage.todoItemByText(editedTodoText)).toHaveCount(0);
    });

    await test.step('updating user profile in settings', async () => {
      await settingsPage.goto();
      await settingsPage.updateProfile('changedfirstname_${Date.now()}', 'changedlastname_${Date.now()}', 'changedbio_${Date.now()}');
      await expect(page.locator('#app')).toContainText('Success!User successfully updated');
    });
  });
});