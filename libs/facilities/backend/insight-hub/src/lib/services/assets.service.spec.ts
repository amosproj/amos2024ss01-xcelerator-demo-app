import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable, of } from 'rxjs';

import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdAssetsService } from './assets.service';
import { XdTokenManagerService } from './token-manager.service';

describe('XdAssetsService', () => {
	let service: XdAssetsService;
	let httpService: HttpService;
	let logger: Logger;

	beforeEach(async () => {
		const httpServiceMock = {
			get: jest.fn().mockImplementation(() => of({ data: {} })),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				XdAssetsService,
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

		service = module.get<XdAssetsService>(XdAssetsService);
		httpService = module.get<HttpService>(HttpService);
		logger = module.get<Logger>(Logger);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getAssetsData', () => {
		it('should get assets data', async () => {
			const mockResponse = { test: faker.lorem.word() };
			const getSpy = jest
				.spyOn(httpService, 'get')
				.mockReturnValue(of({ data: mockResponse }) as Observable<AxiosResponse>);

			const response = await firstValueFrom(service.getAssetsData());

			expect(response).toEqual(mockResponse);
			expect(getSpy).toBeCalledTimes(1);
		});
	});
});
