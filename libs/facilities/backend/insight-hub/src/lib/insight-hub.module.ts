import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { XdPrismaModule } from 'common-backend-prisma';

import { IotTimeSeriesService } from './services';

@Module({
	controllers: [],
	providers: [ IotTimeSeriesService ],
	imports: [ HttpModule, XdPrismaModule ],
	exports: [ IotTimeSeriesService ],
})
export class XdInsightHubModule {}
