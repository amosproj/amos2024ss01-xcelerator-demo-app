import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IInsightHub } from 'common-backend-models';
import { Observable } from 'rxjs';

import { IUsersResponse } from '../models/interfaces/users-response.interface';
import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdBaseBearerInteractionService } from './base-bearer-interaction.service';
import { XdTokenManagerService } from './token-manager.service';

/**
 * Service to interact with the User Management API.
 */
@Injectable()
export class XdUsersService extends XdBaseBearerInteractionService {
	constructor(
		private readonly httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		private readonly insightHubOptions: IInsightHub,
		private readonly tokenManagerService: XdTokenManagerService,
		private readonly logger: Logger,
	) {
		super(httpClient, insightHubOptions, tokenManagerService, logger, 'im/v3/Users');
	}

	/**
	 * Allows to get the users data from the User API.
	 */
	public getUsersData(): Observable<IUsersResponse> {
		return super._getData<IUsersResponse>();
	}
}
