import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GetTimeSeriesParamsDto, GetTimeSeriesQueryDto } from '../dto/request.dto';
import {
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from '../interfaces/respons.interface';
import { TimeseriesService } from '../services/timeseries.service';
@Controller('timeseries')
export class XdTimeseriesController {
	constructor(private readonly timeseriesService: TimeseriesService) {}

	@Get()
	public getTimeseries(): Observable<ITimeSeriesItemResponse[]> {
		return this.timeseriesService.getAllTimeSeries();
	}

	@Get(':entityId/:propertySetName')
	public getTimeSeries(
		@Param() params: GetTimeSeriesParamsDto,
		@Query() query: GetTimeSeriesQueryDto,
	): Observable<ITimeSeriesDataItemResponse[]> {
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
}
