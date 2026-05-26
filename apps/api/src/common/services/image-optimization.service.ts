import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

@Injectable()
export class ImageOptimizationService {
  constructor(private readonly configService: ConfigService) {}

  async optimizeImage(buffer: Buffer): Promise<Buffer> {
    const maxSize = parseInt(this.configService.get('MAX_IMAGE_SIZE') || '1920', 10);
    const quality = parseInt(this.configService.get('IMAGE_QUALITY') || '80', 10);

    return sharp(buffer)
      .resize(maxSize, maxSize, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality })
      .toBuffer();
  }

  async generateThumbnail(buffer: Buffer, size: number = 300): Promise<Buffer> {
    return sharp(buffer)
      .resize(size, size, {
        fit: 'cover',
      })
      .jpeg({ quality: 70 })
      .toBuffer();
  }

  async getImageMetadata(buffer: Buffer): Promise<{ width: number; height: number; format: string; size: number }> {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'unknown',
      size: buffer.length,
    };
  }

  async convertToWebP(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();
  }
}
