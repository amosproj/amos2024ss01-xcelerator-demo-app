import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { defaults } from 'lodash';
import { catchError, map, Observable } from 'rxjs';

import { ITimeSeriesRequestParameter } from '../models/interfaces/time-series-request.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';

/**
 * Service to interact with the IoT Time Series API.
 */
@Injectable()
export class IotTimeSeriesService {
	constructor(
		private readonly _httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly _insightHubOptions: IInsightHub,
	) {}

	/**
	 * Allows to get the time series data from the IoT Time Series API.
	 */
	public getTimeSeriesData<SelectType, ReturnType>(
		params: ITimeSeriesRequestParameter<SelectType>,
	): Observable<ReturnType> {
		return this._httpClient
			.get<ReturnType>(this._insightHubOptions.apiUrl, {
				params: defaults(
					{
						apiKey: this._insightHubOptions.apiKey,
					},
					params,
				),
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
