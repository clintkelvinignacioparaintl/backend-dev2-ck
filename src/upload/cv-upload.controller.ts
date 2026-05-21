import {
  Controller,
  Post,
  Delete,
  Get,
  UseInterceptors,
  UploadedFile,
  Param,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CvUploadService } from './cv-upload.service';

@Controller('upload/cv')
export class CvUploadController {
  constructor(private readonly cvUploadService: CvUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadCv(@Request() req, @UploadedFile() file: any) {
    return this.cvUploadService.uploadCv(req.user?.userId || 'anonymous', file);
  }

  @Delete()
  async deleteCv(@Request() req) {
    return this.cvUploadService.deleteCv(req.user?.userId || 'anonymous');
  }

  @Get()
  async getCv(@Request() req) {
    return this.cvUploadService.getCv(req.user?.userId || 'anonymous');
  }
}
