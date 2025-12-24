export interface AppError extends Error {
  statusCode: number;
}

export class InternalServerError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  constructor(message: string) {
    this.statusCode = 500;
    this.message = message;
    this.name = "InternalServerError";
  }
}

export class DuplicateEmailError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string = "Email already exists") {
    this.statusCode = 409;
    this.message = message;
    this.name = "DuplicateEmailError";
  }
}

export class UserNotFoundError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string = "User not found") {
    this.statusCode = 400;
    this.message = message;
    this.name = "UserNotFound";
  }
}

export class InvalidCredentialsError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string = "Invalid credentials") {
    this.statusCode = 400;
    this.message = message;
    this.name = "InvalidCredentials";
  }
}

export class UnauthorizedError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string = "Unauthorized") {
    this.statusCode = 401;
    this.message = message;
    this.name = "Unauthorized";
  }
}

export class DuplicateTagsError implements AppError {
  statusCode: number;
  message: string;
  name: string;

  constructor(message: string = "Tags already exists") {
    this.statusCode = 409;
    this.message = message;
    this.name = "DuplicateTagsError";
  }
}
