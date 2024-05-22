import { faker } from '@faker-js/faker';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
	let service: PrismaService;

	beforeEach(() => {
		service = new PrismaService();
		jest.spyOn(service, '$connect').mockImplementation();
	});

	it('should call $connect on module init', async () => {
		await service.onModuleInit();
		expect(service.$connect).toHaveBeenCalled();
	});

	it('should return true if value is TTimeSeriesData', () => {
		expect(service.isTTimeSeriesData(faker.string.sample())).toBe(true);
		expect(service.isTTimeSeriesData(faker.number.int())).toBe(true);
		expect(service.isTTimeSeriesData(faker.datatype.boolean())).toBe(true);
		expect(service.isTTimeSeriesData(null)).toBe(true);
		expect(service.isTTimeSeriesData(faker.date.anytime())).toBe(true);
	});

	it('should return false if value is not TTimeSeriesData', () => {
		expect(service.isTTimeSeriesData({})).toBe(false);
		expect(service.isTTimeSeriesData([])).toBe(false);
		expect(service.isTTimeSeriesData(undefined)).toBe(false);
	});

	it('should return selected keys from JSON', () => {
		const flow = faker.string.sample();
		const presure = faker.string.sample();
		const json = JSON.stringify({ flow: flow, presure: presure });

		expect(service.selectKeysFromJSON(json, ['flow'])).toEqual({
			flow: flow,
		});
	});

	it('should not return data if the keys have non TTimseriesData as value', () => {
		const json = JSON.stringify({ flow: [], presure: {} });

		expect(service.selectKeysFromJSON(json)).toEqual({});
	});

	it('should return all data if no keys are specified', () => {
		const flow = faker.string.sample();
		const presure = faker.string.sample();
		const json = JSON.stringify({ flow: flow, presure: presure });

		expect(service.selectKeysFromJSON(json)).toEqual({
			flow: flow,
			presure: presure,
		});
	});
});
