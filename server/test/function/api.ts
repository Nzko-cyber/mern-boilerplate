import pactum from 'pactum';
import {
  RegisterRequest,
  LoginRequest,
  CheckUsernameRequest,
  CreateTodoRequest,
  UpdateTodoRequest,
  ToggleTodoRequest,
  DeleteTodoRequest
} from '../interfaces/interface';

const BASE_URL = "http://localhost:3000/api";
let sessionCookie = '';

function withSession(spec: any) {
  if (sessionCookie) {
    return spec.withHeaders('Cookie', sessionCookie);
  }
  return spec;
}

export async function register(postData: RegisterRequest) {
  try {
    const response = await pactum.spec()
      .post(`${BASE_URL}/auth/register`)
      .withHeaders({
        'Content-Type': 'application/json',
      })
      .withJson(postData)
      .toss();

    console.log(` User registered: ${postData.username}`);
    return response;
  } catch (error: any) {
    console.error(" Error on registering user:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function login(postData: LoginRequest) {
  try {
    const response = await pactum.spec()
      .post(`${BASE_URL}/auth/login`)
      .withHeaders({
        'Content-Type': 'application/json',
      })
      .withJson(postData)
      .toss();

    const setCookieHeader = response?.headers?.['set-cookie']?.[0];
    if (setCookieHeader) {
      sessionCookie = setCookieHeader.split(';')[0];
    }

    console.log(` User logged in: ${postData.username}`);
    return response;
  } catch (error: any) {
    console.error(" Error on logging in:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function logout() {
  try {
    const response = await withSession(pactum.spec())
      .post(`${BASE_URL}/auth/logout`)
      .toss();

    sessionCookie = '';

    console.log(` User logged out`);
    return response;
  } catch (error: any) {
    console.error(" Error on logging out:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function checkUsername(postData: CheckUsernameRequest) {
  try {
    const response = await pactum.spec()
      .post(`${BASE_URL}/users/checkusername`)
      .withHeaders({
        'Content-Type': 'application/json',
      })
      .withJson(postData)
      .toss();

    console.log(` Username checked: ${postData.username}, available: ${response.body.available}`);
    return response;
  } catch (error: any) {
    console.error(" Error on checking username:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function getTodos() {
  try {
    const response = await withSession(pactum.spec())
      .get(`${BASE_URL}/todos`)
      .toss();

    console.log(` Todos retrieved: ${response.body.todos?.length || 0} todos`);
    return response;
  } catch (error: any) {
    console.error(" Error on getting todos:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function createTodo(postData: CreateTodoRequest) {
  try {
    const response = await withSession(pactum.spec())
      .post(`${BASE_URL}/todos`)
      .withHeaders({
        'Content-Type': 'application/json',
      })
      .withJson(postData)
      .toss();

    console.log(` Todo created: ${postData.text}`);
    return response;
  } catch (error: any) {
    console.error(" Error on creating todo:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function toggleTodoComplete(postData: ToggleTodoRequest) {
  try {
    const response = await withSession(pactum.spec())
      .put(`${BASE_URL}/todos/complete`)
      .withHeaders({
        'Content-Type': 'application/json',
      })
      .withJson(postData)
      .toss();

    console.log(` Todo toggled complete: ${postData.id}`);
    return response;
  } catch (error: any) {
    console.error(" Error on toggling todo complete:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function updateTodo(postData: UpdateTodoRequest) {
  try {
    const response = await withSession(pactum.spec())
      .put(`${BASE_URL}/todos`)
      .withHeaders({
        'Content-Type': 'application/json',
      })
      .withJson(postData)
      .toss();

    console.log(` Todo updated: ${postData.id}`);
    return response;
  } catch (error: any) {
    console.error(" Error on updating todo:", error);
    return { error: true, message: error.message, details: error };
  }
}

export async function deleteTodo(postData: DeleteTodoRequest) {
  try {
    const response = await withSession(pactum.spec())
      .delete(`${BASE_URL}/todos`)
      .withHeaders({
        'Content-Type': 'application/json',
      })
      .withJson(postData)
      .toss();

    console.log(` Todo deleted: ${postData.id}`);
    return response;
  } catch (error: any) {
    console.error(" Error on deleting todo:", error);
    return { error: true, message: error.message, details: error };
  }
}