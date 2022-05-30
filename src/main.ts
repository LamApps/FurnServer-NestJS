import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { urlencoded, json } from 'express';

declare const module: any;

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('../ssl-key/private.key'),
    cert: fs.readFileSync('../ssl-key/fullcert.crt'),
  };
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule, {
      httpsOptions,
    }
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.setViewEngine('hbs');

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(4201, "0.0.0.0");

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();