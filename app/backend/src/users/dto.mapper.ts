import { User } from './dto/types.dto';
import { UsersDomain } from './users.domain';

export const mapDomainToDto = (input: UsersDomain): User => {
  if (!input) return null;

  return {
    id: input.id,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    signupMode: input.signupMode,
    createdAt: input.createdAt,
  };
};
