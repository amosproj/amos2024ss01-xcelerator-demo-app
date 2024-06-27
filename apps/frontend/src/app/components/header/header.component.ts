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

import { LegalInformationComponent } from './legal-information/legal-information.component';

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
	imports: [ CommonModule, IxModule, RouterLink, RouterOutlet, LegalInformationComponent ],
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

	readonly title = computed(() => {
		this.routerEvents();
		let currentRoute = this._activatedRoute.root;
		while (currentRoute.firstChild) {
			currentRoute = currentRoute.firstChild;
		}
		return currentRoute.snapshot.data['title'];
	});

	readonly subtitle = computed(() => {
		this.routerEvents();
		let curentRoute = this._activatedRoute.root;
		while (curentRoute.firstChild) {
			curentRoute = curentRoute.firstChild;
		}
		return curentRoute.snapshot.data['subtitle'];
	});

	readonly backButtonPresent = computed(() => {
		const breadcrumbs = this.breadcrumbs();
		let tempHeader = '';
		if (breadcrumbs.length > 0) {
			tempHeader = breadcrumbs[breadcrumbs.length - 1].label;
		}

		if (tempHeader === 'Home') {
			return false;
		}

		return true;
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
		this._router.navigate([ this._router.url.split('/').slice(0, -1).join('/') ]);
	}

    refresh() {
        window.location.reload();
    }
}
