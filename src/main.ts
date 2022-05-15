import { DataBaseInterceptor } from './comon/errors/interceptor/database.interpector';
import { ConflictInterceptor } from './comon/errors/interceptor/conflict.interpector';
import { NotFoundInterceptor } from './comon/errors/interceptor/notfound.interpector';
import { UnauthorizedInterceptor } from './comon/errors/interceptor/unauthorized.interpector';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Simple blog')
        .setDescription('The Simples Blog API description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    // app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ConflictInterceptor());
    app.useGlobalInterceptors(new DataBaseInterceptor());
    app.useGlobalInterceptors(new UnauthorizedInterceptor());
    app.useGlobalInterceptors(new NotFoundInterceptor());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
