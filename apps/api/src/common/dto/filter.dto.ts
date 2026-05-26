import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class FilterDto {
  @IsOptional()
  filters?: Record<string, any>;

  @IsOptional()
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  }[];

  @IsOptional()
  pagination?: {
    page: number;
    limit: number;
  };
}

export class AdvancedFilterDto {
  @IsOptional()
  @IsString()
  accountType?: 'PERSONAL' | 'BUSINESS';

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsString()
  interests?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsNumber()
  teamSizeMin?: number;

  @IsOptional()
  @IsNumber()
  teamSizeMax?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
