import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('>>> Iniciando la aplicacion...');

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.enableCors();

    const configuracion = new DocumentBuilder()
      .setTitle('API del Cine')
      .setDescription('Sistema de Gestion de Cine con NestJS + TypeORM + MySQL')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const documento = SwaggerModule.createDocument(app, configuracion);

    app.use('/docs', apiReference({ spec: { content: documento } }));
    app.use('/docs-json', (_req, res) => res.json(documento));

    const puerto = 3000;
    await app.listen(puerto);

    console.log('==========================================');
    console.log('>>> API corriendo en http://localhost:' + puerto);
    console.log('>>> Documentacion:  http://localhost:' + puerto + '/docs');
    console.log('==========================================');
  } catch (error) {
    console.error('>>> ERROR AL INICIAR LA APP:');
    console.error(error);
    process.exit(1);
  }
}

bootstrap();