import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { XdCaseManagementModule } from 'cases-backend-case-management';
import { XdInsightHubModule } from 'common-backend-insight-hub';
import { BackendConfig } from 'common-backend-models';
import { XdFacilitiesBackendFacilitiesModule } from 'facilities-backend-facilities';
import { XdTimeseriesModule } from 'facilities-backend-timeseries';
import { validateConfig } from './config/validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [ '.env' ],
			validate: validateConfig,
		}),
		XdInsightHubModule.registerAsync({
			imports: [ ConfigModule ],
			useFactory: (configService: ConfigService<BackendConfig>) =>
				configService.get('insightHub'),
			inject: [ ConfigService ],
		}),
		XdTimeseriesModule,
		XdCaseManagementModule,
		XdFacilitiesBackendFacilitiesModule,
	],
	controllers: [ ],
	providers: [ ],
})
export class AppModule {}
