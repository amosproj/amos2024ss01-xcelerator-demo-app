import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { IInsightHub } from 'common-backend-models';
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';

import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { XdBaseBearerInteractionService } from './base-bearer-interaction.service';
import { XdTokenManagerService } from './token-manager.service';

@Injectable()
class MockService extends XdBaseBearerInteractionService {
	constructor(
		httpClient: HttpService,
		@Inject(INSIGHT_HUB_OPTIONS)
		insightHubOptions: IInsightHub,
		tokenManagerService: XdTokenManagerService,
		logger: Logger,
	) {
		super(httpClient, insightHubOptions, tokenManagerService, logger, 'test');
	}

	public getData<T>(suffixUrl?: string, params?: object): Observable<T> {
		return this._getData<T>(suffixUrl, params);
	}
}

describe('XdBaseBearerInteractionService', () => {
	let service: MockService;
	let httpService: HttpService;
	let logger: Logger;

	beforeEach(async () => {
		const httpServiceMock = {
			get: jest.fn().mockImplementation(() => of({ data: {} })),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MockService,
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

		service = module.get<MockService>(MockService);
		httpService = module.get<HttpService>(HttpService);
		logger = module.get<Logger>(Logger);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getData', () => {
		it('should get data', async () => {
			const mockResponse = { test: faker.lorem.word() };
			const getSpy = jest
				.spyOn(httpService, 'get')
				.mockReturnValue(of({ data: mockResponse }) as Observable<AxiosResponse>);

			const url = 'https://gateway.eu1.mindsphere.io/api/test';
			const response = await firstValueFrom(service.getData());

			expect(getSpy).toHaveBeenCalledTimes(1);
			expect(getSpy).toHaveBeenCalledWith(url, {
				headers: {
					Authorization: 'Bearer test_token',
				},
			});
			expect(response).toEqual(mockResponse);
		});

		it('should get data with suffix url and pass params', async () => {
			const mockResponse = { test: faker.lorem.word() };
			const getSpy = jest
				.spyOn(httpService, 'get')
				.mockReturnValue(of({ data: mockResponse }) as Observable<AxiosResponse>);
			const params = { param1: faker.lorem.text() };

			const response = await firstValueFrom(service.getData('test2', params));

			expect(getSpy).toHaveBeenCalledTimes(1);
			expect(getSpy).toHaveBeenCalledWith(
				'https://gateway.eu1.mindsphere.io/api/test/test2',
				{
					headers: {
						Authorization: 'Bearer test_token',
					},
					params,
				},
			);
			expect(response).toEqual(mockResponse);
		});

		it('should log error and throw it respectively', async () => {
			const error = new Error('Test error');
			const getSpy = jest
				.spyOn(httpService, 'get')
				.mockReturnValue(
					new Observable<AxiosResponse>((observer) => observer.error(error)),
				);

			const errorSpy = jest.spyOn(logger, 'error');
			await expect(lastValueFrom(service.getData())).rejects.toThrow(HttpException);

			expect(getSpy).toHaveBeenCalledTimes(1);
			expect(getSpy).toHaveBeenCalledWith('https://gateway.eu1.mindsphere.io/api/test', {
				headers: {
					Authorization: 'Bearer test_token',
				},
			});
			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(errorSpy).toHaveBeenCalledWith('MockService: Error while fetching data', error);
		});
	});
});
