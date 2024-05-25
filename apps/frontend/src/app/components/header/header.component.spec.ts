import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { HeaderComponent, IBreadcrumbData } from './header.component';

const HEADER_ROUTES = {
	root: {
		snapshot: {
			data: {
				breadcrumbs: { label: 'Layer 1', url: '/layer1' } as IBreadcrumbData,
			},
		},
		firstChild: {
			snapshot: {
				data: {
					breadcrumbs: { label: 'Layer 2', url: '/layer2' } as IBreadcrumbData,
				},
			},
		},
	},
};

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	const eventsSubject = new ReplaySubject<RouterEvent>(1);
	let routerMock: Router;

	beforeEach(async () => {
		routerMock = {
			events: eventsSubject.asObservable(),
		} as unknown as Router;

		await TestBed.configureTestingModule({
			imports: [ HeaderComponent ],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: HEADER_ROUTES,
				},
				{
					provide: Router,
					useValue: routerMock,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should trigger router events correctly', () => {
		eventsSubject.next(new NavigationEnd(1, '', ''));

		const routerEvents = component.routerEvents();
		expect(routerEvents).toEqual({
			id: 1,
			type: 1,
			url: '',
			urlAfterRedirects: '',
		} as NavigationEnd);
	});

	it('should compute breadcrumbs correctly', () => {
		eventsSubject.next(new NavigationEnd(1, '', ''));

		const breadcrumbs = component.breadcrumbs();
		expect(breadcrumbs.length).toBe(2);
		expect(breadcrumbs[0]).toEqual({ label: 'Layer 1', url: '/layer1' });
		expect(breadcrumbs[1]).toEqual({ label: 'Layer 2', url: '/layer2' });
	});
});
