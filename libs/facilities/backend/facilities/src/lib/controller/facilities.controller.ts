import { Controller, Get } from '@nestjs/common';

import { XdFacilitesService } from '../service/faclities.service';

@Controller('facilities')
export class XdFacilitiesController {
    constructor(
        private readonly facilitiesService: XdFacilitesService
    ) {}
    
    @Get()
    public getAllFacilities() {
        return this.facilitiesService.seedTheDB();
    }

}
