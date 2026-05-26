import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  matchId!: string;
}

export class GetMessagesDto {
  @IsString()
  @IsNotEmpty()
  conversationId!: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 50;
}

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  conversationId!: string;

  @IsString()
  @IsNotEmpty()
  senderId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content!: string;

  @IsEnum(['TEXT', 'IMAGE', 'FILE'])
  @IsOptional()
  type?: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT';
}

export class MarkMessageAsSeenDto {
  @IsString()
  @IsNotEmpty()
  messageId!: string;
}

export class MarkConversationAsSeenDto {
  @IsString()
  @IsNotEmpty()
  conversationId!: string;
}
