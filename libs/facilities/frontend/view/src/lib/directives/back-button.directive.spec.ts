import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { BackButtonDirective } from './back-button.directive';

describe('BackButtonDirective', () => {
    let directive: BackButtonDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ Location, BackButtonDirective ]
        });

        directive = TestBed.inject(BackButtonDirective);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
