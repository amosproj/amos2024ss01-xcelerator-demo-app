import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GetTimeSeriesParamsDto, GetTimeSeriesQueryDto } from '../dto/request.dto';
import {
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from '../interfaces/response.interface';
import { XdTimeseriesService } from '../services/timeseries.service';

@Controller('timeseries')
export class XdTimeseriesController {
	constructor(private readonly timeseriesService: XdTimeseriesService) {}

	/**
	 * Returns all timeseries items
	 */
	@Get()
	public getAllTimeseries(): Observable<ITimeSeriesItemResponse[]> {
		return this.timeseriesService.getAllTimeSeries();
	}

	/**
	 * Returns timeseries data for a specific entity and property set.
	 * Accepts query params for filtering, sorting and limiting the result.
	 */
	@Get(':entityId/:propertySetName')
	public getTimeSeries(
		@Param() params: GetTimeSeriesParamsDto,
		@Query() query: GetTimeSeriesQueryDto,
	): Observable<ITimeSeriesDataItemResponse[]> {
		const { entityId, propertySetName } = params;
		const { from, to, limit, select, sort, latestValue } = query;

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
