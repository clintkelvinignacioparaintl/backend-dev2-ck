import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class CvUploadService {
  constructor(private prisma: PrismaService) {}

  private readonly uploadDir = './uploads/cv';

  async uploadCv(userId: string, file: any) {
    const fileName = `${userId}-${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadDir, fileName);

    await fs.mkdir(this.uploadDir, { recursive: true });
    await fs.writeFile(filePath, file.buffer);

    const fileUrl = `/uploads/cv/${fileName}`;

    await this.prisma.personalProfile.update({
      where: { userId },
      data: { resumeUrl: fileUrl },
    });

    return {
      success: true,
      fileUrl,
      fileName,
    };
  }

  async deleteCv(userId: string) {
    const profile = await this.prisma.personalProfile.findUnique({
      where: { userId },
      select: { resumeUrl: true },
    });

    if (!profile || !profile.resumeUrl) {
      throw new Error('No CV found for this user');
    }

    const filePath = join('.', profile.resumeUrl);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    await this.prisma.personalProfile.update({
      where: { userId },
      data: { resumeUrl: null },
    });

    return {
      success: true,
      message: 'CV deleted successfully',
    };
  }

  async getCv(userId: string) {
    const profile = await this.prisma.personalProfile.findUnique({
      where: { userId },
      select: { resumeUrl: true },
    });

    if (!profile || !profile.resumeUrl) {
      throw new Error('No CV found for this user');
    }

    return {
      resumeUrl: profile.resumeUrl,
    };
  }
}
