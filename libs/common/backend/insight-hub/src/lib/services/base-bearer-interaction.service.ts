import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { XdTokenManagerService } from './token-manager.service';

@Injectable()
export abstract class XdBaseBearerInteractionService {
	protected constructor(
		protected readonly _httpClient: HttpService,
		protected readonly _insightHubOptions: IInsightHub,
		protected readonly _tokenManagerService: XdTokenManagerService,
		protected readonly _logger: Logger,
		protected readonly _baseUrl: string,
	) {
		this._baseUrl = `${this._insightHubOptions.apiUrl}/${this._baseUrl}`;
	}

	/**
	 * Fetches data from the API. It will automatically add the bearer token to the request and handle errors.
	 * @param suffixUrl - The URL to fetch the data from
	 * @param params - The parameters to pass to the request
	 */
	protected _getData<T>(suffixUrl?: string, params?: object): Observable<T> {
		const url = suffixUrl ? `${this._baseUrl}/${suffixUrl}` : this._baseUrl;
		return this._tokenManagerService.getOrCreateBearerToken().pipe(
			switchMap((token) => {
				return this._httpClient
					.get<T>(url, {
						params,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.pipe(
						map((response) => response.data),
						catchError((error: unknown) => {
							this._logger.error(
								`${this.constructor.name}: Error while fetching data`,
								error,
							);
							return of({} as T);
						}),
					);
			}),
		);
	}
}
