import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DiscoverUsersDto {
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

  @IsEnum(['PERSONAL', 'BUSINESS'])
  @IsOptional()
  accountType?: 'PERSONAL' | 'BUSINESS';

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}

export class GetRandomUsersDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  count?: number = 10;
}

export class GetRecommendedUsersDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}
