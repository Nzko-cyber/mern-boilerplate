// API request/response models for MERN Boilerplate todo app

// AUTH
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LogoutResponse {
  message: string;
}

export interface AuthResponse {
  message: string;
  user?: {
    id: string;
    username: string;
    fullName?: string;
    profilePicture?: string;
    usernameCase?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

// USERS
export interface CheckUsernameRequest {
  username: string;
}

export interface CheckUsernameResponse {
  available: boolean;
  message: string;
  username: string;
}

// TODO
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  user: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTodoRequest {
  text: string;
}

export interface ToggleTodoRequest {
  id: string;
}

export interface UpdateTodoRequest {
  id: string;
  text: string;
}

export interface DeleteTodoRequest {
  id: string;
}

export interface TodoListResponse {
  message: string;
  todos: TodoItem[];
}

export interface TodoResponse {
  message: string;
  todo: TodoItem;
}

export interface SimpleMessageResponse {
  message: string;
}

// USER PROFILE
export interface GetUserResponse {
  message: string;
  user: {
    id?: string;
    username?: string;
    fullName?: string;
    profilePicture?: string;
    usernameCase?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface UpdateUserRequest {
  fullName?: string;
  profilePicture?: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserResponse {
  message: string;
  user?: {
    id?: string;
    username?: string;
    fullName?: string;
    profilePicture?: string;
    usernameCase?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
