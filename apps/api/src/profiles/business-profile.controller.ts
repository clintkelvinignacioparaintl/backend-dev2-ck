import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BusinessProfileService } from './business-profile.service';

@Controller('profiles/business')
export class BusinessProfileController {
  constructor(
    private readonly businessProfileService: BusinessProfileService,
  ) {}

  @Get(':userId')
  async getBusinessProfile(@Param('userId') userId: string) {
    return this.businessProfileService.getBusinessProfile(userId);
  }

  @Post()
  async createBusinessProfile(@Body() body: any) {
    return this.businessProfileService.createBusinessProfile(body.userId, body);
  }

  @Put(':userId')
  async updateBusinessProfile(
    @Param('userId') userId: string,
    @Body() body: any,
  ) {
    return this.businessProfileService.updateBusinessProfile(userId, body);
  }

  @Delete(':userId')
  async deleteBusinessProfile(@Param('userId') userId: string) {
    return this.businessProfileService.deleteBusinessProfile(userId);
  }

  @Get('search/:query')
  async searchBusinessProfiles(
    @Param('query') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.businessProfileService.searchBusinessProfiles(
      query,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('industry/:industry')
  async getBusinessProfilesByIndustry(
    @Param('industry') industry: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.businessProfileService.getBusinessProfilesByIndustry(
      industry,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('location/:location')
  async getBusinessProfilesByLocation(
    @Param('location') location: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.businessProfileService.getBusinessProfilesByLocation(
      location,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('team-size')
  async getBusinessProfilesByTeamSize(
    @Query('minSize') minSize: string,
    @Query('maxSize') maxSize: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.businessProfileService.getBusinessProfilesByTeamSize(
      parseInt(minSize),
      parseInt(maxSize),
      parseInt(page),
      parseInt(limit),
    );
  }
}
