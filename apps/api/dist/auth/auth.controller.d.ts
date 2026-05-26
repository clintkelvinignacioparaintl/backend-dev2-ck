import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
