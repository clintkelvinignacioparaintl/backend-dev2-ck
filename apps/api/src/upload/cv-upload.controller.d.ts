import { CvUploadService } from './cv-upload.service';
export declare class CvUploadController {
    private readonly cvUploadService;
    constructor(cvUploadService: CvUploadService);
    uploadCv(req: any, file: any): Promise<{
        success: boolean;
        fileUrl: string;
        fileName: string;
    }>;
    deleteCv(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getCv(req: any): Promise<{
        resumeUrl: string;
    }>;
}
