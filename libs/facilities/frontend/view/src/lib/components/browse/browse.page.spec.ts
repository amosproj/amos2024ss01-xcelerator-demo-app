import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { XdBrowseFacade } from '@frontend/facilities/frontend/domain';
import { of } from 'rxjs';

import { XdDetailPage } from '../detail/detail.page';
import { XdBrowsePage } from './browse.page';

describe('BrowseComponent', () => {
	let component: XdBrowsePage;
	let fixture: ComponentFixture<XdBrowsePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				XdBrowsePage,
				HttpClientTestingModule,
				RouterModule.forRoot([{ path: 'facilities/1', component: XdDetailPage }]),
			],
			providers: [
				{
					provide: XdBrowseFacade,
					useValue: {
						getAllFacilities: jest
							.fn()
							.mockReturnValue(of([{ id: '1', propertySetName: 'test' }])),
						getAllFacilities: jest.fn().mockReturnValue(of([])),
					},
				},
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { id: '1' } } },
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
