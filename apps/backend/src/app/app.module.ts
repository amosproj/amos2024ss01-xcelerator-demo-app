import { XdInsightHubModule } from '@frontend/common/backend/insight-hub';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { XdCaseManagementModule } from 'cases-backend-case-management';
import { BackendConfig } from 'common-backend-models';
import { XdFacilitiesBackendFacilitiesModule } from 'facilities-backend-facilities';
import { XdTimeseriesModule } from 'facilities-backend-timeseries';

/* Libraries */
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
		XdInsightHubModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService<BackendConfig>) =>
				configService.get('insightHub'),
			inject: [ConfigService],
		}),
		XdTimeseriesModule,
		XdCaseManagementModule,
		XdFacilitiesBackendFacilitiesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
