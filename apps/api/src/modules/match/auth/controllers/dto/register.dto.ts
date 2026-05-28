import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @IsString()
  @MinLength(3)
  username!: string;

  @IsEmail()
  email!: string;

  @IsDateString()
  birthDate!: string;

  @IsString()
  otpCode!: string;

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: 'Password must contain uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain number',
  })
  password!: string;
}