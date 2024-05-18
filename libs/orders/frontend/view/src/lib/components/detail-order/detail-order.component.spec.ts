import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DetailOrderComponent } from './detail-order.component';

describe('DetailOrderComponent', () => {
	let component: DetailOrderComponent;
	let fixture: ComponentFixture<DetailOrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ DetailOrderComponent ],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { id: '1' } } },
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
