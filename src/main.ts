import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'https://front-one-umber.vercel.app',
      'https://front-git-main-hr-systems-projects.vercel.app', // ← agregá este
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

   // Activar validación global
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // elimina propiedades no declaradas en el DTO
  //     forbidNonWhitelisted: true, // lanza error si llegan propiedades extra
  //     transform: true // transforma tipos automáticamente (ej: string -> number)
  //   })
  // );

  const config = new DocumentBuilder()
    .setTitle('Ring Motos API')
    .setDescription('API desarrollada con NestJS — autenticación, roles y módulos dinámicos.')
    .setVersion('1.0.0')
    .addBearerAuth() // 👈 usa el esquema por defecto "bearer"
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

 const port = process.env.PORT || 3000;
  await app.listen(port);}
bootstrap();
