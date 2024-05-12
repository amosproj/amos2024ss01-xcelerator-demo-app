import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';

describe('CreateOrderComponent', () => {
	let component: CreateOrderComponent;
	let fixture: ComponentFixture<CreateOrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateOrderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
