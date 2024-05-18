import { Controller } from '@nestjs/common';

import { PumpService } from '../services/pump.service';

@Controller('pump')
export class PumpController {
	constructor(private readonly pumpService: PumpService) {}
}
