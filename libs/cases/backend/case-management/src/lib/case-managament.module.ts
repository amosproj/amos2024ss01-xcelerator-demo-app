import { Module } from '@nestjs/common';
import { XdPrismaModule } from 'common-backend-prisma';

import { XdCaseController } from './controller/case.controller';
import { XdCaseService } from './services/case.service';

@Module({
	controllers: [XdCaseController],
	imports: [XdPrismaModule],
	providers: [XdCaseService],
	exports: [XdCaseService],
})
export class XdCaseManagamentModule {}
