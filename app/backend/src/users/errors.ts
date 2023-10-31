import { ServerError } from '@app/utils';

enum ERROR_CODES {
  DUPLICATE_USER = 'DUPLICATE_USER',
}

export class DuplicateUserException extends ServerError {
  constructor(email: string) {
    super(
      ERROR_CODES.DUPLICATE_USER,
      `User with email ${email} already exist.`,
      500
    );
  }
}
