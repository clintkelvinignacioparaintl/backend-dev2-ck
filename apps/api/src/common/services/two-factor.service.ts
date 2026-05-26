import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class TwoFactorService {
  generateSecret(): string {
    return speakeasy.generateSecret({ length: 32 }).base32;
  }

  generateQRCode(secret: string, email: string): string {
    return speakeasy.otpauthURL({
      secret,
      label: `YourApp (${email})`,
      issuer: 'YourApp',
    });
  }

  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2,
    });
  }
}
