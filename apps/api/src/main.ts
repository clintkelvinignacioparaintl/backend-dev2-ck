import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Security: CORS - restrict to specific origins in production
  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173').split(',');

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: process.env.ALLOWED_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: process.env.ALLOWED_HEADERS?.split(',') || ['Content-Type', 'Authorization'],
  });

  // Security: Trust proxy for rate limiting behind reverse proxy
  const trustProxy = process.env.TRUST_PROXY === 'true' ? 1 : 0;
  (app as any).set('trust proxy', trustProxy);

  await app.listen(parseInt(process.env.PORT || '4000', 10));

  console.log(`API running on http://localhost:${process.env.PORT || 4000}`);
}
bootstrap();
