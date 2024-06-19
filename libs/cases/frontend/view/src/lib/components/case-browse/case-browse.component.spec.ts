import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseBrowseComponent } from './case-browse.component';

describe('CaseBrowsComponent', () => {
	let component: CaseBrowseComponent;
	let fixture: ComponentFixture<CaseBrowseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ CaseBrowseComponent ],
		}).compileComponents();

		fixture = TestBed.createComponent(CaseBrowseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
