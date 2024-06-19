import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ECasePriority, ECaseStatus, ECaseType, ICreateCaseBody } from 'cases-shared-models';
import { PrismaService } from 'common-backend-prisma';
import { omit } from 'lodash';
import { firstValueFrom } from 'rxjs';

import { XdCaseController } from '../controller/case.controller';
import { XdCaseService } from './case.service';

describe('CaseController', () => {
	let service: XdCaseService;
	let prisma: PrismaService = new PrismaService();

	// arrange
	const createCaseModel = {
		handle: faker.string.alpha(10),
		dueDate: faker.date.future(),
		title: faker.lorem.sentence(),
		type: faker.helpers.enumValue(ECaseType),
		status: faker.helpers.enumValue(ECaseStatus),
		description: faker.lorem.sentence(),
		source: faker.string.alpha(),
		priority: faker.helpers.enumValue(ECasePriority),
		createdBy: faker.internet.email(),
	} as ICreateCaseBody;

	beforeEach(async () => {
		const prismaServiceMock = {
			onModuleInit: jest.fn(),

			asset: {
				findUnique: jest.fn(),
			},

			case: {
				create: jest.fn(),
				findMany: jest.fn(),
				findUnique: jest.fn(),
				delete: jest.fn(),
				update: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [XdCaseController],
			providers: [
				XdCaseService,
				{
					provide: PrismaService,
					useValue: prismaServiceMock,
				},
			],
		}).compile();

		service = module.get<XdCaseService>(XdCaseService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('createCase => should create a new case by given data', async () => {
		const createResult = {
			...createCaseModel,
			id: faker.number.int(),
			assetAssetId: faker.string.uuid(),
			modifiedBy: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const spy = jest.spyOn(prisma.case, 'create').mockResolvedValue(createResult);
		const findUniqeSpy = jest.spyOn(prisma.asset, 'findUnique').mockResolvedValue({
			assetId: createResult.assetId,
			description: faker.lorem.sentence(),
			name: faker.lorem.sentence(),
			typeId: faker.string.uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
			variables: {},
		});

		// act
		const result = await firstValueFrom(service.createCase(createCaseModel));

		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith({
			data: { assetId: createCaseModel.assetId, ...omit(createCaseModel, 'assetId') },
		});

		const expectedResult = {
			...omit(createResult, 'assetAssetId'),
			assetId: createResult.assetAssetId,
			overdue: false,
		};

		expect(result).toEqual({ ...expectedResult, overdue: false });
	});

	it('createCase => should create a new case by given data with overdue false', async () => {
		const createResult = {
			id: faker.number.int(),
			...createCaseModel,
			assetAssetId: faker.string.uuid(),
			modifiedBy: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		jest.spyOn(prisma.case, 'create').mockResolvedValue(createResult);

		jest.spyOn(prisma.asset, 'findUnique').mockResolvedValue({
			assetId: createResult.assetId,
			description: faker.lorem.sentence(),
			name: faker.lorem.sentence(),
			typeId: faker.string.uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
			variables: {},
		});

		// act
		const result = await firstValueFrom(service.createCase(createCaseModel));

		// assert
		expect(result).toEqual(expect.objectContaining({ overdue: false }));
	});

	it('getAllCases => should return an array of cases', async () => {
		const getResult = {
			id: faker.number.int(),
			...createCaseModel,
			modifiedBy: '',
			assetAssetId: faker.string.uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const getResultMany = [
			{ ...getResult, dueDate: faker.date.past() },
			{ ...getResult, dueDate: faker.date.recent() },
			{ ...getResult, dueDate: faker.date.future() },
		];

		const spy = jest.spyOn(prisma.case, 'findMany').mockResolvedValue(getResultMany);

		// act
		const result = await firstValueFrom(service.getAllCases());

		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toEqual(
			getResultMany.map((item) => ({
				...omit(item, 'assetAssetId'),
				assetId: item.assetAssetId,
				overdue: item.dueDate < new Date(),
			})),
		);
	});

	it('getCaseById => should find a case by ID and return its data', async () => {
		const getResult = {
			id: faker.number.int(),
			...createCaseModel,
			modifiedBy: '',
			assetAssetId: faker.string.uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const spy = jest.spyOn(prisma.case, 'findUnique').mockResolvedValue(getResult);

		// act
		const result = await firstValueFrom(service.getCaseById(getResult.id));

		const expectedResult = {
			...omit(getResult, 'assetAssetId'),
			assetId: getResult.assetAssetId,
			overdue: false,
		};

		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toEqual(expectedResult);
	});

	it('updateCaseById => should find a case by ID and update it', async () => {
		const updateResult = {
			id: faker.number.int(),
			...createCaseModel,
			modifiedBy: '',
			assetAssetId: faker.string.uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const spy = jest.spyOn(prisma.case, 'update').mockResolvedValue(updateResult);

		// act
		const result = await firstValueFrom(service.updateCaseById(updateResult.id, updateResult));

		console.log('result', result);

		const expectedResult = {
			...omit(updateResult, 'assetAssetId'),
			assetId: updateResult.assetAssetId,
			overdue: false,
		};
		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toEqual(expectedResult);
	});

	it('deleteCaseById => should find a case by ID and delete it', async () => {
		const deleteResult = {
			id: faker.number.int(),
			...createCaseModel,
			assetAssetId: faker.string.uuid(),
			modifiedBy: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const spy = jest.spyOn(prisma.case, 'delete').mockResolvedValue(deleteResult);

		// act
		const result = await firstValueFrom(service.deleteCaseById(deleteResult.id));

		const expectedResult = {
			...omit(deleteResult, 'assetAssetId'),
			assetId: deleteResult.assetAssetId,
			overdue: false,
		};
		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toEqual(expectedResult);
	});
});
