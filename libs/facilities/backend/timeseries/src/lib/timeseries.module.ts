import { Module } from '@nestjs/common';
import { XdInsightHubModule } from 'common-backend-insight-hub';
import { XdPrismaModule } from 'common-backend-prisma';

import { XdTimeseriesController } from './controller/timeseries.controller';
import { XdTimeseriesService } from './services/timeseries.service';

@Module({
	controllers: [ XdTimeseriesController ],
	imports: [ XdPrismaModule, XdInsightHubModule ],
	providers: [ XdTimeseriesService ],
	exports: [ XdTimeseriesService ],
})
export class XdTimeseriesModule {}
