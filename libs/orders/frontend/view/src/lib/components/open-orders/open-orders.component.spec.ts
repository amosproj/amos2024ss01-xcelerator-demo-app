import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { OpenOrdersComponent } from './open-orders.component';

describe('OpenOrdersComponent', () => {
	let component: OpenOrdersComponent;
	let fixture: ComponentFixture<OpenOrdersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OpenOrdersComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(OpenOrdersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
