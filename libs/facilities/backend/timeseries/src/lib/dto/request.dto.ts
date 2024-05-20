import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';

export class GetTimeSeriesParamsDto implements IGetTimeSeriesParams {
	@IsNotEmpty()
	@IsString()
	entityId!: string;

	@IsNotEmpty()
	@IsString()
	propertySetName!: string;
}

export class GetTimeSeriesQueryDto implements IGetTimeseriesQuery {
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	from?: Date;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	to?: Date;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	limit?: number;

	@IsOptional()
	@IsArray()
	select?: string[];

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	sort?: 'asc' | 'desc';

	@IsOptional()
	@IsBoolean()
	latestValue?: boolean;
}
