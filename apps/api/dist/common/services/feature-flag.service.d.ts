import { ConfigService } from '@nestjs/config';
export declare class FeatureFlagService {
    private readonly configService;
    private flags;
    constructor(configService: ConfigService);
    private initializeFlags;
    isEnabled(flagKey: string): boolean;
    isDisabled(flagKey: string): boolean;
    setFlag(flagKey: string, enabled: boolean): void;
    getAllFlags(): Record<string, boolean>;
    isUserEnabled(userId: string, flagKey: string): boolean;
    getUserFlags(userId: string): Promise<Record<string, boolean>>;
}
