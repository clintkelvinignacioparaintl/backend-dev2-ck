import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendOtpEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"PARAPair Security" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: 'Your PARAPair Verification Code',

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#0EA5A5;">
            Verify Your Account
          </h2>

          <p>
            Your OTP verification code is:
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #FF7A00;
            margin: 20px 0;
          ">
            ${otp}
          </div>

          <p>
            This code expires in 5 minutes.
          </p>

          <p style="color: gray; font-size: 12px;">
            If you didn't request this,
            please ignore this email.
          </p>
        </div>
      `,
    });
  }
}