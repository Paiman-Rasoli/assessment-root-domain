export type User = {
  id: number;
  firstName: string;
  lastName: string;
  signupMode?: "EMAIL" | "GOOGLE";
  email: string;
  createdAt: Date;
};

export type UpdateInput = Pick<User, "firstName" | "lastName">;

export type AnalyticResult = {
  totalActiveSignup: number;

  totalActiveToday: number;
  averageActivePastSevenDays: number;
};
