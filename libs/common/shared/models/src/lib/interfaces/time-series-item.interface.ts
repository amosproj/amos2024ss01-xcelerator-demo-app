export interface ITimeSeriesItem {
	/**
	 * The id of the time series item
	 */
	id: string;

	/**
	 * The connected entity id
	 */
	entityId: string;

	/**
	 * The property set name
	 */
	propertySetName: string;

	/**
	 * The time series data items
	 */
	timeSeriesDataItems: ITimeSeriesItem[];
}
