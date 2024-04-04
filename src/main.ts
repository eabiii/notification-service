import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription(
      'A Nest JS application to send notifications via SMS and email and generate OTP',
    )
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
