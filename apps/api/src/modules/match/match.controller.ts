import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('check')
  async checkAndCreateMatch(
    @Body() body: { userAId: string; userBId: string },
  ) {
    return this.matchService.checkAndCreateMatch(body.userAId, body.userBId);
  }

  @Get(':userId')
  async getUserMatches(@Param('userId') userId: string) {
    return this.matchService.getUserMatches(userId);
  }
}
