import { IsNotEmpty, IsString } from 'class-validator';
import { IGetTimeSeriesParams } from 'facilities-shared-models';

/**
 * The DTO for the time series parameters,
 * this is to validate the path parameters.
 */
export class GetTimeSeriesParamsDto implements IGetTimeSeriesParams {
	/**
	 * The asset id for an asset
	 */
	@IsNotEmpty()
	@IsString()
	assetId: string;

	/**
	 * The name of the aspect
	 */
	@IsNotEmpty()
	@IsString()
	propertySetName: string;
}
