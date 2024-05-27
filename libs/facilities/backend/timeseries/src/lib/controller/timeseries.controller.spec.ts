import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { firstValueFrom, Observable, of } from 'rxjs';

import { ESortOrder } from '../interfaces/query.interface';
import {
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from '../interfaces/response.interface';
import { XdTimeseriesService } from '../services/timeseries.service';
import { XdTimeseriesController } from './timeseries.controller';

describe('TimeseriesController ', () => {
	let controller: XdTimeseriesController;
	let service: XdTimeseriesService;

	beforeAll(async () => {
		const serviceMock = {
			getAllTimeSeries: jest.fn().mockReturnValue(
				of([
					{
						entityId: faker.string.uuid(),
						propertySetName: faker.string.uuid(),
					} as ITimeSeriesItemResponse,
				]) as Observable<ITimeSeriesItemResponse[]>,
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
				entityId: faker.string.uuid(),
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

	it('should return timeseriesDataItems when called with entityId and propertysetName', async () => {
		const entityId = faker.string.uuid();
		const propertySetName = faker.string.uuid();
		const from = faker.date.recent();
		const to = faker.date.recent();
		const limit = faker.number.int(10);
		const select = ['test'];
		const sort = ESortOrder.ASC;
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
					entityId,
					propertySetName,
				},
				{
					from,
					to,
					limit,
					select,
					sort,
					latestValue,
				},
			),
		);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith({
			entityId,
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
});
