export enum Scope {
  EMAIL_VERIFY = 'EMAIL_VERIFY',
}

export interface OneTimeVerificationCodeDomain {
  userId: number;
  code: number;
  createdAt: Date;
  scope: Scope;
}
