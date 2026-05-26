import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import {
  NotificationService,
  NotificationType,
  CreateNotificationDto,
} from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.notificationService.getUserNotifications(
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Get(':userId/unread')
  async getUnreadCount(@Param('userId') userId: string) {
    const count = await this.notificationService.getUnreadCount(userId);
    return { count };
  }

  @Post()
  async createNotification(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Put(':notificationId/read/:userId')
  async markAsRead(
    @Param('notificationId') notificationId: string,
    @Param('userId') userId: string,
  ) {
    return this.notificationService.markAsRead(notificationId, userId);
  }

  @Put(':userId/read-all')
  async markAllAsRead(@Param('userId') userId: string) {
    await this.notificationService.markAllAsRead(userId);
    return { success: true };
  }

  @Delete(':notificationId/:userId')
  async deleteNotification(
    @Param('notificationId') notificationId: string,
    @Param('userId') userId: string,
  ) {
    await this.notificationService.deleteNotification(notificationId, userId);
    return { success: true };
  }

  @Post('match/:userId/:matchedUserId')
  async sendMatchNotification(
    @Param('userId') userId: string,
    @Param('matchedUserId') matchedUserId: string,
  ) {
    return this.notificationService.sendMatchNotification(
      userId,
      matchedUserId,
    );
  }

  @Post('message/:userId')
  async sendMessageNotification(
    @Param('userId') userId: string,
    @Body() body: { conversationId: string; senderName: string },
  ) {
    return this.notificationService.sendMessageNotification(
      userId,
      body.conversationId,
      body.senderName,
    );
  }

  @Post('swipe/:userId')
  async sendSwipeNotification(
    @Param('userId') userId: string,
    @Body() body: { swiperName: string },
  ) {
    return this.notificationService.sendSwipeNotification(
      userId,
      body.swiperName,
    );
  }

  @Post('profile-view/:userId')
  async sendProfileViewNotification(
    @Param('userId') userId: string,
    @Body() body: { viewerName: string },
  ) {
    return this.notificationService.sendProfileViewNotification(
      userId,
      body.viewerName,
    );
  }
}
