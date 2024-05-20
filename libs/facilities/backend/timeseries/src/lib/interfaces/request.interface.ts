export interface IGetTimeSeriesParams {
	entityId: string;
	propertySetName: string;
}

export interface IGetTimeseriesQuery {
	from?: Date;
	to?: Date;
	limit?: number;
	select?: string[];
	sort?: 'asc' | 'desc';
	latestValue?: boolean;
}
