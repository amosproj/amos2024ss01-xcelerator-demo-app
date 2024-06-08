import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TimeseriesRequestService } from '../../infrastructure/timeseries-request.service';
import { XdBrowseFacade } from './browse.facade';

describe('XdBrowseFacadeService', () => {
	let service: XdBrowseFacade;
	let timeseriesRequestService: TimeseriesRequestService;

	beforeEach(() => {
		const timeseriesRequestServiceMock = {
			getAllTimeseries: jest.fn().mockReturnValue(of([])),
			getTimeSeries: jest.fn().mockReturnValue(of({})),
		};

		TestBed.configureTestingModule({
			providers: [
				XdBrowseFacade,
				{ provide: TimeseriesRequestService, useValue: timeseriesRequestServiceMock },
			],
		});

		service = TestBed.inject(XdBrowseFacade);
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
			const assetId = 'testAssetId';
			const propertySetName = 'testPropertySetName';
			const queryParams = { test: 'test' };

			service.getTimeSeries(assetId, propertySetName, queryParams);
			expect(timeseriesRequestService.getTimeSeries).toHaveBeenCalledWith(
				{ assetId, propertySetName },
				queryParams,
			);
		});
	});
});
