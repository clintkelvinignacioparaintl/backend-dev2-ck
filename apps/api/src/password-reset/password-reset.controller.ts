import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Public()
  @Post('request')
  async requestPasswordReset(@Body('email') email: string) {
    return this.passwordResetService.requestPasswordReset(email);
  }

  @Public()
  @Post('reset')
  async resetPassword(@Body('token') token: string, @Body('newPassword') newPassword: string) {
    return this.passwordResetService.resetPassword(token, newPassword);
  }
}
