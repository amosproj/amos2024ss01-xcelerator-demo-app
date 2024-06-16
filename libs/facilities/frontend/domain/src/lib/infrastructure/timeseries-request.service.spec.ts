import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import {
    IGetTimeSeriesItemsParams,
    IGetTimeSeriesParams,
    IGetTimeseriesQuery,
    ITimeSeriesItemResponse,
} from 'facilities-shared-models';
import { firstValueFrom, of } from 'rxjs';

import { TimeSeriesRequestService } from './timeseries-request.service';

describe('TimeseriesRequestService', () => {
	let service: TimeSeriesRequestService;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				TimeSeriesRequestService,
				{
					provide: HttpClient,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		});

		service = TestBed.inject(TimeSeriesRequestService);
		httpClient = TestBed.inject(HttpClient);
	});

	describe('getAllTimeSeries', () => {
		it('should forward the request to the backend', async () => {
			const mockResponse: ITimeSeriesItemResponse[] = [];

			const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

			const result = await firstValueFrom(service.getAllTimeSeries());
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith('/api/timeseries');
			expect(result).toEqual(mockResponse);
		});
	});

    describe('getTimeSeriesItems', () => {
        it('should fetch time series data', async () => {
            const mockResponse: ITimeSeriesItemResponse[] = [];

            const params: IGetTimeSeriesItemsParams = {
                assetId: faker.string.uuid(),
            };

            const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

            const result = await firstValueFrom(service.getTimeSeriesItems(params));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(
                `/api/timeseries/${params.assetId}`,
            );
            expect(result).toEqual(mockResponse);
        });
    });

	describe('getTimeSeriesDataItems', () => {
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

			const result = await firstValueFrom(service.getTimeSeriesDataItems(params, query));
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				`/api/timeseries/${params.assetId}/${params.propertySetName}`,
				{ params: expect.any(Object) },
			);
			expect(result).toEqual(mockResponse);
		});
	});
});
