import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'common-backend-prisma';

@Injectable()
export class PumpService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
		@Inject(ConfigService)
		private readonly configService: ConfigService,
	) {}

	// async getTimeSeries<{time: Date, T}>(params: IGetTimeSeriesParams, query: IGetTimeseriesQuery) {
	// 	/**
	// 	 * Extract the parameters and query from the request
	// 	 */
	// 	const { entityId, propertySetName } = params;
	// 	const { from, to, limit, select, sort, latestValue } = query;

	// 	/**
	// 	 * Get the time series data items based on the parameters and query
	// 	 */
	// 	const items = await this.prismaService.timeSeriesDataItem.findMany({
	// 		where: {
	// 			timeSeriesItementityId: params.entityId,
	// 			timeSeriesItempropertySetName: params.propertySetName,
	// 			time: {
	// 				gte: from,
	// 				lte: to,
	// 			},
	// 		},
	// 		take: limit,
	// 		orderBy: {
	// 			time: sort
	// 		},
	// 	});

	// 	const unjsonifiedItems = items.map((item) => {

	// 		const data =  JSON.parse(item.data as string) as T;

	// 		return {
	// 			...item,
	// 			data,
	// 		};
	// 	})
}
