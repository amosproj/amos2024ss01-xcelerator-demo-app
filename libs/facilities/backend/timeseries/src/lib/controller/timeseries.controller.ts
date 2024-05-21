import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GetTimeSeriesParamsDto, GetTimeSeriesQueryDto } from '../dto/request.dto';
import {
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from '../interfaces/respons.interface';
import { XdTimeseriesService } from '../services/timeseries.service';
@Controller('timeseries')
export class XdTimeseriesController {
	constructor(private readonly timeseriesService: XdTimeseriesService) {}

	@Get()
	public getAllTimeseries(): Observable<ITimeSeriesItemResponse[]> {
		return this.timeseriesService.getAllTimeSeries();
	}

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
