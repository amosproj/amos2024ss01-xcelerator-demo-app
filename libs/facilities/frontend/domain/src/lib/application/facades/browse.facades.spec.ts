import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TimeseriesRequestService } from '../../infrastructure/timeseries-request.service';
import { XdBrowseFacadesService } from './browse.facades';

describe('XdBrowseFacadesService', () => {
	let service: XdBrowseFacadesService;
	let timeseriesRequestService: TimeseriesRequestService;

	beforeEach(() => {
		const timeseriesRequestServiceMock = {
			getAllTimeseries: jest.fn().mockReturnValue(of([])),
			getTimeSeries: jest.fn().mockReturnValue(of({})),
		};

		TestBed.configureTestingModule({
			providers: [
				XdBrowseFacadesService,
				{ provide: TimeseriesRequestService, useValue: timeseriesRequestServiceMock },
			],
		});

		service = TestBed.inject(XdBrowseFacadesService);
		timeseriesRequestService = TestBed.inject(TimeseriesRequestService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getAllTimeseries', () => {
		it('should call getAllTimeseries of TimeseriesRequestService', () => {
			service.getAllTimeseries();
			expect(timeseriesRequestService.getAllTimeseries).toHaveBeenCalled();
		});
	});

	describe('getTimeSeries', () => {
		it('should call getTimeSeries of TimeseriesRequestService with correct parameters', () => {
			const entityId = 'testEntityId';
			const propertySetName = 'testPropertySetName';
			const queryParams = { test: 'test' };

			service.getTimeSeries(entityId, propertySetName, queryParams);
			expect(timeseriesRequestService.getTimeSeries).toHaveBeenCalledWith(
				{ entityId, propertySetName },
				queryParams,
			);
		});
	});
});
