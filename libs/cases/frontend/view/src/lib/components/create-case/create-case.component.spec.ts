import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseComponent } from './create-case.component';
describe('CreateCaseComponent', () => {
	let component: CreateCaseComponent;
	let fixture: ComponentFixture<CreateCaseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ CreateCaseComponent, HttpClientTestingModule ],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateCaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
