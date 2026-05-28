/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // =========================================
  // USER METHODS
  // =========================================

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username: username.toLowerCase().trim(),
      },
    });
  }

  async createUser(data: {
    fullname: string;
    username: string;
    email: string;
    passwordHash: string;
    birthDate: Date;
  }) {
    return this.prisma.user.create({
      data: {
        name: data.fullname.trim(),

        username: data.username.toLowerCase().trim(),

        email: data.email.toLowerCase().trim(),

        password: data.passwordHash,
      },
    });
  }

  // =========================================
  // OTP METHODS
  // =========================================

  async createOtp(data: { email: string; otpHash: string; expiresAt: Date }) {
    return this.prisma.otpVerification.create({
      data: {
        email: data.email.toLowerCase().trim(),
        otpHash: data.otpHash,
        expiresAt: data.expiresAt,
      },
    });
  }

  async findOtpByEmail(email: string) {
    return this.prisma.otpVerification.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markOtpVerified(email: string) {
    return this.prisma.otpVerification.updateMany({
      where: {
        email: email.toLowerCase().trim(),
      },
      data: {
        verified: true,
      },
    });
  }

  async findVerifiedOtp(email: string) {
    return this.prisma.otpVerification.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        verified: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async deleteOtpByEmail(email: string) {
    return this.prisma.otpVerification.deleteMany({
      where: {
        email: email.toLowerCase().trim(),
      },
    });
  }
}