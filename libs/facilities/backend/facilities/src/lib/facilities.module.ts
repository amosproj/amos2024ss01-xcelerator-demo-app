import { Module } from '@nestjs/common';
import { XdInsightHubModule } from 'common-backend-insight-hub';
import { XdPrismaModule } from 'common-backend-prisma';

import { XdFacilitiesController } from './controller/facilities.controller';
import { XdFacilitesService } from './service/faclities.service';

@Module({
	controllers: [XdFacilitiesController],
	imports: [XdInsightHubModule, XdPrismaModule],
	providers: [XdFacilitesService],
	exports: [XdFacilitesService],
})
export class XdFacilitiesBackendFacilitiesModule {}
