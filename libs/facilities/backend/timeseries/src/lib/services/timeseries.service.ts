import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'common-backend-prisma';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';

type TimeSeriesDataItem = {
	time: Date;
	[key: string]: number | string | Date | boolean | null;
};

@Injectable()
export class TimeseriesService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
		// @Inject(ConfigService)
		// private readonly configService: ConfigService,
	) {}

	async getTimeSeriesFromDB(
		args: IGetTimeSeriesParams & IGetTimeseriesQuery,
	): Promise<TimeSeriesDataItem[]> {
		/**
		 * Extract the parameters and query from the request
		 */
		const { entityId, propertySetName } = args;
		const { from, to, limit, select, sort, latestValue } = args;

		/**
		 * Get the time series data items based on the parameters and query
		 */
		const items = await this.prismaService.timeSeriesDataItem.findMany({
			where: {
				timeSeriesItementityId: entityId,
				timeSeriesItempropertySetName: propertySetName,
				time: {
					gte: from,
					lte: to,
				},
			},
			take: limit,
			orderBy: {
				time: sort,
			},
		});

		/**
		 * Unjsonify the items and return them
		 */
		const unjsonifiedItems = items.map((item) => {
			if (!select) {
				return {
					time: item.time,
					...(JSON.parse(item.data) as {
						[key: string]: number | string | Date | boolean | null;
					}),
				};
			}

			const selectedData = Object.fromEntries(
				Object.entries(
					item.data as { [key: string]: number | string | Date | boolean | null },
				).filter(([key]) => select.includes(key)),
			);

			return {
				time: item.time,
				...selectedData,
			};
		});

		return unjsonifiedItems;
	}
}
