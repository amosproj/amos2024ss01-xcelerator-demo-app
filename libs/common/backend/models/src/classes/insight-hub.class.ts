import { IsDefined, IsString } from 'class-validator';

import { IInsightHub } from '../interfaces/insight-hub.interface';

/**
 * The class for environmental variables of the Insight service
 */
export class InsightHub implements IInsightHub {
	/**
	 * The URL of the API to use for the IotTimeSeriesService
	 */
	@IsDefined()
	@IsString()
	apiUrl: string;

	/**
	 * The API key to use for the IotTimeSeriesService
	 */
	@IsDefined()
	@IsString()
	apiKey: string;
}
