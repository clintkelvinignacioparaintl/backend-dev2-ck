import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMatchDto {
  @IsString()
  userOneId!: string;

  @IsString()
  userTwoId!: string;
}

export class UpdateMatchDto {
  @IsEnum(['ACTIVE', 'BLOCKED', 'UNMATCHED'])
  @IsOptional()
  status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED';
}

export class GetMatchesDto {
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
