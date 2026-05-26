import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBusinessProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  companyName!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  teamSize?: number;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  services?: string[];

  @IsString()
  @IsOptional()
  companyLogoUrl?: string;
}

export class UpdateBusinessProfileDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  companyName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  teamSize?: number;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  services?: string[];

  @IsString()
  @IsOptional()
  companyLogoUrl?: string;
}

export class SearchBusinessProfilesDto {
  @IsString()
  query!: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}

export class GetBusinessProfilesByIndustryDto {
  @IsString()
  industry!: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}

export class GetBusinessProfilesByLocationDto {
  @IsString()
  location!: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}

export class GetBusinessProfilesByTeamSizeDto {
  @Transform(({ value }) => parseInt(value))
  minSize!: number;

  @Transform(({ value }) => parseInt(value))
  maxSize!: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}
