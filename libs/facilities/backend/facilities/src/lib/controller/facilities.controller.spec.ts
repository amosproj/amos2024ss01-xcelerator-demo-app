import { Test, TestingModule } from '@nestjs/testing';

import { XdFacilitiesService } from '../service/faclities.service';
import { XdFacilitiesController } from './facilities.controller';
import { of } from 'rxjs';
import { IFacilitiesResponse } from '@frontend/facilities/shared/models';
import { faker } from '@faker-js/faker';

describe('FacilitiesController ', () => {
	let controller: XdFacilitiesController;
	let service: XdFacilitiesService;

	beforeAll(async () => {
		const serviceMock = {
			getAllFacilitiesFromDB: jest.fn().mockReturnValue([]),
			seedTheDB: jest.fn().mockReturnValue([]),
			getFacilityById: jest.fn().mockReturnValue([]),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [XdFacilitiesController],
			providers: [
				{
					provide: XdFacilitiesService,
					useValue: serviceMock,
				},
			],
		}).compile();

		controller = module.get<XdFacilitiesController>(XdFacilitiesController);
		service = module.get<XdFacilitiesService>(XdFacilitiesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return all facilities', () => {
		const facilitiesResponse: IFacilitiesResponse = {
			assetId: faker.string.uuid(),
			createdAt: faker.date.recent(),
			description: faker.string.sample(),
			name: faker.string.sample(),
			typeId: faker.string.uuid(),
			updatedAt: faker.date.recent(),
			variables: faker.string.sample(),
			location: {
				country: faker.address.country(),
				latitude: faker.address.latitude(),
				locality: faker.address.city(),
				longitude: faker.address.longitude(),
				postalCode: faker.address.zipCode(),
				region: faker.address.state(),
				streetAddress: faker.address.streetAddress(),
			},
		};
		const Spy = jest.spyOn(service, 'getAllFacilitiesFromDB').mockReturnValue(
			of([
				{
					assetId: 'test',
					facilityName: 'test',
					facilityType: 'test',
					location: 'test',
					description: 'test',
					status: 'test',
					createdOn: new Date(),
					modifiedOn: new Date(),
				},
			]),
		);

		expect(controller.getAllFacilities()).toEqual([]);
	});
});
