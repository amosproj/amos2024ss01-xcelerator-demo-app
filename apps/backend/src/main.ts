import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { BackendConfig } from 'common-backend-models';
import { PrismaClientExceptionFilter } from 'common-backend-prisma';
import { API_BASE_SEGMENT } from 'common-shared-models';

/* Modules */
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	const configService = app.get(ConfigService<BackendConfig>);

	app.setGlobalPrefix(API_BASE_SEGMENT);

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	const port = configService.get('app', { infer: true }).port;
	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}${API_BASE_SEGMENT}`);
}

bootstrap();
