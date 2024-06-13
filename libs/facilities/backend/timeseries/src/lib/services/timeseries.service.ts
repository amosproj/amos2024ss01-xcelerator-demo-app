import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ETimeSeriesOrdering, XdIotTimeSeriesService } from 'common-backend-insight-hub';
import { PrismaService } from 'common-backend-prisma';
import {
	IGetTimeSeriesParams,
	IGetTimeseriesQuery,
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from 'facilities-shared-models';
import { catchError, from, map, Observable } from 'rxjs';

@Injectable()
export class XdTimeseriesService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,

		private readonly iotTimeSeriesService: XdIotTimeSeriesService,
	) {}

	public getTimeSeriesFromApi(
		args: IGetTimeSeriesParams & IGetTimeseriesQuery,
	): Observable<ITimeSeriesDataItemResponse[]> {
		const { assetId, propertySetName, sort, ...params } = args;

		return this.iotTimeSeriesService
			.getTimeSeriesData<
				any,
				{
					_time: string;

					[key: string]: any;
				}[]
			>(assetId, propertySetName, {
				...params,
				// Todo: Fix this in a future PR
				sort: sort as unknown as ETimeSeriesOrdering,
			})
			.pipe(
				map((items) => {
					return items.map((item) => {
						const { _time, ...rest } = item;
						return {
							...rest,
							time: new Date(_time),
						};
					});
				}),
			);
	}

	/**
	 * Get timeseries data based on the assetId and propertySetName
	 */
	public getTimeSeriesFromDB(
		args: IGetTimeSeriesParams & IGetTimeseriesQuery,
	): Observable<ITimeSeriesDataItemResponse[]> {
		const { assetId, propertySetName } = args;

		return from(
			this.prismaService.timeSeriesDataItem.findMany({
				where: {
					timeSeriesItemAssetId: assetId,
					timeSeriesItemPropertySetName: propertySetName,
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
					...this.prismaService.selectKeysFromJSON(item.data, args.select),
				}));
			}),
			catchError((err: Error) => {
				throw err;
			}),
		);
	}

	public getAllTimeSeries(): Observable<ITimeSeriesItemResponse[]> {
		return from(this.prismaService.timeSeriesItem.findMany()).pipe(
			map((items) =>
				items.map((item) => ({
					assetId: item.assetId,
					propertySetName: item.propertySetName,
					variables: item.variables as {
						name: string;
						unit: string;
					}[],
				})),
			),
		);
	}
	public getTimeSeriesForAsset(assetId: string): Observable<ITimeSeriesItemResponse[]> {
		return from(
			this.prismaService.timeSeriesItem.findMany({
				where: {
					assetId,
				},
			}),
		).pipe(
			map((items) =>
				items.map((item) => ({
					assetId: item.assetId,
					propertySetName: item.propertySetName,
					variables: item.variables as {
						name: string;
						unit: string;
					}[],
				})),
			),
		);
	}
}
