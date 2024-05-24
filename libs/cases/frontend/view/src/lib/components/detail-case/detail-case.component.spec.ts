import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DetailCaseComponent } from './detail-case.component';

describe('DetailCaseComponent', () => {
	let component: DetailCaseComponent;
	let fixture: ComponentFixture<DetailCaseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DetailCaseComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { id: '1' } } },
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailCaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
