import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@repo/db/generated/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    [x: string]: any;
    onModuleInit(): Promise<void>;
}
