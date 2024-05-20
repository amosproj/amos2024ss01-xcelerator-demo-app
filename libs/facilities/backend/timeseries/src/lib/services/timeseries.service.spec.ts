import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'common-backend-prisma';
import { lastValueFrom } from 'rxjs';

import { IGetTimeSeriesParams, IGetTimeseriesQuery } from '../interfaces/request.interface';
import { XdTimeseriesService } from './timeseries.service';

describe('TimeseriesService', () => {
	let service: XdTimeseriesService;
	let prisma: PrismaService;

	beforeEach(async () => {
		const prismaServiceMock = {
			timeSeriesDataItem: {
				findMany: jest.fn().mockImplementation(() => [
					{
						time: new Date(),
						data: JSON.stringify({ test: 'test', test2: 'test2' }),
					},
				]),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				XdTimeseriesService,
				{
					provide: PrismaService,
					useValue: prismaServiceMock,
				},
			],
		}).compile();

		service = module.get<XdTimeseriesService>(XdTimeseriesService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return the correct time series data', async () => {
		const flow = faker.string.sample();
		const presure = faker.string.sample();
		const findManyResult = {
			time: new Date(),
			timeSeriesItementityId: faker.string.uuid(),
			timeSeriesItempropertySetName: faker.string.sample(),
			data: JSON.stringify({ flow: flow, presure: presure }) as Prisma.JsonValue,
		};

		const findManySpy = jest
			.spyOn(prisma.timeSeriesDataItem, 'findMany')
			.mockResolvedValue([findManyResult]);

		const params: IGetTimeSeriesParams = {
			entityId: findManyResult.timeSeriesItementityId,
			propertySetName: findManyResult.timeSeriesItempropertySetName,
		};

		const result = await lastValueFrom(
			service.getTimeSeriesFromDB({
				...params,
				select: ['flow', 'presure'],
			}),
		);

		expect(findManySpy).toHaveBeenCalledTimes(1);

		expect(result).toEqual([
			{
				time: expect.any(Date),
				flow: flow,
				presure: presure,
			},
		]);
	});

	it('should return only the selected props', async () => {
		const flow = faker.string.sample();
		const presure = faker.string.sample();
		const findManyResult = {
			time: new Date(),
			timeSeriesItementityId: faker.string.uuid(),
			timeSeriesItempropertySetName: faker.string.sample(),
			data: JSON.stringify({ flow: flow, presure: presure }) as Prisma.JsonValue,
		};

		const findManySpy = jest
			.spyOn(prisma.timeSeriesDataItem, 'findMany')
			.mockResolvedValue([findManyResult]);

		const params: IGetTimeSeriesParams = {
			entityId: findManyResult.timeSeriesItementityId,
			propertySetName: findManyResult.timeSeriesItempropertySetName,
		};

		const query: IGetTimeseriesQuery = {
			select: ['flow'],
		};

		const result = await lastValueFrom(
			service.getTimeSeriesFromDB({
				...params,
				...query,
			}),
		);

		expect(findManySpy).toHaveBeenCalledTimes(1);

		expect(result).toEqual([
			{
				time: expect.any(Date),
				flow: flow,
			},
		]);
	});

	it('should use the correct args to query the time series data', async () => {
		const findManySpy = jest.spyOn(prisma.timeSeriesDataItem, 'findMany').mockResolvedValue([]);

		const params: IGetTimeSeriesParams = {
			entityId: faker.string.uuid(),
			propertySetName: faker.string.sample(),
		};

		const query: IGetTimeseriesQuery = {
			from: faker.date.past(),
			to: faker.date.recent(),
			limit: faker.number.int(10),
			sort: 'asc',
		};

		await lastValueFrom(
			service.getTimeSeriesFromDB({
				...params,
				...query,
			}),
		);

		expect(findManySpy).toHaveBeenCalledTimes(1);

		expect(findManySpy).toHaveBeenCalledWith({
			where: {
				timeSeriesItementityId: params.entityId,
				timeSeriesItempropertySetName: params.propertySetName,
				time: {
					gte: query.from,
					lte: query.to,
				},
			},
			take: query.limit,
			orderBy: {
				time: query.sort,
			},
		});
	});
});
