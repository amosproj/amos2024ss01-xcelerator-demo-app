import { Module } from '@nestjs/common';

import { PumpService } from './services/pump.service';

@Module({
	controllers: [],
	providers: [PumpService],
	exports: [PumpService],
})
export class FacilitiesBackendPumpModule {}
