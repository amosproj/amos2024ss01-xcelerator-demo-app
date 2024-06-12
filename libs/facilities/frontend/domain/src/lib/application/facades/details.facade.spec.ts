import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FacilitiesRequestService } from '../../infrastructure/facilities-request.service';
import { XdDetailsFacade } from './details.facade';

describe('XdDetailsFacadeService', () => {
    let service: XdDetailsFacade;
    let facilitiesRequestService: FacilitiesRequestService;

    beforeEach(() => {
        const facilitiesRequestServiceMock = {
            getAllFacilities: jest.fn().mockReturnValue(of([])),
            getFacility: jest.fn().mockReturnValue(of({})),
        };

        TestBed.configureTestingModule({
            providers: [
                XdDetailsFacade,
                { provide: FacilitiesRequestService, useValue: facilitiesRequestServiceMock },
            ],
        });

        service = TestBed.inject(XdDetailsFacade);
        facilitiesRequestService = TestBed.inject(FacilitiesRequestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    describe('getTimeSeries', () => {
        it('should call getTimeSeries of TimeseriesRequestService with correct parameters', () => {
            const assetId = 'testAssetId';

            service.getFacility(assetId);
            expect(facilitiesRequestService.getFacility).toHaveBeenCalledWith(
                { assetId },
            );
        });
    });
});
