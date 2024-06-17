import { ITimeSeriesItemData } from './time-series-item-data.interface';

export interface ITimeSeriesItem {
	/**
	 * The id of the time series item
	 */
	id: string;

	/**
	 * The connected asset id
	 */
	assetId: string;

	/**
	 * The property set name
	 */
	propertySetName: string;

	/**
	 * The time series data items
	 */
	timeSeriesDataItems: ITimeSeriesItemData[];
}
