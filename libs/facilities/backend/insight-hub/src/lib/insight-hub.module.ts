import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { XdPrismaModule } from 'common-backend-prisma';

@Module({
	controllers: [],
	providers: [],
	imports: [HttpModule, XdPrismaModule],
	exports: [],
})
export class XdInsightHubModule {}
