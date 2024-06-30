import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { CreateCaseComponent } from './create-case.component';
describe('CreateCaseComponent', () => {
	let component: CreateCaseComponent;
	let fixture: ComponentFixture<CreateCaseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ CreateCaseComponent, HttpClientTestingModule ],
            providers: [
                { provide: ActivatedRoute, useValue: {}, },
            ]
		}).compileComponents();

		fixture = TestBed.createComponent(CreateCaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
