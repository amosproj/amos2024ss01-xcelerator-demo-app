import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { firstValueFrom, map, Observable, switchMap } from 'rxjs';

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

	// TODO - Remove this method before merging - demonstration functionality only
	async onModuleInit() {
		// eslint-disable-next-line no-console
		console.log(
			await firstValueFrom(
				this.getTimeSeriesData(
					'7c2bd45b10ee4481904d749427c2d26d',
					'connectivityStatus',
					{},
				),
			),
		);
	}

	/**
	 * Allows to get the time series data from the IoT Time Series API.
	 * @see https://documentation.mindsphere.io/MindSphere/apis/iot-iottimeseries/api-iottimeseries-api.html
	 *
	 * @param assetId The id of the asset entity
	 * @param propertySetName The property set name of the time series data
	 * @param params The parameters of the time series data
	 */
	public getTimeSeriesData<SelectType extends Record<PropertyKey, any>, ITimeSeriesResponse>(
		assetId: string,
		propertySetName: string,
		params: ITimeSeriesRequestParameter<SelectType>,
	): Observable<ITimeSeriesResponse> {
		return this._tokenManagerService.getOrCreateBearerToken().pipe(
			switchMap((token) => {
				return this._httpClient
					.get<ITimeSeriesResponse>(
						`${this._insightHubOptions.apiUrl}/iottimeseries/v3/timeseries/${assetId}/${propertySetName}`,
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
