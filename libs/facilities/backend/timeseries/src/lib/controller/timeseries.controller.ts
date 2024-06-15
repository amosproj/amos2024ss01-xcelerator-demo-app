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
	 * Returns timeseries data for a specific facility.
	 * @tutorial
	 * In our context we define a facility as an asset.
	 */
	@Get(':assetId')
	public getTimeseriesForAsset(
		@Param() { assetId }: Omit<GetTimeSeriesParamsDto, 'propertySetName'>,
	): Observable<ITimeSeriesItemResponse[]> {
		return this.timeseriesService.getTimeSeriesForAsset(assetId);
	}

	/**
	 * Returns timeseries data for a specific asset and property set.
	 * Accepts query params for filtering, sorting and limiting the result.
	 */
	@Get(':assetId/:propertySetName')
	public getTimeSeries(
		@Param() params: GetTimeSeriesParamsDto,
		@Query() query: GetTimeSeriesQueryDto,
	): Observable<ITimeSeriesDataItemResponse[]> {
		const { local = false, ...rest } = query;
		const args = {
			...params,
			...rest,
		};

		return local
			? this.timeseriesService.getTimeSeriesFromDB(args)
			: this.timeseriesService.getTimeSeriesFromApi(args);
	}
}
