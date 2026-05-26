import { Controller, Post, Body, Request } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';

@Controller('two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @Post('enable')
  async enableTwoFactor(@Request() req: any) {
    return this.twoFactorService.enableTwoFactor(req.user.userId);
  }

  @Post('confirm')
  async confirmTwoFactor(@Request() req: any, @Body('token') token: string) {
    return this.twoFactorService.confirmTwoFactor(req.user.userId, token);
  }

  @Post('disable')
  async disableTwoFactor(@Request() req: any, @Body('password') password: string) {
    return this.twoFactorService.disableTwoFactor(req.user.userId, password);
  }

  @Post('verify')
  async verifyTwoFactorToken(@Request() req: any, @Body('token') token: string) {
    return this.twoFactorService.verifyTwoFactorToken(req.user.userId, token);
  }
}
