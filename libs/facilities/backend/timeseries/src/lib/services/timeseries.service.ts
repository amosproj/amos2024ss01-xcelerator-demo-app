import { ITimeSeriesPumpReport } from '@frontend/facilities/backend/models';
import { checkPumpStatus } from '@frontend/facilities/backend/utils';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ETimeSeriesOrdering, XdIotTimeSeriesService } from 'common-backend-insight-hub';
import { PrismaService } from 'common-backend-prisma';
import {
	IGetTimeSeriesParams,
	IGetTimeseriesQuery,
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from 'facilities-shared-models';
import { pick } from 'lodash';
import { catchError, from, map, Observable, switchMap } from 'rxjs';

@Injectable()
export class XdTimeseriesService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,

		private readonly iotTimeSeriesService: XdIotTimeSeriesService,
	) {}

	/**
	 * Get timeseries data based on the assetId and propertySetName from the API
	 */
	public getTimeSeriesFromApi(
		args: IGetTimeSeriesParams & IGetTimeseriesQuery,
	): Observable<ITimeSeriesDataItemResponse[] | never[]> {
		const { assetId, propertySetName, sort, select, ...params } = args;

		return from(
			this.prismaService.timeSeriesItem.findUnique({
				where: { assetId_propertySetName: { assetId, propertySetName } },
			}),
		).pipe(
			map((item) => {
				if (!item) {
					throw new HttpException(
						`No timeseries data found for assetId: ${assetId} and propertySetName: ${propertySetName}`,
						HttpStatus.NOT_FOUND,
					);
				}
				return item;
			}),
			switchMap(() => {
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
							const data = items.map((item) => {
								const { _time, ...rest } = item;
								return {
									...rest,
									time: new Date(_time),
								};
							});

							const pumpStatus = checkPumpStatus(
								data as unknown as ITimeSeriesPumpReport[],
							);

							const timeSeriesData = data.map(({ time, ...rest }) => {
								return this.prismaService.timeSeriesDataItem.upsert({
									where: {
										timeSeriesItemAssetId_timeSeriesItemPropertySetName_time: {
											timeSeriesItemAssetId: assetId,
											timeSeriesItemPropertySetName: propertySetName,
											time: time,
										},
									},
									update: {},
									create: {
										time: time,
										timeSeriesItemAssetId: assetId,
										timeSeriesItemPropertySetName: propertySetName,
										data: rest,
									},
								});
							});

							const updatedPumpData = this.prismaService.asset.upsert({
								where: {
									assetId,
								},
								update: {
									status: pumpStatus,
								},
								create: {
									assetId,
									status: pumpStatus,
									location: {
										create: {
											latitude: 0,
											longitude: 0,
										},
									},
									name: 'Pump',
									typeId: 'pump',
								},
							});

							this.prismaService.$transaction([...timeSeriesData, updatedPumpData]);

							if (select) {
								return data.map((item) => ({
									...pick(item, select),
									time: item.time,
								}));
							}

							return data;
						}),
					);
			}),
		);
	}

	/**
	 * Get timeseries data based on the assetId and propertySetName from the DB
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

	/**
	 * Get all timeseries data
	 */
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

	/**
	 * Get timeseries data based on the assetId
	 */
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
