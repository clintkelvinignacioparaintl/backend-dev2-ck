export declare class MailService {
    private transporter;
    sendOtpEmail(email: string, otp: string): Promise<void>;
}
