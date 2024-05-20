export interface TimeSeriesDataItemResponse {
	time: Date;
	[key: string]: number | string | Date | boolean | null;
}

export interface TimeSeriesItemResponse {
	entityId: string;
	propertySetName: string;
}
