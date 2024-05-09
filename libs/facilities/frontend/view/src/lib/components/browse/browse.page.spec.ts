import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePage } from './browse.page';

describe('BrowseComponent', () => {
	let component: BrowsePage;
	let fixture: ComponentFixture<BrowsePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BrowsePage],
		}).compileComponents();

		fixture = TestBed.createComponent(BrowsePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
