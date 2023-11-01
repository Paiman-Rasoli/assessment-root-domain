import { Status, SignupMode } from '../../users/users.domain';

export class VerifiedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  signupMode?: SignupMode;
  status: Status;
  isActive: boolean;
  createdAt: Date;
  access_token: string;
}

export class GoogleResponse {
  errorCode?: string;
  accessToken?: string;
}
