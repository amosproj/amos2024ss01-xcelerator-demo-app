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
				path: 'orders',
				data: {
					breadcrumbs: {
						label: 'Orders',
						url: 'orders',
					},
				},
				loadChildren: () =>
					import('orders-frontend-shell').then((m) => m.ORDERS_SHELL_ROUTES),
			},
		],
	},
	{
		path: 'not-found',
		loadComponent: () =>
			import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
];
