import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { AuthService } from '../services/auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(body: {
        email: string;
    }): Promise<{
        success: boolean;
        email: string;
        message: string;
    }>;
    register(dto: RegisterDto): Promise<{
        success: boolean;
        access_token: string;
        user: {
            id: string;
            fullname: string | null;
            username: string;
            email: string;
        };
    }>;
    verifyOtp(dto: VerifyOtpDto): {
        success: boolean;
        dto: VerifyOtpDto;
    };
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            fullname: string | null;
            username: string;
            email: string;
        };
    }>;
    checkUsername(username: string): Promise<{
        available: boolean;
    }>;
    getMe(user: any): any;
    getProfile(user: any): any;
}
