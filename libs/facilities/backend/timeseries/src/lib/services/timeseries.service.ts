import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TimeSeriesDataItem } from '@prisma/client';
import { PrismaService } from 'common-backend-prisma';
import { catchError, from, map, Observable } from 'rxjs';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';
import {
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from '../interfaces/respons.interface';

@Injectable()
export class TimeseriesService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
		// @Inject(ConfigService)
		// private readonly configService: ConfigService,
	) {}

	private unjsonifyItems({
		items,
		select,
	}: {
		items: TimeSeriesDataItem[];
		select?: string[];
	}): ITimeSeriesDataItemResponse[] {
		return items.map(({ time, data: json }) => {
			/**
			 * Parse the JSON data
			 * @tutorial
			 * this is a workaround, since Prisma already returns the data as a object
			 */
			const data = typeof json === 'string' ? JSON.parse(json) : json;

			if (!select) {
				return {
					time: time,
					...data,
				};
			}

			/**
			 * Select only the selected data
			 */
			const selectedData = Object.fromEntries(
				Object.entries(data).filter(([key]) => select.includes(key)),
			);

			return {
				time: time,
				...selectedData,
			};
		});
	}

	public getTimeSeriesFromDB(
		args: IGetTimeSeriesParams & IGetTimeseriesQuery,
	): Observable<ITimeSeriesDataItemResponse[]> {
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
		).pipe(
			map((items) => this.unjsonifyItems({ items, select: args.select })),
			catchError((err: Error) => {
				// eslint-disable-next-line no-console
				console.log(err);
				throw err;
			}),
		);
	}

	public getAllTimeSeries(): Observable<ITimeSeriesItemResponse[]> {
		return from(this.prismaService.timeSeriesItem.findMany()).pipe(
			map((items) =>
				items.map((item) => ({
					entityId: item.entityId,
					propertySetName: item.propertySetName,
				})),
			),
			catchError((err: Error) => {
				// eslint-disable-next-line no-console
				console.log(err);
				throw err;
			}),
		);
	}
}
