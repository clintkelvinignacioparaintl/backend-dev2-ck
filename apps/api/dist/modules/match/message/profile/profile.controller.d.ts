import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    saveInterests(user: any, body: {
        interests: string[];
    }): Promise<{
        success: boolean;
    }>;
}
