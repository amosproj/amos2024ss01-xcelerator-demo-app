import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';

import { ITokenManagerResponse } from '../models/interfaces/token-manager-response.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';

/**
 * Service to manage the bearer token for the Insight Hub API.
 */
@Injectable()
export class XdTokenManagerService {
	/**
	 * The cached bearer token.
	 */
	private _bearerToken$: Observable<{ token: string; expiresAt: Date } | undefined> = of(undefined);

	constructor(
		private readonly _httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly _insightHubOptions: IInsightHub,
	) {}

	/**
	 * Either gets the bearer token from the cache or creates a new one. This is necessary to interact with the Insight Hub API.
	 */
	public getOrCreateBearerToken(): Observable<string> {
		return this._bearerToken$.pipe(
			switchMap((bearerToken) => {
				console.log('expires:', bearerToken?.expiresAt);
				console.log('current:', new Date());
				if (!bearerToken || bearerToken.expiresAt < new Date()) {
					return this._httpClient
						.post<ITokenManagerResponse>(
							`${this._insightHubOptions.apiUrl}/technicaltokenmanager/v3/oauth/token`,
							{
								grant_type: 'client_credentials',
								appName: 'amos',
								appVersion: 'v1.0.0',
								hostTenant: 'castidev',
								userTenant: 'castidev',
							},
							{
								headers: {
									'X-SPACE-AUTH-KEY': `Bearer ${this._insightHubOptions.apiKey}`,
								},
							},
						)
						.pipe(
							tap((response) => {
								this._bearerToken$ = of({
									token: response.data.access_token,
									expiresAt: new Date(
										response.data.timestamp +
											(response.data.expires_in) * 1000,
									),
								});
							}),
							map((response) => {
								return response.data.access_token;
							}),
						);
				} else {
					return of(bearerToken.token);
				}
			}),
		);
	}
}
