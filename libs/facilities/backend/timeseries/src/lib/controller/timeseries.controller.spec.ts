import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import {
	ESortOrder,
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from 'facilities-shared-models';
import { firstValueFrom, Observable, of } from 'rxjs';

import { XdTimeseriesService } from '../services';
import { XdTimeseriesController } from './timeseries.controller';

describe('TimeseriesController ', () => {
	let controller: XdTimeseriesController;
	let service: XdTimeseriesService;

	beforeAll(async () => {
		const serviceMock = {
			getAllTimeSeries: jest.fn().mockReturnValue(
				of([
					{
						assetId: faker.string.uuid(),
						propertySetName: faker.string.uuid(),
					} as ITimeSeriesItemResponse,
				]) as Observable<ITimeSeriesItemResponse[]>,
			),
			getTimeSeriesFromApi: jest.fn().mockReturnValue(
				of([
					{ time: faker.date.recent(), test: faker.string.sample() },
					{ time: faker.date.recent(), test: faker.string.sample() },
				] as ITimeSeriesDataItemResponse[]) as Observable<ITimeSeriesDataItemResponse[]>,
			),
			getTimeSeriesFromDB: jest.fn().mockReturnValue(
				of([
					{ time: faker.date.recent(), test: faker.string.sample() },

					{ time: faker.date.recent(), test: faker.string.sample() },
				] as ITimeSeriesDataItemResponse[]) as Observable<ITimeSeriesDataItemResponse[]>,
			),
		};

		const module = await Test.createTestingModule({
			controllers: [XdTimeseriesController],
			providers: [
				{
					provide: XdTimeseriesService,
					useValue: serviceMock,
				},
			],
		}).compile();

		controller = module.get<XdTimeseriesController>(XdTimeseriesController);
		service = module.get<XdTimeseriesService>(XdTimeseriesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return timeseries data', () => {
		expect(controller).toBeDefined();
	});

	it('should call getAllTimeseries', async () => {
		const retunValue = [
			{
				assetId: faker.string.uuid(),
				propertySetName: faker.string.uuid(),
			},
		] as ITimeSeriesItemResponse[];

		const spy = jest
			.spyOn(service, 'getAllTimeSeries')
			.mockReturnValue(of(retunValue) as Observable<ITimeSeriesItemResponse[]>);

		const result = await firstValueFrom(controller.getAllTimeseries());

		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toEqual(retunValue);
	});

	it('should return timeseriesDataItems when called with assetId and propertysetName', async () => {
		const assetId = faker.string.uuid();
		const propertySetName = faker.string.uuid();
		const from = faker.date.recent();
		const to = faker.date.recent();
		const limit = faker.number.int(10);
		const select = ['test'];
		const sort = ESortOrder.ASCENDING;
		const latestValue = true;

		const returnValue = [
			{ time: faker.date.recent(), test: faker.string.sample() },
			{ time: faker.date.recent(), test: faker.string.sample() },
		] as ITimeSeriesDataItemResponse[];

		const spy = jest
			.spyOn(service, 'getTimeSeriesFromDB')
			.mockReturnValue(of(returnValue) as Observable<ITimeSeriesDataItemResponse[]>);

		const result = await firstValueFrom(
			controller.getTimeSeries(
				{
					assetId,
					propertySetName,
				},
				{
					from,
					to,
					limit,
					select,
					sort,
					latestValue,
					local: true,
				},
			),
		);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith({
			assetId,
			propertySetName,
			from,
			to,
			limit,
			select,
			sort,
			latestValue,
		});
		expect(result).toEqual(returnValue);
	});

	it(' should call getTimeSeriesFromApi when local is false', async () => {
		const assetId = faker.string.uuid();
		const propertySetName = faker.string.uuid();
		const from = faker.date.recent();
		const to = faker.date.recent();
		const limit = faker.number.int(10);
		const select = ['test'];
		const sort = ESortOrder.ASCENDING;
		const latestValue = true;
		const local = false;

		const returnValue = [
			{ time: faker.date.recent(), test: faker.string.sample() },
			{ time: faker.date.recent(), test: faker.string.sample() },
		] as ITimeSeriesDataItemResponse[];

		const spyApi = jest
			.spyOn(service, 'getTimeSeriesFromApi')
			.mockReturnValue(of(returnValue) as Observable<ITimeSeriesDataItemResponse[]>);

		const spyDb = jest
			.spyOn(service, 'getTimeSeriesFromDB')
			.mockReturnValue(of(returnValue) as Observable<ITimeSeriesDataItemResponse[]>);

		const result = await firstValueFrom(
			controller.getTimeSeries(
				{
					assetId,
					propertySetName,
				},
				{
					from,
					to,
					limit,
					select,
					sort,
					latestValue,
					local,
				},
			),
		);

		expect(spyApi).toHaveBeenCalledTimes(1);
		expect(spyApi).toHaveBeenCalledWith({
			assetId,
			propertySetName,
			from,
			to,
			limit,
			select,
			sort,
			latestValue,
		});
		expect(result).toEqual(returnValue);

		expect(spyDb).toHaveBeenCalledTimes(0);
	});
});
