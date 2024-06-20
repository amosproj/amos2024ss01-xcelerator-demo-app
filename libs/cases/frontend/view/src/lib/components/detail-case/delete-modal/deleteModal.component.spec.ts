import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IxActiveModal } from '@siemens/ix-angular';

import DeleteModalComponent from './deleteModal.component';

describe('LockModalComponent', () => {
	let component: DeleteModalComponent;
	let fixture: ComponentFixture<DeleteModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ DeleteModalComponent ],
			providers: [ { provide: IxActiveModal, useValue: { data: { locked: true } } } ],
		}).compileComponents();

		fixture = TestBed.createComponent(DeleteModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
