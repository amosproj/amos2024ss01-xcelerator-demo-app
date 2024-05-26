import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { firstValueFrom, map, Observable, switchMap } from 'rxjs';

import { IUsersResponse } from '../models/interfaces/users-response.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdTokenManagerService } from './token-manager.service';

/**
 * Service to interact with the User Management API.
 */
@Injectable()
export class XdUsersService implements OnModuleInit {
	constructor(
		private readonly _httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly _insightHubOptions: IInsightHub,
		private readonly _tokenManagerService: XdTokenManagerService,
	) {}

	// TODO - Remove this method before merging - demonstration functionality only
	async onModuleInit() {
		// eslint-disable-next-line no-console
		// console.log(await firstValueFrom(this.getUsersData()));
	}

	/**
	 * Allows to get the users data from the User API.
	 */
	public getUsersData(): Observable<IUsersResponse> {
		return this._tokenManagerService.getOrCreateBearerToken().pipe(
			switchMap((token) => {
				return this._httpClient
					.get<IUsersResponse>(`${this._insightHubOptions.apiUrl}/im/v3/Users`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.pipe(map((response) => response.data));
			}),
		);
	}
}
