import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { ICaseParams, ICaseResponse } from 'cases-shared-models';
import { firstValueFrom, of } from 'rxjs';

import { XdCasesRequestService } from './cases-request.service';

describe('XdCasesRequestService', () => {
	let service: XdCasesRequestService;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				XdCasesRequestService,
				{
					provide: HttpClient,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		});

		service = TestBed.inject(XdCasesRequestService);
		httpClient = TestBed.inject(HttpClient);
	});

	describe('getAllCases', () => {
		it('should forward the request to the backend', async () => {
			const mockResponse: ICaseResponse[] = [];

			const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

			const result = await firstValueFrom(service.getAllCases());
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith('/api/case');
			expect(result).toEqual(mockResponse);
		});
	});

	describe('getTimeSeries', () => {
		it('should forward the request to the backend', async () => {
			const params = { id: faker.number.int() } as ICaseParams;
			const mockResponse: ICaseParams[] = [{ id: faker.number.int() }] as ICaseParams[];

			const spy = jest.spyOn(httpClient, 'get').mockReturnValue(of(mockResponse));

			const result = await firstValueFrom(service.getTimeSeries(params));
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(`/api/case/${params.id}`);
			expect(result).toEqual(mockResponse);
		});
	});
});
