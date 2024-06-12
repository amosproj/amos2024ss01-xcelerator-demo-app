/**
 * Interface for Time Series Response
 */
export interface ITimeSeriesResponse {
	/**
	 * The time of the data
	 */
	time: Date;

	/**
	 * The key value pairs of the time series interface
	 */
	[key: PropertyKey]: any;
}
