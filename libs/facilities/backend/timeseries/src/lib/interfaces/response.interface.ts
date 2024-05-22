import { TTimeSeriesData } from 'common-backend-prisma';

export interface ITimeSeriesDataItemResponse {
	time: Date;
	[key: string]: TTimeSeriesData;
}

export interface ITimeSeriesItemResponse {
	entityId: string;
	propertySetName: string;
}
