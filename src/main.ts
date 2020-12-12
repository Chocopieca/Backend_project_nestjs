import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TokenCheck } from './components/middleware/loger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const option = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Code Api')
    .setDescription('Bakced side')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api', app, document);
  
  // app.use(TokenCheck)

  await app.listen(3000);
}
bootstrap();
