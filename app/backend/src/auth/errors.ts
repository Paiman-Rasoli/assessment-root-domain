import { ServerError } from '@app/utils';

enum ERROR_CODES {
  INVALID_LOGIN = 'INVALID_LOGIN',
  NOT_VERIFIED = 'NOT_VERIFIED',
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
