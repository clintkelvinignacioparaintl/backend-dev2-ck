import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUserFeedDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;

  @IsEnum(['all', 'matches', 'profiles'])
  @IsOptional()
  feedType?: 'all' | 'matches' | 'profiles' = 'all';
}

export class GetGlobalFeedDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}

export class GetActivityFeedDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 20;
}
