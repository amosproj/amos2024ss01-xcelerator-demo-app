import { IGetTimeSeriesParams } from 'facilities-shared-models';
import { IsNotEmpty, IsString } from 'class-validator';

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
