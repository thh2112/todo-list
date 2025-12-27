import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { HttpResponseInterceptor } from './shared/interceptors/http-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  // Validate data of all HTTP requests.

  app.useBodyParser('json', { limit: '15mb' });
  app.useBodyParser('urlencoded', { limit: '15mb', extended: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix('/v1/api');

  if (process.env.ENABLE_CORS === 'true') {
    app.enableCors({
      origin: '*',
      methods: '*',
      credentials: true,
    });
  }

  app.useGlobalInterceptors(new HttpResponseInterceptor());

  const port = process.env.PORT;
  const mainUrl = `http://localhost:${port}`;

  await app.listen(port);
  console.log(`Server is listening on ${mainUrl}`);
}

bootstrap();
