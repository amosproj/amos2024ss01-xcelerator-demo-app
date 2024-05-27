import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { ICaseParams } from '../interfaces/params.interface';

/**
 * The DTO for the case parameters,
 */
export class caseParamsDto implements ICaseParams {
	/**
	 * The id of the asset
	 */
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	id: number;
}
