import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class LoginInputDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterInputDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty()
  @MaxLength(225)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @MaxLength(225)
  @IsNotEmpty()
  lastName: string;
}

export class VerifyInputDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
}

export class ResetPasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(225)
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(225)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  newPassword: string;
}
