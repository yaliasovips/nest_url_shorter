import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@app/modules/app/app.module';
import { AppLogger } from "@app/modules/logger/Logger";

async function NestUrlShorter() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        // logger: AppLogger,
        logger: ['log', 'warn']
    });

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());

    //swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('send-link-backend')
        .setDescription('send-link-backend API')
        .setVersion('1.0')
        .addTag('send-link-backend')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('*/docs', app, document);

    await app.listen(80);
}
NestUrlShorter();
