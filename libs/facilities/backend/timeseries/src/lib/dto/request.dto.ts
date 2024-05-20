import { ApiProperty } from '@nestjs/swagger';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';

export class GetTimeSeriesParamsDto implements IGetTimeSeriesParams {
	@ApiProperty({ required: true })
	entityId!: string;

	@ApiProperty({ required: true })
	propertySetName!: string;
}

export class GetTimeSeriesQueryDto implements IGetTimeseriesQuery {
	@ApiProperty()
	from?: Date;

	@ApiProperty()
	to?: Date;

	@ApiProperty()
	limit?: number;

	@ApiProperty()
	select?: string[];

	@ApiProperty()
	sort?: 'asc' | 'desc';

	@ApiProperty()
	latestValue?: boolean;
}
