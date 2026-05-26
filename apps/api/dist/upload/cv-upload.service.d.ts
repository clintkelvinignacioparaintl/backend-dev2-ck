import { PrismaService } from '../prisma/prisma.service';
export declare class CvUploadService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly uploadDir;
    uploadCv(userId: string, file: any): Promise<{
        success: boolean;
        fileUrl: string;
        fileName: string;
    }>;
    deleteCv(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getCv(userId: string): Promise<{
        resumeUrl: string;
    }>;
}
