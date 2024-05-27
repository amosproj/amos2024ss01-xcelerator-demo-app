import { XdCaseManagamentModule } from '@frontend/case-management';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BackendConfig } from 'common-backend-models';
/* Libraries */
import { XdTimeseriesModule } from 'facilities-backend-timeseries';

import { AppController } from './app.controller';
/* Internal */
import { AppService } from './app.service';
import { validateConfig } from './config/validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
			validate: validateConfig,
		}),
		XdTimeseriesModule,
		XdCaseManagamentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
