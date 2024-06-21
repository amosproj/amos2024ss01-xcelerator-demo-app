import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { OpenCasesComponent } from './open-cases.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OpenCasesComponent', () => {
	let component: OpenCasesComponent;
	let fixture: ComponentFixture<OpenCasesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ OpenCasesComponent, HttpClientTestingModule ],
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
