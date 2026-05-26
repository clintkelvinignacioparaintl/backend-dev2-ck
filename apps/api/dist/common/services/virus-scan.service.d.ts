import { ConfigService } from '@nestjs/config';
export declare class VirusScanService {
    private readonly configService;
    constructor(configService: ConfigService);
    scanFile(file: any): Promise<{
        clean: boolean;
        threats: string[];
    }>;
    scanUrl(url: string): Promise<{
        clean: boolean;
        threats: string[];
    }>;
}
