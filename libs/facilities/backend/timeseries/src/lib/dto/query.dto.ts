import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ESortOrder, IGetTimeseriesQuery } from 'facilities-shared-models';

/**
 * The DTO for the time series query,
 * this is to validate the query parameters.
 */
export class GetTimeSeriesQueryDto implements IGetTimeseriesQuery {
	/**
	 * If the data should be fetched from the local database
	 */
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	local?: boolean;

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
	@IsDate()
	@Type(() => Date)
	to?: Date;

	/**
	 * The amount of data entries to return
	 */
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
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
	@IsEnum(ESortOrder)
	sort?: ESortOrder;

	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	latestValue?: boolean;
}
