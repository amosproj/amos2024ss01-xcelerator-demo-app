import { ESwaggerTag } from '../enums/swagger-tag.enum';
import { ISwaggerTagInformation } from '../interfaces/swagger-tag-information.interface';

/**
 * Mapping of Swagger Tags to their information
 */
export const SWAGGER_TAG_INFORMATION: Record<ESwaggerTag, ISwaggerTagInformation> = {
	[ESwaggerTag.FACILITIES]: {
		name: 'Facilities',
		description: 'Endpoints for managing facilities',
	},
	[ESwaggerTag.TIME_SERIES]: {
		name: 'Time Series',
		description: 'Endpoints for managing time series data',
	},
	[ESwaggerTag.CASES]: {
		name: 'Cases',
		description: 'Endpoints for managing cases',
	},
};
