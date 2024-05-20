import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { BackendConfig } from 'common-backend-models';
import { API_BASE_SEGMENT } from 'common-shared-models';

/* Modules */
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService<BackendConfig>);

	app.setGlobalPrefix(API_BASE_SEGMENT);

	const port = configService.get('app', { infer: true }).port;
	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}${API_BASE_SEGMENT}`);
}

bootstrap();
