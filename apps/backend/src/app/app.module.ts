import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
/* Libraries */
import { XdInsightHubModule } from 'facilities-backend-insight-hub';

import { AppController } from './app.controller';
/* Internal */
import { AppService } from './app.service';
import { validateConfig } from './config/validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [ '.env' ],
			validate: validateConfig,
		}),
		XdInsightHubModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule {}
