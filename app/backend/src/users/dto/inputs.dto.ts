import { SignupMode } from '../users.domain';

export interface UserCreateInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  signupMode: SignupMode;
}
