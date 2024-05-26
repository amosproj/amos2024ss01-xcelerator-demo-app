import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDate,
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';

/**
 * The DTO for the time series parameters,
 * this is to validate the path parameters.
 */
export class GetTimeSeriesParamsDto implements IGetTimeSeriesParams {
	/**
	 * The entity id for an asset
	 */
	@IsNotEmpty()
	@IsString()
	entityId: string;

	/**
	 * The name of the aspect
	 */
	@IsNotEmpty()
	@IsString()
	propertySetName: string;
}

/**
 * The DTO for the time series query,
 * this is to validate the query parameters.
 */
export class GetTimeSeriesQueryDto implements IGetTimeseriesQuery {
	/**
	 * The start date for the time series data
	 */
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	from?: Date;

	/**
	 * The end date for the time series data
	 */
	@IsOptional()
	@IsDateString()
	@Type(() => Date)
	to?: Date;

	/**
	 * The amount of data entries to return
	 */
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	limit?: number;

	/**
	 * The fields to select which should be returned
	 */
	@IsOptional()
	@IsString({ each: true })
	select?: string[];

	/**
	 * The sort order for the data entries
	 */
	@IsOptional()
	@IsEnum(['asc', 'desc'])
	sort?: 'asc' | 'desc';

	@IsOptional()
	@IsBoolean()
	latestValue?: boolean;
}
