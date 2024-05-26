import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { map, Observable, switchMap } from 'rxjs';

import { ITimeSeriesRequestParameter } from '../models/interfaces/time-series-request.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdTokenManagerService } from './token-manager.service';

/**
 * Service to interact with the IoT Time Series API.
 */
@Injectable()
export class XdIotTimeSeriesService {
	constructor(
		private readonly _httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly _insightHubOptions: IInsightHub,
		private readonly _tokenManagerService: XdTokenManagerService,
	) {}

	/**
	 * Allows to get the time series data from the IoT Time Series API.
	 */
	public getTimeSeriesData<SelectType extends Record<PropertyKey, any>, ITimeSeriesResponse>(
		params: ITimeSeriesRequestParameter<SelectType>,
	): Observable<ITimeSeriesResponse> {
		return this._tokenManagerService.getOrCreateBearerToken().pipe(
			switchMap((token) => {
				return this._httpClient
					.get<ITimeSeriesResponse>(
						`${this._insightHubOptions.apiUrl}/iottimeseries/v3/timeseries`,
						{
							params,
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					.pipe(map((response) => response.data));
			}),
		);
	}
}
