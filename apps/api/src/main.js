"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const corsOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173').split(',');
    app.enableCors({
        origin: corsOrigins,
        credentials: true,
        methods: process.env.ALLOWED_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: process.env.ALLOWED_HEADERS?.split(',') || ['Content-Type', 'Authorization'],
    });
    const trustProxy = process.env.TRUST_PROXY === 'true' ? 1 : 0;
    app.set('trust proxy', trustProxy);
    await app.listen(parseInt(process.env.PORT || '4000', 10));
    console.log(`API running on http://localhost:${process.env.PORT || 4000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map