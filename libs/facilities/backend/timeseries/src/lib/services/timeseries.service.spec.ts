import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'common-backend-prisma';

import { TimeseriesService } from './timeseries.service';

describe('TimeseriesService', () => {
	let service: TimeseriesService;
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
				TimeseriesService,
				{
					provide: PrismaService,
					useValue: prismaServiceMock,
				},
			],
		}).compile();

		service = module.get<TimeseriesService>(TimeseriesService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return time series data', async () => {
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

		const params = {
			entityId: findManyResult.timeSeriesItementityId,
			propertySetName: findManyResult.timeSeriesItempropertySetName,
		};

		const result = await service.getTimeSeriesFromDB({
			...params,
			select: ['flow', 'presure'],
		});

		console.log(result);

		expect(findManySpy).toHaveBeenCalledTimes(1);

		expect(result).toEqual([
			{
				time: expect.any(Date),
				flow: flow,
				presure: presure,
			},
		]);
	});
});
