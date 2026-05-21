import { Controller, Get, Query, Request } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('user')
  async getUserFeed(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('feedType') feedType?: 'all' | 'matches' | 'profiles',
  ): Promise<any> {
    return this.feedService.getUserFeed(req.user?.userId || 'anonymous', {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      feedType,
    });
  }

  @Get('global')
  async getGlobalFeed(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<any> {
    return this.feedService.getGlobalFeed({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('activity')
  async getActivityFeed(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.feedService.getActivityFeed(req.user?.userId || 'anonymous', {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }
}
