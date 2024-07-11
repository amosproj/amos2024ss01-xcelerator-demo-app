import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IxModule, themeSwitcher } from '@siemens/ix-angular';
import { AuthenticationService, LocalStorageService } from 'common-frontend-models';
import { filter } from 'rxjs';

import { LegalInformationComponent } from './legal-information/legal-information.component';

/**
 * Header component
 */
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink, RouterOutlet, LegalInformationComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	protected lightMode = computed(() => {
		const theme = this._localStorageService.getOrCreate('theme', 'theme-classic-dark')();
		themeSwitcher.setTheme(theme);
		return theme === 'theme-classic-light';
	});
	protected userMail = this.authenticationService.getUserMail();

	readonly routerEvents = toSignal(
		this._router.events.pipe(filter((e) => e instanceof NavigationEnd)),
		{ initialValue: null },
	);

	readonly breadcrumbs = computed(() => {
		this.routerEvents();

		const breadcrumbs = [];
		let currentRoute = this._activatedRoute.root;
		while (currentRoute.firstChild) {
			const breadcrumb = currentRoute.snapshot.data['breadcrumb'];
			if (breadcrumb && breadcrumbs[breadcrumbs.length - 1] !== breadcrumb)
				breadcrumbs.push(breadcrumb);

			currentRoute = currentRoute.firstChild;
		}

		const breadcrumb = currentRoute.snapshot.data['breadcrumb'];
		if (breadcrumb && breadcrumbs[breadcrumbs.length - 1] !== breadcrumb)
			breadcrumbs.push(breadcrumb);

		return breadcrumbs;
	});

	readonly isHomePage = computed(() => {
		this.routerEvents();
		return this._activatedRoute.snapshot.firstChild?.routeConfig?.path === '';
	});

	constructor(
		protected authenticationService: AuthenticationService,
		private _localStorageService: LocalStorageService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
	) {}

	/**
	 * from the right cut the current url until a '/' is reached n times
	 * So for /cases/10/abc, goBack(1) yields /cases/10
	 *
	 * @param n
	 */
	cutUrl(n: number) {
		const currentUrl = this._router.url;
		const urlSegments = currentUrl.split('/');
		return urlSegments.slice(0, urlSegments.length - n).join('/');
	}

	toggleMode() {
		this._localStorageService.set(
			'theme',
			this.lightMode() ? 'theme-classic-dark' : 'theme-classic-light',
		);
	}

	refresh() {
		window.location.reload();
	}

	logout() {
		this.authenticationService.logout();
		this._router.navigate(['/account/login']);
	}
}
