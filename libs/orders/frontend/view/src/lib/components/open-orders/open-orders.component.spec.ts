import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenOrdersComponent } from './open-orders.component';

describe('OpenOrdersComponent', () => {
	let component: OpenOrdersComponent;
	let fixture: ComponentFixture<OpenOrdersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OpenOrdersComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(OpenOrdersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
