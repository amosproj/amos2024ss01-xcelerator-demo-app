import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'common-backend-prisma';
import { catchError, from, map, Observable } from 'rxjs';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';
import {
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from '../interfaces/response.interface';

@Injectable()
export class XdTimeseriesService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
		// @Inject(ConfigService)
		// private readonly configService: ConfigService,
	) {}

	/**
	 * Get timeseries data based on the entityId and propertySetName
	 */
	public getTimeSeriesFromDB(
		args: IGetTimeSeriesParams & IGetTimeseriesQuery,
	): Observable<ITimeSeriesDataItemResponse[]> {
		const { entityId, propertySetName } = args;

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
			map((items) => {
				return items.map((item) => ({
					time: item.time,
					data: this.prismaService.selectKeysFromJSON(item.data, args.select),
				}));
			}),
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
		);
	}
}
