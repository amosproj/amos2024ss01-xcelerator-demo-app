import { TTimeSeriesData } from 'common-shared-models';

/**
 * Interface for a time series data item response
 */
export interface ITimeSeriesDataItemResponse {
	/**
	 * The time of the data
	 */
	time: Date;

	/**
	 * The data for the time
	 */
	[key: string]: TTimeSeriesData;
}

/**
 * Interface for a time series response
 */
export interface ITimeSeriesItemResponse {
	/**
	 * The entity id for an asset
	 */
	entityId: string;

	/**
	 * The name of the aspect
	 */
	propertySetName: string;
}
