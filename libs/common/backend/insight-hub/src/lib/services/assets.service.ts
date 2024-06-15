import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { Observable } from 'rxjs';

import { IAspectResponse } from '../models/interfaces/aspect-response.interface';
import { IAssetsResponse } from '../models/interfaces/assets-response.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdBaseBearerInteractionService } from './base-bearer-interaction.service';
import { XdTokenManagerService } from './token-manager.service';

/**
 * Service to interact with the Asset Management API.
 */
@Injectable()
export class XdAssetsService extends XdBaseBearerInteractionService {
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
			'assetmanagement/v3/assets',
		);
	}

	/**
	 * Allows to get the assets data from the Asset Management API.
	 */
	public getAssetsData(pageSize = 150, page = 0): Observable<IAssetsResponse> {
		return super._getData<IAssetsResponse>(undefined, {
			size: pageSize,
			page: page,
		});
	}

	public getAssetAspectsData(assetId: string): Observable<IAspectResponse> {
		return super._getData<any>(`${assetId}/aspects`, {
			size: 100,
		});
	}
}
