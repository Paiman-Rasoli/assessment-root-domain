import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<AppConfigService>(AppConfigService);
  const port = configService.get('port') || 3001;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: configService.getAllowedOrigins(),
    maxAge: 86400,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const globalPrefix = 'api/';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
