import { Logger, ValidationPipe, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './config';

const logger = new Logger('Bootstrap');

type HttpSettings = Pick<
  typeof env,
  'apiPrefix' | 'corsOrigins' | 'swaggerEnabled' | 'nodeEnv'
>;

export function configureHttpApp(
  app: INestApplication,
  settings: HttpSettings = env,
): void {
  app.setGlobalPrefix(settings.apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const allowAllOrigins = settings.corsOrigins.includes('*');
  app.enableCors({
    origin: allowAllOrigins ? true : settings.corsOrigins,
    credentials: !allowAllOrigins,
  });

  if (settings.swaggerEnabled && settings.nodeEnv !== 'production') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('TAYKA API')
        .setDescription('Consultas públicas de TAYKA y sus contratos HTTP.')
        .setVersion('1.0')
        .build(),
    );
    SwaggerModule.setup('api/v1/docs', app, document);
  }
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  configureHttpApp(app);

  await app.listen(env.port);
  logger.log(
    `HTTP application listening on http://localhost:${env.port}/${env.apiPrefix}`,
  );
}

if (require.main === module) {
  void bootstrap().catch((error: unknown) => {
    const stack = error instanceof Error ? error.stack : String(error);
    logger.error('Application failed to start', stack);
    process.exitCode = 1;
  });
}
