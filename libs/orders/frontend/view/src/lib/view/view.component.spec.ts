import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from '@frontend/view';

describe('ViewComponent', () => {
	let component: ViewComponent;
	let fixture: ComponentFixture<ViewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ViewComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
