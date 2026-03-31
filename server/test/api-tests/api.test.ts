import {
  register,
  login,
  logout,
  checkUsername,
  getTodos,
  createTodo,
  toggleTodoComplete,
  updateTodo,
  deleteTodo
} from "../function/api";
import { randomString, sleep } from "../utils";

const environment = {
  validUsername: `testuser${randomString(5)}`,
  validPassword: "password123",
  invalidUsername: "invaliduser",
  invalidPassword: "wrongpass",
  todoText: "Test Todo",
  updatedTodoText: "Updated Test Todo",
  todoId: "",
};

describe("MERN Boilerplate API Tests", () => {
  describe("Auth API Tests", () => {
    describe("Register (POST /auth/register)", () => {
      it(" Register user with valid data", async () => {
        const response = await register({
          username: environment.validUsername,
          password: environment.validPassword,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("User created successfully");
        expect(response.body.user).toBeDefined();
        expect(response.body.user.username).toBe(environment.validUsername.toLowerCase());

        await sleep(1000);
      });

      it("Register user with existing username", async () => {
        const response = await register({
          username: environment.validUsername,
          password: environment.validPassword,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Username exists");
      });
    });

    describe("Login (POST /auth/login)", () => {
      it(" Login with valid credentials", async () => {
        const response = await login({
          username: environment.validUsername,
          password: environment.validPassword,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Logged in successfully");
        expect(response.body.user).toBeDefined();
      });

      it("Login with invalid credentials", async () => {
        const response = await login({
          username: environment.invalidUsername,
          password: environment.invalidPassword,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(401);
      });
    });

    describe("Check Username (POST /users/checkusername)", () => {
      it(" Check available username", async () => {
        const response = await checkUsername({
          username: `available${randomString(5)}`,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.available).toBe(true);
        expect(response.body.message).toBe("Username available");
      });

      it("Check taken username", async () => {
        const response = await checkUsername({
          username: environment.validUsername,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.available).toBe(false);
        expect(response.body.message).toBe("Username exists");
      });
    });

    describe("Logout (POST /auth/logout)", () => {
      it(" Logout user", async () => {
        // First login
        await login({
          username: environment.validUsername,
          password: environment.validPassword,
        });

        const response = await logout();

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Logged out successfully");
      });
    });
  });

  describe("Todo API Tests", () => {
    beforeAll(async () => {
      // Login to get authenticated for todo operations
      await login({
        username: environment.validUsername,
        password: environment.validPassword,
      });
    });

    describe("Create Todo (POST /todos)", () => {
      it(" Create todo with valid data", async () => {
        const response = await createTodo({
          text: environment.todoText,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Todo created successfully");
        expect(response.body.todo).toBeDefined();
        expect(response.body.todo.text).toBe(environment.todoText);
        environment.todoId = response.body.todo.id;

        await sleep(1000);
      });
    });

    describe("Get Todos (GET /todos)", () => {
      it(" Get todos", async () => {
        const response = await getTodos();

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Todos retrieved successfully");
        expect(Array.isArray(response.body.todos)).toBe(true);
        expect(response.body.todos.length).toBeGreaterThan(0);
      });
    });

    describe("Update Todo (PUT /todos)", () => {
      it(" Update todo text", async () => {
        const response = await updateTodo({
          id: environment.todoId,
          text: environment.updatedTodoText,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Updated todo successfully");
        expect(response.body.todo.text).toBe(environment.updatedTodoText);
      });
    });

    describe("Toggle Todo Complete (PUT /todos/complete)", () => {
      it(" Toggle todo completion", async () => {
        const response = await toggleTodoComplete({
          id: environment.todoId,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Toggled complete todo successfully");
        expect(response.body.todo.completed).toBe(true);
      });
    });

    describe("Delete Todo (DELETE /todos)", () => {
      it(" Delete todo", async () => {
        const response = await deleteTodo({
          id: environment.todoId,
        });

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Todo successfully delete");
      });
    });
  });
});