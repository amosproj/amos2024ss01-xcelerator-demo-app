import { faker } from '@faker-js/faker';
import { IFacilitiesResponse } from '@frontend/facilities/shared/models';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';

import { XdFacilitiesService } from '../service/facilities.service';
import { XdFacilitiesController } from './facilities.controller';

describe('FacilitiesController ', () => {
	let controller: XdFacilitiesController;
	let service: XdFacilitiesService;

	const facilitiesResponse: IFacilitiesResponse = {
		assetId: faker.string.uuid(),
		createdAt: faker.date.recent(),
		description: faker.string.sample(),
		name: faker.string.sample(),
		typeId: faker.string.uuid(),
		updatedAt: faker.date.recent(),
		variables: faker.string.sample(),
		location: {
			country: faker.location.country(),
			latitude: faker.location.latitude(),
			locality: faker.location.city(),
			longitude: faker.location.longitude(),
			postalCode: faker.location.zipCode(),
			region: faker.location.state(),
			streetAddress: faker.location.streetAddress(),
		},
	};

	beforeAll(async () => {
		const serviceMock = {
			getAllFacilitiesFromDB: jest.fn().mockImplementation(() => of([])),
			seedTheDB: jest.fn().mockReturnValue([]),
			getFacilityById: jest.fn().mockReturnValue([]),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [ XdFacilitiesController ],
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

	it('should return all facilities', async () => {
		const Spy = jest
			.spyOn(service, 'getAllFacilitiesFromDB')
			.mockReturnValue(of([ facilitiesResponse ]));

		const result = await firstValueFrom(controller.getAllFacilities());

		console.log(result);

		expect(Spy).toHaveBeenCalled();
		expect(result).toEqual([ facilitiesResponse ]);
	});

	it('should seed the database', async () => {
		const Spy = jest.spyOn(service, 'seedTheDB').mockReturnValue(of([ facilitiesResponse ]));

		const result = await firstValueFrom(controller.seedTheDB());

		expect(Spy).toHaveBeenCalled();
		expect(result).toEqual([ facilitiesResponse ]);
	});

	it('should get a facility by id', async () => {
		const assetId = faker.string.uuid();
		const Spy = jest.spyOn(service, 'getFacilityById').mockReturnValue(of(facilitiesResponse));

		const result = await firstValueFrom(controller.getFacilityById({ assetId }));

		expect(Spy).toHaveBeenCalledWith(assetId);
		expect(result).toEqual(facilitiesResponse);
	});
});
