import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username!: string;

  @IsEnum(['PERSONAL', 'BUSINESS'])
  accountType!: 'PERSONAL' | 'BUSINESS';
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}
