"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async sendOtpEmail(email, otp) {
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
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map