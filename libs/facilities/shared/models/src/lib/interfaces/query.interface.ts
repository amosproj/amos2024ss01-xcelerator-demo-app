/**
 * Interface for the time series query parameters
 */
export interface IGetTimeseriesQuery {
	/**
	 * Flag to indicate if the data should be fetched from the local database
	 */
	local?: boolean;
	/**
	 * Start date for the time series data
	 */
	from?: Date;
	/**
	 * End date for the time series data
	 */
	to?: Date;
	/**
	 * Limit of data entries to return
	 */
	limit?: number;
	/**
	 * Fields to select which should be returned
	 */
	select?: string[];
	/**
	 * Sort order for the data entries
	 */
	sort?: ESortOrder;
	/**
	 * Flag to indicate if only the latest value should be returned
	 */
	latestValue?: boolean;
}

/**
 * Enum for defining the sort order
 */
export enum ESortOrder {
	ASCENDING = 'asc',
	DESCENDING = 'desc',
}
