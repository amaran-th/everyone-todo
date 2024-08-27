/* eslint-disable max-classes-per-file */
import { AxiosError } from "axios";

export class ApplicationError extends Error {
  originalError?: AxiosError<any>;

  constructor(error?: AxiosError, message?: string) {
    super();
    this.originalError = error;
    this.name = "ApplicationError";
    this.message = message ? message : "ApplicationError";
  }
}

export class BusinessError extends Error {
  originalError?: AxiosError<any>;

  constructor(error?: AxiosError, message?: string) {
    super();
    this.originalError = error;
    this.name = "BusinessError";
    this.message = message ? message : "MemberRoleNotMatchedError";
  }
}

export class AuthError extends BusinessError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = "AuthError";
    this.message = message ? message : "MemberRoleNotMatchedError";
  }
}

export class AlreadyExistError extends AuthError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = "AlreadyExistError";
    this.message = message ? message : "AlreadyExistNicknameError";
  }
}

export class UnauthorizedError extends AuthError {
  constructor(error?: AxiosError, message?: string) {
    super(error, message);
    this.name = "UnauthorizedError";
    this.message = message ? message : "MemberRoleNotMatchedError";
  }
}

export const categorizeError = (error: Error) => {
  if (error instanceof AxiosError && error.response) {
    if (error.response.status === 401) {
      return new UnauthorizedError(error, error.response.data.message);
    }

    if (error.response.status === 409) {
      return new AlreadyExistError(error, error.response.data.message);
    }

    if (error.response.status >= 400 && error.response.status < 500) {
      return new BusinessError(error, error.response.data.message);
    }

    if (error.response.status >= 500) {
      return new ApplicationError(error, error.response.data.message);
    }
  }
  return error;
};

export const deserializeError = (error: Error) => {
  switch (error.message) {
    case "UnauthorizedError":
      return new UnauthorizedError();
    case "BusinessError":
      return new BusinessError();
    case "ApplicationError":
      return new ApplicationError();
    default:
      return error;
  }
};
