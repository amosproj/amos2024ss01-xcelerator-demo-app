/**
 * The interface for environmental variables of the Insight service
 */
export interface IInsightHub {
	/**
	 * The URL of the API to use for the IotTimeSeriesService
	 */
	apiUrl: string;

	/**
	 * The API key to use for the IotTimeSeriesService
	 */
	apiKey: string;
}
