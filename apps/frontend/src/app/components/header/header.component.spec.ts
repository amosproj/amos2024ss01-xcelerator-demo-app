import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { HeaderComponent } from './header.component';

const HEADER_ROUTES = {
	root: {
		snapshot: {
			data: {
				breadcrumb: 'Layer 1',
			},
		},
		firstChild: {
			snapshot: {
				data: {
					breadcrumb: 'Layer 2',
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
            url: '/Layer1/Layer2',
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
		expect(breadcrumbs).toEqual([ 'Layer 1', 'Layer 2' ]);
	});
});
