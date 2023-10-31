export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISABLED = 'DISABLED',
}

export enum SignupMode {
  'EMAIL' = 'EMAIL',
  'GOOGLE' = 'GOOGLE',
}

export interface UsersDomain {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  status: Status;
  signupMode: SignupMode;
  createdAt: string;
  updatedAt: string;
}
