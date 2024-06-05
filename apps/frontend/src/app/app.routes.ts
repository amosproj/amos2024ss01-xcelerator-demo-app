import { Route } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';

export const APP_ROUTES: Route[] = [
	{
		path: '',
		component: HeaderComponent,
		data: {
			breadcrumbs: {
				label: 'Home',
				url: '/',
			},
		},
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./pages/home/home.component').then((m) => m.HomeComponent),
			},
			{
				path: 'facilities',
				data: {
					breadcrumbs: {
						label: 'Facilities',
						url: 'facilities',
					},
				},
				loadChildren: () =>
					import('facilities-frontend-shell').then((m) => m.FACILITIES_SHELL_ROUTES),
			},
			{
				path: 'cases',
				data: {
					breadcrumbs: {
						label: 'Cases',
						url: 'cases',
					},
				},
				loadChildren: () =>
					import('cases-frontend-shell').then((m) => m.CASES_SHELL_ROUTES),
			},
		],
	},
	{
		path: 'not-found',
		loadComponent: () =>
			import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
	},
	{
		path: 'account',
		loadChildren: () => import('account-frontend-shell').then((m) => m.ACCOUNT_SHELL_ROUTES),
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
];
