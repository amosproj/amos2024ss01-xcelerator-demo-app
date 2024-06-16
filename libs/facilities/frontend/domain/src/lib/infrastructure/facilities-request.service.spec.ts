import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import {
    IGetFacilitiesParams,
    ITimeSeriesItemResponse,
} from 'facilities-shared-models';
import { firstValueFrom, of } from 'rxjs';

import { FacilitiesRequestService } from './facilities-request.service';
import { TimeSeriesRequestService } from './timeseries-request.service';

describe('FacilitiesRequestService', () => {
    let service: FacilitiesRequestService;
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

        service = TestBed.inject(FacilitiesRequestService);
        httpClient = TestBed.inject(HttpClient);
    });

    describe('getAllFacilities', () => {
        it('should forward the request to the backend', async () => {
            const mockResponse: ITimeSeriesItemResponse[] = [];

            const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

            const result = await firstValueFrom(service.getAllFacilities());
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('/api/facilities');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getFacility', () => {
        it('should fetch time series data', async () => {
            const mockResponse: ITimeSeriesItemResponse[] = [];

            const params: IGetFacilitiesParams = {
                assetId: faker.string.uuid(),
            };

            const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

            const result = await firstValueFrom(service.getFacility(params));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(
                `/api/facilities/${params.assetId}`,
            );
            expect(result).toEqual(mockResponse);
        });
    });
});
