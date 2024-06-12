import { Controller, Get, Param } from '@nestjs/common';

import { GetFacilityParamsDto } from '../dto/params.dto';
import { XdFacilitiesService } from '../service/faclities.service';

@Controller('facilities')
export class XdFacilitiesController {
	constructor(private readonly facilitiesService: XdFacilitiesService) {}

	@Get()
	public getAllFacilities() {
		return this.facilitiesService.getAllFacilitiesFromDB();
	}

	@Get('seed')
	public seedTheDB() {
		return this.facilitiesService.seedTheDB();
	}

	@Get(':assetId')
	public getFacilityById(@Param() params: GetFacilityParamsDto) {
		return this.facilitiesService.getFacilityById(params.assetId);
	}
}
