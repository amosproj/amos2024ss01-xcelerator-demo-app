// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITimeSeriesItemData<T = any> {
	/**
	 * The date time of the item
	 */
	time: Date;

	/**
	 * The data of the item
	 */
	data: T;
}
