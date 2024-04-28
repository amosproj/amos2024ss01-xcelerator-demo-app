import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* Internal */
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { validateConfig } from './config/validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
			validate: validateConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
