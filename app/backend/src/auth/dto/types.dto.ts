import { Status, SignupMode } from '../../users/users.domain';

export class VerifiedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  SignupMode?: SignupMode;
  status: Status;
  isActive: boolean;
  createdAt: Date;
  access_token: string;
}
