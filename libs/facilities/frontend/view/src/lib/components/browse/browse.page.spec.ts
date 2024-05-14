import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { XdBrowsePage } from './browse.page';

describe('BrowseComponent', () => {
	let component: XdBrowsePage;
	let fixture: ComponentFixture<XdBrowsePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [XdBrowsePage],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(XdBrowsePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
