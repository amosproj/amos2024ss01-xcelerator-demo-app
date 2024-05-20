import { ComponentFixture, TestBed } from '@angular/core/testing';

import LockModalComponent from './lockModal.component';


describe('LockModalComponent', () => {
	let component: LockModalComponent;
	let fixture: ComponentFixture<LockModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LockModalComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LockModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
