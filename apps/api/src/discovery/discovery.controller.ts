import { Controller, Get, Query, Request } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';

@Controller('discovery')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get('users')
  async discoverUsers(
    @Request() req,
    @Query('location') location?: string,
    @Query('skills') skills?: string,
    @Query('interests') interests?: string,
    @Query('accountType') accountType?: 'PERSONAL' | 'BUSINESS',
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.discoveryService.discoverUsers(
      req.user?.userId || 'anonymous',
      {
        location,
        skills: skills ? skills.split(',') : undefined,
        interests: interests ? interests.split(',') : undefined,
        accountType,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
      },
    );
  }

  @Get('random')
  async getRandomUsers(@Request() req, @Query('count') count?: string) {
    return this.discoveryService.getRandomUsers(
      req.user?.userId || 'anonymous',
      count ? parseInt(count) : 10,
    );
  }

  @Get('recommended')
  async getRecommendedUsers(@Request() req, @Query('limit') limit?: string) {
    return this.discoveryService.getRecommendedUsers(
      req.user?.userId || 'anonymous',
      limit ? parseInt(limit) : 20,
    );
  }
}
