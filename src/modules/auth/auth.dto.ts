import {
  IsEmail,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @MinLength(3)
  @MaxLength(50)
  firstName: string;

  @MinLength(3)
  @MaxLength(50)
  lastName: string;
}

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
