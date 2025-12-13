import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
//   console.log('=== PROBANDO ENV ===');
// console.log(process.env.DB_USERNAME);
// console.log(process.env.DB_PASSWORD);
// console.log("=====================");

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ring Motos API')
    .setDescription('API desarrollada con NestJS — autenticación, roles y módulos dinámicos.')
    .setVersion('1.0.0')
    .addBearerAuth() // 👈 usa el esquema por defecto "bearer"
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

 await app.listen(process.env.PORT || 3000);

}
bootstrap();
