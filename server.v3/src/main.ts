import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { SentryInterceptor } from './interceptor/sentry.interceptor';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const port = 8083;

  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.STAGE === 'prod' ? 'info' : 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike('', { prettyPrint: true }),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      // class-transformer 적용
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );
        logger.error(`Validation failed: ${messages.join(' | ')}`);
        return new BadRequestException(messages);
      },
    }),
  );

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get('swagger.user')]:
          configService.get('swagger.password'),
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Supersquad app.v1')
    .setDescription('App.v1 API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  // Sentry
  Sentry.init({ dsn: configService.get('sentry.dsn') });
  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen(port);
  Logger.log(`listening port: ${port}`);
  Logger.log(`STAGE= ${process.env.STAGE}`);
}
bootstrap();
