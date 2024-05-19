import { Controller } from '@nestjs/common';

import { PumpService } from '../services/pump.service';

@Controller()
export class PumpController {
	constructor(private readonly pumpService: PumpService) {}
}
