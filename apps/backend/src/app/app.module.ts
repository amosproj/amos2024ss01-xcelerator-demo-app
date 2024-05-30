import { XdInsightHubModule } from '@frontend/common/backend/insight-hub';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BackendConfig } from 'common-backend-models';

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
