export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
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
  createdAt: Date;
  updatedAt: Date;
}
