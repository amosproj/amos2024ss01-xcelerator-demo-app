import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { Observable } from 'rxjs';

import { ITimeSeriesRequestParameter } from '../models/interfaces/time-series-request.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdBaseBearerInteractionService } from './base-bearer-interaction.service';
import { XdTokenManagerService } from './token-manager.service';

/**
 * Service to interact with the IoT Time Series API.
 */
@Injectable()
export class XdIotTimeSeriesService extends XdBaseBearerInteractionService {
	constructor(
		private readonly httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly insightHubOptions: IInsightHub,
		private readonly tokenManagerService: XdTokenManagerService,
		private readonly logger: Logger,
	) {
		super(
			httpClient,
			insightHubOptions,
			tokenManagerService,
			logger,
			'iottimeseries/v3/timeseries',
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
		return super._getData<ITimeSeriesResponse>(`${assetId}/${propertySetName}`, params);
	}
}
