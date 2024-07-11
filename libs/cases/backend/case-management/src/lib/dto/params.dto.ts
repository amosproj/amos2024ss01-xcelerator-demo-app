import { ICaseParams } from 'cases-shared-models';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 * The DTO for the case parameters,
 */
export class caseParamsDto implements ICaseParams {
	/**
	 * The id of the asset
	 * @example 1
	 */
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	id: number;
}
