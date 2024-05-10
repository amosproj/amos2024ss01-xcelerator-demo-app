import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { IBreadcrumbData } from '../components/header/header.component';
import { AppRootLayout } from './root.layout';

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

describe('AppRootLayout', () => {
	let component: AppRootLayout;
	let fixture: ComponentFixture<AppRootLayout>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppRootLayout],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: HEADER_ROUTES,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AppRootLayout);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
