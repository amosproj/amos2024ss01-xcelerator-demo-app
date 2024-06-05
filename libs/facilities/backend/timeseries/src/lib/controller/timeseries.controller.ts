import { Controller, Get, Param, Query } from '@nestjs/common';
import { ITimeSeriesDataItemResponse, ITimeSeriesItemResponse } from 'facilities-shared-models';
import { Observable } from 'rxjs';

import { GetTimeSeriesParamsDto } from '../dto/params.dto';
import { GetTimeSeriesQueryDto } from '../dto/query.dto';
import { XdTimeseriesService } from '../services';

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
