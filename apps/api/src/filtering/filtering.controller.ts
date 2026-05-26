import { Controller, Get, Query } from '@nestjs/common';
import { FilteringService } from './filtering.service';

@Controller('filter')
export class FilteringController {
  constructor(private readonly filteringService: FilteringService) {}

  @Get('users')
  async filterUsers(
    @Query('accountType') accountType?: 'PERSONAL' | 'BUSINESS',
    @Query('location') location?: string,
    @Query('skills') skills?: string,
    @Query('interests') interests?: string,
    @Query('industry') industry?: string,
    @Query('teamSizeMin') teamSizeMin?: string,
    @Query('teamSizeMax') teamSizeMax?: string,
    @Query('isActive') isActive?: string,
    @Query('isVerified') isVerified?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.filteringService.filterUsers({
      accountType,
      location,
      skills: skills ? skills.split(',') : undefined,
      interests: interests ? interests.split(',') : undefined,
      industry,
      teamSizeMin: teamSizeMin ? parseInt(teamSizeMin) : undefined,
      teamSizeMax: teamSizeMax ? parseInt(teamSizeMax) : undefined,
      isActive: isActive ? isActive === 'true' : undefined,
      isVerified: isVerified ? isVerified === 'true' : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('matches/:userId')
  async filterMatches(
    @Query('userId') userId: string,
    @Query('status') status?: 'ACTIVE' | 'BLOCKED' | 'UNMATCHED',
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.filteringService.filterMatches(userId, {
      status,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('messages/:conversationId')
  async filterMessages(
    @Query('conversationId') conversationId: string,
    @Query('type') type?: 'TEXT' | 'IMAGE' | 'FILE',
    @Query('isSeen') isSeen?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.filteringService.filterMessages(conversationId, {
      type,
      isSeen: isSeen ? isSeen === 'true' : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }
}
