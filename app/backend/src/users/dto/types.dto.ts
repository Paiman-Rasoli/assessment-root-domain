import { ApiProperty } from '@nestjs/swagger';
import { SignupMode } from '../users.domain';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    enum: SignupMode,
  })
  signupMode: SignupMode;

  @ApiProperty()
  createdAt: Date;
}
