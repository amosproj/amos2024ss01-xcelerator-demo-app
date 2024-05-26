import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';

import { ITokenManagerResponse } from '../models/interfaces/token-manager-response.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';

/**
 * Service to manage the bearer token for the Insight Hub API.
 */
@Injectable()
export class XdTokenManagerService implements OnModuleInit {
	private _bearerToken$: Observable<{ token: string; expiresAt: Date } | undefined> =
		of(undefined);

	constructor(
		private readonly _httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly _insightHubOptions: IInsightHub,
	) {}

	async onModuleInit() {
		await firstValueFrom(this.getOrCreateBearerToken());
	}

	public getOrCreateBearerToken(): Observable<string> {
		return this._bearerToken$.pipe(
			switchMap((bearerToken) => {
				if (!bearerToken || bearerToken.expiresAt < new Date('Europe/London')) {
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
											(response.data.expires_in - 20) * 1000,
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
