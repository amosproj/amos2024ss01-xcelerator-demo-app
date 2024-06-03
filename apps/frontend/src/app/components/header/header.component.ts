import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { find } from 'lodash';
import { filter } from 'rxjs';

/**
 * Breadcrumb data interface
 */
export interface IBreadcrumbData {
	label: string;
	url: string;
}

/**
 * Header component
 */
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink, RouterOutlet],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private readonly _router: Router = inject(Router);

	readonly routerEvents = toSignal(
		this._router.events.pipe(filter((e) => e instanceof NavigationEnd)),
		{ initialValue: null },
	);

	readonly breadcrumbs = computed(() => {
		this.routerEvents();
		return HeaderComponent.buildBreadcrumbRecursively(this._activatedRoute.root);
	});

	readonly headerData = computed(() => {
		const breadcrumbs = this.breadcrumbs();
		let tempHeader = '';

		const headerMap = new Map<string, string>([
			['Issues', 'Open Issues'],
			['Facilities', 'Facilities Dashboard'],
			['Home', 'Homepage'],
			['Cases', 'Cases'],
			['Open', 'Open Cases'],
		]);

		const titleMap = new Map<string, string>([
			['Issues', 'List of all Facilities with Issues'],
			['Facilities', 'List of all Facilities'],
			['Home', ''],
			['Cases', ''],
			['Open', 'List of all Open Cases'],
		]);

		if (breadcrumbs.length > 0) {
			tempHeader = breadcrumbs[breadcrumbs.length - 1].label;
		} else {
			return { title: '', subtitle: '' };
		}

		// Check for special case where label is "Details"
		if (tempHeader === 'Details') {
			const previousBreadcrumb =
				breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].label : '';

			if (previousBreadcrumb === 'Facilities') {
				return {
					title: 'Facility Details Page',
					subtitle: 'Detailed information about a specific facility',
				};
			} else if (previousBreadcrumb === 'Cases') {
				return {
					title: 'Case Details Page',
					subtitle: 'Detailed information about a specific case',
				};
			}
		}

		if (headerMap.has(tempHeader)) {
			return { title: headerMap.get(tempHeader), subtitle: titleMap.get(tempHeader) || '' };
		} else {
			return { title: tempHeader, subtitle: '' };
		}
	});

	/**
	 * Build breadcrumbs recursively
	 * @param route
	 * @param breadcrumbs
	 */
	static buildBreadcrumbRecursively(
		route: ActivatedRoute,
		breadcrumbs: IBreadcrumbData[] = [],
	): IBreadcrumbData[] {
		const breadcrumbData = route.snapshot.data['breadcrumbs'] as IBreadcrumbData;

		if (breadcrumbData && !find(breadcrumbs, breadcrumbData)) {
			breadcrumbs.push(breadcrumbData);
		}

		if (route.firstChild == null) {
			return breadcrumbs;
		}

		return this.buildBreadcrumbRecursively(route.firstChild, breadcrumbs);
	}

	goBack() {
		this._router.navigate([this._router.url.split('/').slice(0, -1).join('/')]);
	}
}
