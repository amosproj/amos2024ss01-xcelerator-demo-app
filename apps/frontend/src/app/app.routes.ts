import { Route } from '@angular/router';
import { AuthenticationGuard } from 'common-frontend-models';

import { HeaderComponent } from './components/header/header.component';

export const APP_ROUTES: Route[] = [
	{
		path: '',
		component: HeaderComponent,
		data: {
			breadcrumb: 'Home',
			title: 'Home Page',
			subtitle: '',
		},
		children: [
			{
				path: '',
				canActivate: [AuthenticationGuard],
				loadComponent: () =>
					import('./pages/home/home.component').then((m) => m.HomeComponent),
			},
			{
				path: 'home',
				canActivate: [AuthenticationGuard],
				redirectTo: '',
			},
			{
				path: 'facilities',
				canActivate: [AuthenticationGuard],
				data: {
					breadcrumb: 'Facilities',
					title: 'Facilities Dashboard',
					subtitle: 'List of all Facilities',
				},
				loadChildren: () =>
					import('facilities-frontend-shell').then((m) => m.FACILITIES_SHELL_ROUTES),
			},
			{
				path: 'cases',
				canActivate: [AuthenticationGuard],
				data: {
					breadcrumb: 'Cases',
					title: 'Cases',
					subtitle: '',
				},
				loadChildren: () =>
					import('cases-frontend-shell').then((m) => m.CASES_SHELL_ROUTES),
			},
		],
	},
	{
		path: 'not-found',
		canActivate: [AuthenticationGuard],
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
