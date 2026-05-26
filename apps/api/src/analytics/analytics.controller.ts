import { Controller, Get, Query, Request } from '@nestjs/common';
import { AnalyticsService } from '../common/services/analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('user')
  async getUserStats(@Request() req: any) {
    return this.analyticsService.getUserStats(req.user.userId);
  }

  @Get('global')
  async getGlobalStats() {
    return this.analyticsService.getGlobalStats();
  }

  @Get('activity')
  async getActivityStats(@Query('days') days: string = '7') {
    return this.analyticsService.getActivityStats(parseInt(days));
  }
}
