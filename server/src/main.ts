import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Blog platform')
        .setDescription('Api documentation')
        .setVersion('0.3')
        .addTag('api')
        .build();
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)
    Logger.log(`Server start on port: ${process.env.PORT}`)
    await app.listen(process.env.PORT);
}

bootstrap();
