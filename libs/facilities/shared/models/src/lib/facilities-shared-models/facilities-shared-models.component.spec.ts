import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesSharedModelsComponent } from './facilities-shared-models.component';

describe('FacilitiesSharedModelsComponent', () => {
	let component: FacilitiesSharedModelsComponent;
	let fixture: ComponentFixture<FacilitiesSharedModelsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FacilitiesSharedModelsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FacilitiesSharedModelsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
