import { IsNotEmpty, IsString } from 'class-validator';
import { IGetFacilitiesParams } from 'facilities-shared-models';

/**
 * The DTO for the facility parameters,
 * this is to validate the path parameters.
 */
export class GetFacilityParamsDto implements IGetFacilitiesParams {
	/**
	 * The asset id for a facility
	 */
	@IsNotEmpty()
	@IsString()
	assetId: string;
}
