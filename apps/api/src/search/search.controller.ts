import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from '../common/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('profiles/personal')
  async searchPersonalProfiles(@Query('q') query: string, @Query('limit') limit: string = '20') {
    return this.searchService.searchPersonalProfiles(query, parseInt(limit));
  }

  @Get('profiles/business')
  async searchBusinessProfiles(@Query('q') query: string, @Query('limit') limit: string = '20') {
    return this.searchService.searchBusinessProfiles(query, parseInt(limit));
  }

  @Get('users')
  async searchUsers(@Query('q') query: string, @Query('limit') limit: string = '20') {
    return this.searchService.searchUsers(query, parseInt(limit));
  }

  @Get('fulltext')
  async fullTextSearch(@Query('q') query: string, @Query('limit') limit: string = '20') {
    return this.searchService.fullTextSearch(query, parseInt(limit));
  }
}
