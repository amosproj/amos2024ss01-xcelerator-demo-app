import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { firstValueFrom, map, Observable, switchMap } from 'rxjs';

import { IAssetsResponse } from '../models/interfaces/assets-response.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdTokenManagerService } from './token-manager.service';

/**
 * Service to interact with the Asset Management API.
 */
@Injectable()
export class XdAssetsService {
	constructor(
		private readonly _httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly _insightHubOptions: IInsightHub,
		private readonly _tokenManagerService: XdTokenManagerService,
	) {}

	// TODO - Remove this method before merging - demonstration functionality only
	async onModuleInit() {
		// eslint-disable-next-line no-console
		// console.log(await firstValueFrom(this.getAssetsData()));
	}

	/**
	 * Allows to get the assets data from the Asset Management API.
	 */
	public getAssetsData(): Observable<IAssetsResponse> {
		return this._tokenManagerService.getOrCreateBearerToken().pipe(
			switchMap((token) => {
				return this._httpClient
					.get<IAssetsResponse>(
						`${this._insightHubOptions.apiUrl}/assetmanagement/v3/assets`,
						{
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
