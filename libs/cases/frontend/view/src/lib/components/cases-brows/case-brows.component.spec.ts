import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseBrowsComponent } from './case-brows.component';

describe('CaseBrowsComponent', () => {
	let component: CaseBrowsComponent;
	let fixture: ComponentFixture<CaseBrowsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CaseBrowsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CaseBrowsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
