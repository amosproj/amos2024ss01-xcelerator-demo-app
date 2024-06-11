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
	 * The assetId id for an asset
	 */
	assetId: string;

	/**
	 * The name of the aspect
	 */
	propertySetName: string;

	/**
	 * The variables of the aspect
	 */
	variables?: {
		name: string;
		unit: string;
	}[];
}
