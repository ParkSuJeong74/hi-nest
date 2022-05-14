import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 어떤 decorator도 없는 property의 object는 거름
      forbidNonWhitelisted: true,// 이상한걸 보내면 request를 막음
      transform: true, // 원하는 타입으로 변환
    })
  )
  await app.listen(3000);
}
bootstrap();
