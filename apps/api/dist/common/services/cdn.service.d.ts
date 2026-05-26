import { ConfigService } from '@nestjs/config';
export declare class CdnService {
    private readonly configService;
    private s3Client;
    private bucketName;
    private cdnUrl;
    constructor(configService: ConfigService);
    uploadFile(key: string, buffer: Buffer, contentType: string): Promise<string>;
    getSignedUrl(key: string, expiresIn?: number): Promise<string>;
    deleteFile(key: string): Promise<void>;
    generateKey(prefix: string, filename: string): string;
}
