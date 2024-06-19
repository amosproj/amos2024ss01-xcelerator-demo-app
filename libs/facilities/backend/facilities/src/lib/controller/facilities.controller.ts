import { Controller, Get, Param } from '@nestjs/common';
import { ApiAcceptedResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ESwaggerTag } from 'common-backend-swagger';

import { GetFacilityParamsDto } from '../dto/params.dto';
import { XdFacilitiesService } from '../service/facilities.service';

@ApiTags(ESwaggerTag.FACILITIES)
@Controller('facilities')
export class XdFacilitiesController {
	constructor(private readonly facilitiesService: XdFacilitiesService) {}

    /**
     * Returns all facilities
     */
	@Get()
    @ApiOkResponse({ description: 'Retrieves all facilities' })
    public getAllFacilities() {
		return this.facilitiesService.getAllFacilitiesFromDB();
	}

    /**
     * Seeds the database with facilities
     */
	@Get('seed')
    @ApiCreatedResponse({ description: 'The database was successfully seeded with facilities' })
	public seedTheDB() {
		return this.facilitiesService.seedTheDB();
	}

    /**
     * Returns a facility by its id
     *
     * @param params
     */
    @ApiOkResponse({ description: 'Retrieves a single facility by its ID' })
	@Get(':assetId')
	public getFacilityById(@Param() params: GetFacilityParamsDto) {
		return this.facilitiesService.getFacilityById(params.assetId);
	}
}
