import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
/* Internal */
import { AppService } from './app.service';
import { validateConfig } from './config/validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['apps/backend/.env'],
			validate: validateConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
