import { ETimeSeriesOrdering } from '../enums';

/**
 * Interface for the parameters of requesting time series data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITimeSeriesRequestParameter<SelectType> {
	/**
	 * The entity id of the time series data
	 *
	 * @default "asc"
	 */
	sort?: ETimeSeriesOrdering;

	/**
	 * The maximum number of data points to return
	 */
	limit?: number;

	/**
	 * The start date of the time series data
	 */
	from?: Date;

	/**
	 * The end date of the time series data
	 */
	to?: Date;

	/**
	 * The properties to select from the time series data
	 */
	select?: (keyof SelectType)[];
}
