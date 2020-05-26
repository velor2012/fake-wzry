import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { AllExceptionsFilter } from './app.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
const consola = require("consola");
async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
    // 处理跨域
  app.enableCors();
  //设置路由前缀
  app.setGlobalPrefix('api')
  //设置异常处理
  app.useGlobalFilters(new AllExceptionsFilter())
  //设置静态资源位置
  app.useStaticAssets(join(__dirname, '..', 'static'));
 //swagger
 const options = new DocumentBuilder()
 .setTitle('仿王者荣耀官网项目api')
 .setDescription('The cats API description')
 .setVersion('1.0')
     .addTag('wzry')
     .addBearerAuth()
 .build();
 const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('api-doc', app, document);
 //end swagger

  await app.listen(`${process.env.PORT}`, `${process.env.HOST}`);
  consola.ready({
    message: `Server listening on http://${process.env.HOST}:${process.env.PORT}`,
    badge: true
  });
}
bootstrap();
