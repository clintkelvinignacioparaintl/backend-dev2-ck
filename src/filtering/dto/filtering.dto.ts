import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterUsersDto {
  @IsEnum(['PERSONAL', 'BUSINESS'])
  @IsOptional()
  accountType?: 'PERSONAL' | 'BUSINESS';

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];

  @IsString()
  @IsOptional()
  industry?: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  teamSizeMin?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  teamSizeMax?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}

export class FilterMatchesDto {
  @IsEnum(['ACTIVE', 'BLOCKED', 'UNMATCHED'])
  @IsOptional()
  status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED';

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}

export class FilterMessagesDto {
  @IsEnum(['TEXT', 'IMAGE', 'FILE'])
  @IsOptional()
  type?: 'TEXT' | 'IMAGE' | 'FILE';

  @IsBoolean()
  @IsOptional()
  isSeen?: boolean;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}
