import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('conversations/:conversationId')
  async getConversation(@Param('conversationId') conversationId: string) {
    return this.chatService.getConversation(conversationId);
  }

  @Get('conversations')
  async getConversationByMatchId(@Query('matchId') matchId: string) {
    return this.chatService.getConversationByMatchId(matchId);
  }

  @Post('conversations')
  async createConversation(@Body('matchId') matchId: string) {
    return this.chatService.createConversation(matchId);
  }

  @Get('messages/:conversationId')
  async getMessages(
    @Param('conversationId') conversationId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '50',
  ) {
    return this.chatService.getMessages(
      conversationId,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Post('messages')
  async sendMessage(
    @Body()
    body: {
      conversationId: string;
      senderId: string;
      content: string;
      type?: 'TEXT' | 'IMAGE' | 'FILE';
    },
  ) {
    return this.chatService.sendMessage(
      body.conversationId,
      body.senderId,
      body.content,
      body.type || 'TEXT',
    );
  }

  @Post('messages/:messageId/seen')
  async markMessageAsSeen(
    @Param('messageId') messageId: string,
    @Request() req,
  ) {
    return this.chatService.markMessageAsSeen(messageId, req.user.userId);
  }

  @Post('conversations/:conversationId/seen')
  async markConversationAsSeen(
    @Param('conversationId') conversationId: string,
    @Request() req,
  ) {
    return this.chatService.markConversationAsSeen(
      conversationId,
      req.user.userId,
    );
  }

  @Get('unread')
  async getUnreadMessageCount(@Request() req) {
    return this.chatService.getUnreadMessageCount(req.user.userId);
  }

  @Delete('messages/:messageId')
  async deleteMessage(@Param('messageId') messageId: string, @Request() req) {
    return this.chatService.deleteMessage(messageId, req.user.userId);
  }
}
