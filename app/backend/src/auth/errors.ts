import { ServerError } from '@app/utils';

enum ERROR_CODES {
  INVALID_LOGIN = 'INVALID_LOGIN',
  NOT_VERIFIED = 'NOT_VERIFIED',
  INVALID_SIGNUP_MODE = 'INVALID_SIGNUP_MODE',
}

export class InvalidLoginCredentials extends ServerError {
  constructor() {
    super(ERROR_CODES.INVALID_LOGIN, `Incorrect email or password`, 401);
  }
}

export class NotVerifiedException extends ServerError {
  constructor() {
    super(ERROR_CODES.NOT_VERIFIED, `Your account has not been verified.`, 401);
  }
}

export class InvalidSignupMode extends ServerError {
  constructor() {
    super(
      ERROR_CODES.INVALID_SIGNUP_MODE,
      `You should login with google.`,
      401
    );
  }
}
