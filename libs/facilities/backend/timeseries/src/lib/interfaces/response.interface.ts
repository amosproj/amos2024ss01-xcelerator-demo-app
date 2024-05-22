export type TimeSeriesData = string | number | Date | boolean | null;

export interface ITimeSeriesDataItemResponse {
	time: Date;
	[key: string]: TimeSeriesData;
}

export interface ITimeSeriesItemResponse {
	entityId: string;
	propertySetName: string;
}
