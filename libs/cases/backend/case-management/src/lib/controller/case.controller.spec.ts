import { faker } from '@faker-js/faker';
import { ICaseResponse, ICreateCaseBody } from '@frontend/cases/shared/models';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';

import { XdCaseService } from '../services/case.service';
import { XdCaseController } from './case.controller';

describe('CaseController', () => {
	let controller: XdCaseController;
	let service: XdCaseService;

	const returnValue = {
		id: faker.number.int(),
		handle: faker.string.alpha(10),
		dueDate: faker.date.past(),
		title: faker.lorem.sentence(),
		type: faker.helpers.enumValue(ECaseType),
		status: faker.helpers.enumValue(ECaseStatus),
		description: faker.lorem.sentence(),
		source: faker.string.alpha(),
		priority: faker.helpers.enumValue(ECasePriority),
		createdBy: faker.internet.email(),
		eTag: faker.string.alpha(),
	} as ICaseResponse;

	beforeEach(async () => {
		const ServiceMock = {
			getAllCases: jest.fn(),
			getCaseById: jest.fn(),
			createCase: jest.fn(),
			updateCaseById: jest.fn(),
			deleteCaseById: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [ XdCaseController ],
			providers: [
				{
					provide: XdCaseService,
					useValue: ServiceMock,
				},
			],
		}).compile();

		controller = module.get<XdCaseController>(XdCaseController);
		service = module.get<XdCaseService>(XdCaseService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should call getAllCases', async () => {
		const getAllReturnValue = [ returnValue ] as ICaseResponse[];
		const spy = jest.spyOn(service, 'getAllCases').mockReturnValue(of(getAllReturnValue));

		const result = await firstValueFrom(controller.getAllCases());
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toBe(getAllReturnValue);
	});

	it('should call getCaseById', async () => {
		const params = {
			id: faker.number.int(),
		};

		// arrange
		const getByIdReturnValue = returnValue;

		const spy = jest.spyOn(service, 'getCaseById').mockReturnValue(of(getByIdReturnValue));

		const result = await firstValueFrom(controller.getCaseById(params));

		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toBe(getByIdReturnValue);
	});

	it('should call createCase', async () => {
		const body = {
			title: faker.lorem.sentence(),
			type: faker.helpers.enumValue(ECaseType),
			status: faker.helpers.enumValue(ECaseStatus),
			description: faker.lorem.sentence(),
			source: faker.string.alpha(),
			priority: faker.helpers.enumValue(ECasePriority),
			createdBy: faker.internet.email(),
			dueDate: faker.date.future(),
			eTag: faker.string.alpha(),
			handle: faker.string.alpha(10),
		} as ICreateCaseBody;

		// arrange
		const createReturnValue = returnValue;

		const spy = jest.spyOn(service, 'createCase').mockReturnValue(of(createReturnValue));

		const result = await firstValueFrom(controller.createCase(body));

		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toBe(createReturnValue);
	});

	it('should call updateCase', async () => {
		const params = {
			id: faker.number.int(),
		};

		const body = {
			handle: faker.string.alpha(10),
			dueDate: faker.date.future(),
			title: faker.lorem.sentence(),
			type: faker.helpers.enumValue(ECaseType),
			status: faker.helpers.enumValue(ECaseStatus),
			description: faker.lorem.sentence(),
			source: faker.string.alpha(),
			priority: faker.helpers.enumValue(ECasePriority),
			createdBy: faker.internet.email(),
			eTag: faker.string.alpha(),
			modifiedBy: faker.internet.email(),
		};

		// arrange
		const updateReturnValue = returnValue;

		const spy = jest.spyOn(service, 'updateCaseById').mockReturnValue(of(updateReturnValue));

		const result = await firstValueFrom(controller.updateCaseById(params, body));

		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toBe(updateReturnValue);
	});

	it('should call deleteCase', async () => {
		const params = {
			id: faker.number.int(),
		};

		// arrange
		const deleteReturnValue = returnValue;

		const spy = jest.spyOn(service, 'deleteCaseById').mockReturnValue(of(deleteReturnValue));

		const result = await firstValueFrom(controller.deleteCaseById(params));

		// assert
		expect(spy).toHaveBeenCalledTimes(1);
		expect(result).toBe(deleteReturnValue);
	});
});
