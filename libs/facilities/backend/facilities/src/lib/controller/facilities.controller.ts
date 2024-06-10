import { Controller, Get } from '@nestjs/common';

import { XdFacilitesService } from '../service/faclities.service';
import { firstValueFrom } from 'rxjs';

@Controller('facilities')
export class XdFacilitiesController {
	constructor(private readonly facilitiesService: XdFacilitesService) {}

	@Get()
	public getAllFacilities() {
		return this.facilitiesService.getAllFacilitiesFromDB();
	}

	@Get('seed')
	public seedTheDB() {
		return this.facilitiesService.seedTheDB();
	}

	@Get(':id')
	public getFacilityById(id: string) {
		return this.facilitiesService.getFacilityById(id);
	}
}
