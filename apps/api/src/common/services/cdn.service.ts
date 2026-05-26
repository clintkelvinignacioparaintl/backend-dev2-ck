import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class CdnService {
  private s3Client: S3Client;
  private bucketName: string;
  private cdnUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get('AWS_S3_BUCKET') || '';
    this.cdnUrl = this.configService.get('CDN_URL') || '';

    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION') || 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
      },
    });
  }

  async uploadFile(key: string, buffer: Buffer, contentType: string): Promise<string> {
    if (!this.bucketName) {
      console.log('[CDN] S3 not configured, skipping upload');
      return '';
    }

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      });

      await this.s3Client.send(command);

      return `${this.cdnUrl}/${key}`;
    } catch (error) {
      console.error('[CDN] Upload failed:', error);
      throw error;
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    if (!this.bucketName) {
      return '';
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      console.error('[CDN] Get signed URL failed:', error);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    if (!this.bucketName) {
      return;
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error('[CDN] Delete failed:', error);
      throw error;
    }
  }

  generateKey(prefix: string, filename: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${prefix}/${timestamp}-${random}-${filename}`;
  }
}
