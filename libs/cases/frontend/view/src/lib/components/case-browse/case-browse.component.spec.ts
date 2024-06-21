import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { CaseBrowseComponent } from './case-browse.component';

describe('CaseBrowsComponent', () => {
	let component: CaseBrowseComponent;
	let fixture: ComponentFixture<CaseBrowseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ CaseBrowseComponent, HttpClientTestingModule ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {},
                }
            ],
		}).compileComponents();

		fixture = TestBed.createComponent(CaseBrowseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
