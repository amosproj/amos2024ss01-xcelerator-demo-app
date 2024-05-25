import { TestBed } from '@angular/core/testing';

import { TimeseriesFetchService } from './timeseries-fetch.service';

describe('TimeseriesFetchService', () => {
    let service: TimeseriesFetchService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TimeseriesFetchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
