export type User = {
  id: number;
  firstName: string;
  lastName: string;
  signupMode?: "EMAIL" | "GOOGLE";
  email: string;
  createdAt: Date;
};
