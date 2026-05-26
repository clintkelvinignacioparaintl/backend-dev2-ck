import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';

@Controller('profiles/users')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':userId')
  async getUserProfile(@Param('userId') userId: string) {
    return this.userProfileService.getUserProfile(userId);
  }

  @Post()
  async createUserProfile(@Body() body: any) {
    return this.userProfileService.createUserProfile(body.userId, body);
  }

  @Put(':userId')
  async updateUserProfile(@Param('userId') userId: string, @Body() body: any) {
    return this.userProfileService.updateUserProfile(userId, body);
  }

  @Delete(':userId')
  async deleteUserProfile(@Param('userId') userId: string) {
    return this.userProfileService.deleteUserProfile(userId);
  }

  @Get('search/:query')
  async searchProfiles(
    @Param('query') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.userProfileService.searchProfiles(
      query,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('location/:location')
  async getProfilesByLocation(
    @Param('location') location: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.userProfileService.getProfilesByLocation(
      location,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('skill/:skill')
  async getProfilesBySkill(
    @Param('skill') skill: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.userProfileService.getProfilesBySkill(
      skill,
      parseInt(page),
      parseInt(limit),
    );
  }
}
