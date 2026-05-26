import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<{
        id: string;
        email: string;
        username: string;
        password: string;
        name: string | null;
        isActive: boolean;
        isBanned: boolean;
        isVerified: boolean;
        currentMode: string;
        profileImageUrl: string | null;
        logoUrl: string | null;
        createdAt: Date;
    }[]>;
}
