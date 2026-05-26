import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${this.configService.get('APP_URL')}/auth/verify?token=${token}`;
    
    console.log(`[Email Service] Sending verification email to ${email}`);
    console.log(`[Email Service] Verification URL: ${verificationUrl}`);
    
    // TODO: Integrate with actual email service (SendGrid, AWS SES, etc.)
    // For now, this logs the verification URL
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${this.configService.get('APP_URL')}/auth/reset-password?token=${token}`;
    
    console.log(`[Email Service] Sending password reset email to ${email}`);
    console.log(`[Email Service] Reset URL: ${resetUrl}`);
    
    // TODO: Integrate with actual email service
  }

  async sendTwoFactorCode(email: string, code: string): Promise<void> {
    console.log(`[Email Service] Sending 2FA code to ${email}: ${code}`);
    
    // TODO: Integrate with actual email service
  }
}
