import { Module } from '@nestjs/common';
import { CvUploadService } from './cv-upload.service';
import { CvUploadController } from './cv-upload.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CvUploadService],
  controllers: [CvUploadController],
  exports: [CvUploadService],
})
export class CvUploadModule {}
