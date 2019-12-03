import * as dotEnv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { CustomValidatePipe } from './shared/pipes/validation.pipe';

// Configure environment file with project
dotEnv.config();

// Read port number from env file
const port = process.env.PORT || 4001;

async function bootstrap() {
  // Create nestFactory instance for make server instance
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Custome validation on request using pipe and class-validator
  app.useGlobalPipes(new CustomValidatePipe());

  // Add prefix to all api for request
  app.setGlobalPrefix('api/v1');

  // Create options stance with document builder
  const options = new DocumentBuilder()
    .setTitle('Nest mysql')
    .setDescription('Restful API\'s with ORM')
    .setVersion('1.0')
    .build();
  // Swagger module create document
  const document = SwaggerModule.createDocument(app, options);
  // Setup swagger module with setup
  SwaggerModule.setup('api', app, document);

  Logger.log(`🚀  Server ready at http://localhost:${port} `, 'ServerStarted');
  // Run server on port
  await app.listen(port);
}
bootstrap();
