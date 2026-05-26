import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        error: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: {
            id: string;
            email: string;
            username: string;
        };
        token: string;
        error?: undefined;
    }>;
}
