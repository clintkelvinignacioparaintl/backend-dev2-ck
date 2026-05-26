import { ConfigService } from '@nestjs/config';
export declare class ImageOptimizationService {
    private readonly configService;
    constructor(configService: ConfigService);
    optimizeImage(buffer: Buffer): Promise<Buffer>;
    generateThumbnail(buffer: Buffer, size?: number): Promise<Buffer>;
    getImageMetadata(buffer: Buffer): Promise<{
        width: number;
        height: number;
        format: string;
        size: number;
    }>;
    convertToWebP(buffer: Buffer): Promise<Buffer>;
}
