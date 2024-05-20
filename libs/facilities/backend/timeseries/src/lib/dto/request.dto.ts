import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsInt } from 'class-validator';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';

export class GetTimeSeriesParamsDto implements IGetTimeSeriesParams {
	entityId!: string;

	propertySetName!: string;
}

export class GetTimeSeriesQueryDto implements IGetTimeseriesQuery {
	@IsDate()
	@Type(() => Date)
	from?: Date;

	@IsDate()
	@Type(() => Date)
	to?: Date;

	@IsInt()
	@Type(() => Number)
	limit?: number;

	@IsArray()
	select?: string[];

	@IsEnum(['asc', 'desc'])
	sort?: 'asc' | 'desc';

	latestValue?: boolean;
}
