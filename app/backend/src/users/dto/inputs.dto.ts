import { ApiProperty } from '@nestjs/swagger';
import { SignupMode } from '../users.domain';
import { IsNotEmpty, MaxLength } from 'class-validator';

export interface UserCreateInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  signupMode: SignupMode;
}

export class UpdateInputDto {
  @ApiProperty()
  @MaxLength(255)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @MaxLength(255)
  @IsNotEmpty()
  lastName: string;
}
