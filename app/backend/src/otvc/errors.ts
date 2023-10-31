import { ServerError } from '@app/utils';

enum ErrorCodes {
  INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
}

export class InvalidOtvcCodeException extends ServerError {
  constructor(reason: string) {
    super(ErrorCodes.INVALID_VERIFICATION_CODE, `Invalid code ${reason}`, 403);
  }
}
