import { ServerError } from '../server-error';

export class InvalidGoogleVerificationCodeException extends ServerError {
  constructor(code: string) {
    super(
      `GOOGLE_VERIFICATION_CODE`,
      `Invalid verification code! ${code}`,
      401
    );
  }
}

export class GoogleSigninUnExpectedException extends ServerError {
  constructor(message: string, status: number) {
    super(`GOOGLE_UNEXPECTED_ERROR`, message, status);
  }
}
