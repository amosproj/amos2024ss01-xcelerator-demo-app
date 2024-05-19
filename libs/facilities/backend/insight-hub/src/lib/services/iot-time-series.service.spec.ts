import { faker } from '@faker-js/faker';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';

import { ITimeSeriesRequestParameter } from '../models';
import { INSIGHT_HUB_OPTIONS } from '../tokens';
import { IotTimeSeriesService } from './iot-time-series.service';

interface MockSelectParameter {
	flow: number;
	pressure: number;
}

describe('IotTime', () => {
	let service: IotTimeSeriesService;
	let httpService: HttpService;

	beforeEach(async () => {
		const httpServiceMock = {
			get: jest.fn().mockImplementation(() => of({ data: {} })),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				IotTimeSeriesService,
				{
					provide: HttpService,
					useValue: httpServiceMock,
				},
				{
					provide: INSIGHT_HUB_OPTIONS,
					useValue: {
						apiUrl: 'https://gateway.{region}-{environment}.{mindsphere-domain}/api/iottimeseries/v3/timeseries',
						apiKey: 'test',
					},
				},
			],
		}).compile();

		service = module.get<IotTimeSeriesService>(IotTimeSeriesService);
		httpService = module.get<HttpService>(HttpService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getTimeSeriesData', () => {
		it('should get time series data', async () => {
			const mockResponse = { test: 'test' };
			const getSpy = jest
				.spyOn(httpService, 'get')
				.mockReturnValue(of({ data: mockResponse }) as Observable<AxiosResponse>);
			const params: ITimeSeriesRequestParameter<MockSelectParameter> = {
				from: faker.date.past(),
				to: faker.date.recent(),
				limit: faker.number.int(),
				select: ['flow', 'pressure'],
			};

			const response = service.getTimeSeriesData<MockSelectParameter, any>(params);

			expect(getSpy).toHaveBeenCalledTimes(1);
			expect(getSpy).toHaveBeenCalledWith(
				'https://gateway.{region}-{environment}.{mindsphere-domain}/api/iottimeseries/v3/timeseries',
				{
					params: {
						apiKey: 'test',
						...params,
					},
				},
			);
			await expect(firstValueFrom(response)).resolves.toEqual(mockResponse);
		});

		it('should log errors', async () => {
			const error = new Error('Internal Server Error');
			const consoleSpy = jest.spyOn(console, 'log');
			jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => error));

			const response = service.getTimeSeriesData<MockSelectParameter, any>({});
			await expect(firstValueFrom(response)).rejects.toThrow(error);

			expect(consoleSpy).toHaveBeenCalledWith(error);
		});
	});
});
