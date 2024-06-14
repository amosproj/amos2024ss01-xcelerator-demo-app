import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import {
	IGetTimeSeriesParams,
	IGetTimeseriesQuery,
	ITimeSeriesItemResponse,
} from 'facilities-shared-models';
import { firstValueFrom, of } from 'rxjs';

import { TimeseriesRequestService } from './timeseries-request.service';

describe('TimeseriesRequestService', () => {
	let service: TimeseriesRequestService;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [
				TimeseriesRequestService,
				{
					provide: HttpClient,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		});

		service = TestBed.inject(TimeseriesRequestService);
		httpClient = TestBed.inject(HttpClient);
	});

	describe('getAllTimeseries', () => {
		it('should forward the request to the backend', async () => {
			const mockResponse: ITimeSeriesItemResponse[] = [];

			const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

			const result = await firstValueFrom(service.getAllTimeseries());
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith('/api/timeseries');
			expect(result).toEqual(mockResponse);
		});
	});

	describe('getTimeSeries', () => {
		it('should fetch time series data', async () => {
			const mockResponse: ITimeSeriesItemResponse[] = [];

			const params: IGetTimeSeriesParams = {
				assetId: faker.string.uuid(),
				propertySetName: faker.string.sample(),
			};

			const query: IGetTimeseriesQuery = {
				from: faker.date.recent(),
				to: faker.date.recent(),
			};

			const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

			const result = await firstValueFrom(service.getTimeSeries(params, query));
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				`/api/timeseries/${params.assetId}/${params.propertySetName}`,
				{ params: expect.any(Object) },
			);
			expect(result).toEqual(mockResponse);
		});
	});
});
