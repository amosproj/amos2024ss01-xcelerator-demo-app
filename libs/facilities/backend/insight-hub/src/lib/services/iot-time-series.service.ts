import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'common-backend-prisma';
import { catchError, map, Observable } from 'rxjs';

import { ITimeSeriesRequestParameter } from '../models/interfaces/time-series-request.interface';

@Injectable()
export class IotTimeSeriesService {
	private _apiUrl: string;

	constructor(private readonly _httpClient: HttpService) {
		// how to get the region, environment, and mindsphere-domain from the environment variables via config service?
		this._apiUrl =
			'https://gateway.{region}-{environment}.{mindsphere-domain}/api/iottimeseries/v3/timeseries';
	}

	/**
	 * Allows to get the time series data from the IoT Time Series API.
	 */
	public getTimeSeriesData<SelectType, ReturnType>(
		params: ITimeSeriesRequestParameter<SelectType>,
	): Observable<ReturnType> {
		return this._httpClient
			.get<ReturnType>(this._apiUrl, {
				headers: {},
				params,
			})
			.pipe(
				map((response) => response.data),
				catchError((err: Error) => {
					// eslint-disable-next-line no-console
					console.log(err);
					throw err;
				}),
			);
	}
}
