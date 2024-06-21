import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DetailCaseComponent } from './detail-case.component';

describe('DetailCaseComponent', () => {
	let component: DetailCaseComponent;
	let fixture: ComponentFixture<DetailCaseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ DetailCaseComponent, HttpClientTestingModule ],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { handle: 'AA-000' } } },
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
