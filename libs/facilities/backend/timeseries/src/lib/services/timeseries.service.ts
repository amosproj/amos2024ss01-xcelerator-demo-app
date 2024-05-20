import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TimeSeriesDataItem } from '@prisma/client';
import { PrismaService } from 'common-backend-prisma';
import { from, map, Observable } from 'rxjs';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';
import {
	TimeSeriesDataItemResponse,
	TimeSeriesItemResponse,
} from '../interfaces/respons.interface';

@Injectable()
export class TimeseriesService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
		// @Inject(ConfigService)
		// private readonly configService: ConfigService,
	) {}

	private unjsonifyItems(
		items: TimeSeriesDataItem[],
		select?: string[],
	): TimeSeriesDataItemResponse[] {
		return items.map((item) => {
			if (!select) {
				return {
					time: item.time,
					...(item.data as {
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
	}

	public getTimeSeriesFromDB(
		args: IGetTimeSeriesParams & IGetTimeseriesQuery,
	): Observable<TimeSeriesDataItemResponse[]> {
		/**
		 * Extract the parameters
		 */
		const { entityId, propertySetName } = args;

		/**
		 * Get the time series data items based on the parameters and query
		 */
		return from(
			this.prismaService.timeSeriesDataItem.findMany({
				where: {
					timeSeriesItementityId: entityId,
					timeSeriesItempropertySetName: propertySetName,
					time: {
						gte: args.from,
						lte: args.to,
					},
				},
				take: args.limit,
				orderBy: {
					time: args.sort,
				},
			}),
		).pipe(map((items) => this.unjsonifyItems(items, args.select)));
	}

	public getAllTimeSeries(): Observable<TimeSeriesItemResponse[]> {
		return from(this.prismaService.timeSeriesItem.findMany()).pipe(
			map((items) =>
				items.map((item) => ({
					entityId: item.entityId,
					propertySetName: item.propertySetName,
				})),
			),
		);
	}
}
