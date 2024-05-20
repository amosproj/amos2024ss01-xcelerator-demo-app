import { Controller, Get, Param, Query } from '@nestjs/common';

import { GetTimeSeriesParamsDto, GetTimeSeriesQueryDto } from '../dto/request.dto';
import { PumpService } from '../services/timeseries.service';

@Controller()
export class PumpController {
	constructor(private readonly pumpService: PumpService) {}

	@Get('timeseries/:entityId/:propertySetName')
	async getTimeSeries(
		@Param() params: GetTimeSeriesParamsDto,
		@Query() query: GetTimeSeriesQueryDto,
	): Promise<any> {
		/**
		 * Extract the parameters and query from the request
		 */
		const { entityId, propertySetName } = params;
		const { from, to, limit, select, sort, latestValue } = query;

		/**
		 * Call the service to get the time series data
		 */

		return this.pumpService({
			entityId,
			propertySetName,
			from,
			to,
			limit,
			select,
			sort,
			latestValue,
		});
	}
}
