import { Module } from '@nestjs/common';
import { XdPrismaModule } from 'common-backend-prisma';

import { CaseController } from './controller/case.controller';
import { CaseService } from './services/case.service';

@Module({
	controllers: [CaseController],
	imports: [XdPrismaModule],
	providers: [CaseService],
	exports: [CaseService],
})
export class CaseManagamentModule {}
