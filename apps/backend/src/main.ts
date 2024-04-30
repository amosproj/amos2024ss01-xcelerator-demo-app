/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
/*Classes */
import { BackendConfig } from 'common-backend-models';

/* Modules */
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService<BackendConfig>);

	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);

	const port = configService.get('app', { infer: true }).port;
	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
