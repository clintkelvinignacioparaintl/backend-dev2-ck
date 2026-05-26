import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Public()
  @Post('send')
  async sendVerificationEmail(@Body('email') email: string) {
    return this.emailVerificationService.sendVerificationEmail(email);
  }

  @Public()
  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    return this.emailVerificationService.verifyEmail(token);
  }
}
