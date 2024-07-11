import { Route } from '@angular/router';

/**
 * The routes for the account domain.
 * Note they are lazy loaded!
 */
export const ACCOUNT_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'login',
				loadComponent: () => import('account-frontend-view').then((m) => m.LoginPage),
			},
			{
				path: '**',
				redirectTo: 'login',
			},
		],
	},
];
