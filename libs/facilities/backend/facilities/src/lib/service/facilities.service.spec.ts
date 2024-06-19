import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { XdAssetsService, XdTokenManagerService } from 'common-backend-insight-hub';
import { PrismaService } from 'common-backend-prisma';
import { create } from 'lodash';
import { lastValueFrom, of } from 'rxjs';

import { XdFacilitiesService } from './facilities.service';

const INSIGHT_HUB_OPTIONS = 'INSIGHT_HUB_OPTIONS';

describe('FacilitiesService ', () => {
	let service: XdFacilitiesService;
	let prisma: PrismaService = new PrismaService();
	let iothub: XdAssetsService;

	beforeAll(async () => {
		const prismaServiceMock = {
			asset: {
				findMany: jest.fn().mockReturnValue([]),
				findFirst: jest.fn().mockReturnValue([]),
			},
		};

		const httpServiceMock = {
			get: jest.fn().mockImplementation(() => of({ data: {} })),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				XdFacilitiesService,
				{
					provide: PrismaService,
					useValue: prismaServiceMock,
				},
				{
					provide: HttpService,
					useValue: httpServiceMock,
				},
				{
					provide: XdAssetsService,
					useValue: {
						getTimeSeriesData: jest.fn().mockReturnValue(of([])),
					},
				},
				{
					provide: HttpService,
					useValue: httpServiceMock,
				},
				{
					provide: INSIGHT_HUB_OPTIONS,
					useValue: {
						apiUrl: 'https://gateway.eu1.mindsphere.io/api',
						apiKey: 'test',
					},
				},
				{
					provide: XdTokenManagerService,
					useValue: {
						getOrCreateBearerToken: jest.fn().mockReturnValue(of('test_token')),
					},
				},
				{
					provide: Logger,
					useValue: {
						error: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<XdFacilitiesService>(XdFacilitiesService);
		prisma = module.get<PrismaService>(PrismaService);
		iothub = module.get<XdAssetsService>(XdAssetsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	const resultMock = {
		assetId: '1',
		name: 'test',
		description: 'test',
		typeId: 'test',
		variables: {},
		createdAt: new Date(),
		updatedAt: new Date(),
		location: {
			latitude: 1,
			longitude: 1,
		},
		cases: [],
	};

	it('should return all facilities', async () => {
		const prismaSpy = jest.spyOn(prisma.asset, 'findMany').mockResolvedValue([resultMock]);

		const result = await lastValueFrom(service.getAllFacilitiesFromDB());

		expect(prismaSpy).toHaveBeenCalled();
		expect(result).toEqual([resultMock]);
	});

	it('should return a facility by id', async () => {
		const prismaSpy = jest.spyOn(prisma.asset, 'findFirst').mockResolvedValue(resultMock);

		const result = await lastValueFrom(service.getFacilityById('1'));

		expect(prismaSpy).toHaveBeenCalled();

		expect(result).toEqual(resultMock);
	});
});
