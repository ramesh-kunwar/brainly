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
