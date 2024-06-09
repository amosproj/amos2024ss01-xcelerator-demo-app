import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { OpenCasesComponent } from './open-cases.component';

describe('OpenCasesComponent', () => {
	let component: OpenCasesComponent;
	let fixture: ComponentFixture<OpenCasesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OpenCasesComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(OpenCasesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
