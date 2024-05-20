import { Controller, Get, Param, Query } from '@nestjs/common';

import { GetTimeSeriesParamsDto, GetTimeSeriesQueryDto } from '../dto/request.dto';
import { TimeseriesService } from '../services/timeseries.service';
@Controller('timeseries')
export class XdTimeseriesController {
	constructor(private readonly timeseriesService: TimeseriesService) {}

	@Get(':entityId/:propertySetName')
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
		return this.timeseriesService.getTimeSeriesFromDB({
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

	@Get()
	async getTimeseries(): Promise<any> {
		return this.timeseriesService.getAllTimeSeries();
	}
}
