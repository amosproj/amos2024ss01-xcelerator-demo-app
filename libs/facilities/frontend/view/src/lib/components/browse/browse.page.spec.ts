import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { XdDetailPage } from '../detail/detail.page';
import { facilities } from '../facility.mocks/const';
import { XdBrowsePage } from './browse.page';

describe('BrowseComponent', () => {
	let component: XdBrowsePage;
	let fixture: ComponentFixture<XdBrowsePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				XdBrowsePage,
				RouterModule.forRoot([{ path: 'facilities/1', component: XdDetailPage }]),
			],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { id: '1' } } },
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(XdBrowsePage);
		component = fixture.componentInstance;
		component.facilities = facilities;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should change the route', () => {
		const cardDe = fixture.debugElement.nativeElement.querySelector('ix-push-card');
		cardDe.click();

		fixture.detectChanges();
		const router: Router = TestBed.inject(Router);
		expect(router.url).toEqual('/facilities/1');
	});
});
