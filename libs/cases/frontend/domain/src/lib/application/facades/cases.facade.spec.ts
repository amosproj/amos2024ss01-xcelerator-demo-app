import { TestBed } from '@angular/core/testing';
import { ICaseParams } from '@frontend/cases/shared/models';
import { firstValueFrom, of } from 'rxjs';

import { XdCasesRequestService } from '../../infrastructure/cases-request.service';
import { XdBrowseFacadesService } from './browse.facades';

describe('XdBrowseFacadesService', () => {
	let service: XdBrowseFacadesService;
	let casesRequestService: XdCasesRequestService;

	beforeEach(() => {
		const timeseriesRequestServiceMock = {
			getTimeSeries: jest.fn().mockReturnValue(of({})),
			getAllCases: jest.fn().mockReturnValue(of([])),
		};

		TestBed.configureTestingModule({
			providers: [
				XdBrowseFacadesService,
				{ provide: XdCasesRequestService, useValue: timeseriesRequestServiceMock },
			],
		});

		service = TestBed.inject(XdBrowseFacadesService);
		casesRequestService = TestBed.inject(XdCasesRequestService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getAllTimeseries', () => {
		it('should call getAllTimeseries of TimeseriesRequestService', async () => {
			const response = await firstValueFrom(service.getAllCases());

			expect(casesRequestService.getAllCases).toHaveBeenCalledTimes(1);
			expect(response).toEqual([]);
		});
	});

	describe('getTimeSeries', () => {
		it('should call getTimeSeries of TimeseriesRequestService with correct parameters', async () => {
			const params: ICaseParams = { id: 1 } as ICaseParams;

			const response = await firstValueFrom(service.getTimeSeries(params));

			expect(casesRequestService.getTimeSeries).toHaveBeenCalledWith(params);
			expect(response).toEqual({});
		});
	});
});
