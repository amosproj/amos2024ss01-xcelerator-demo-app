import { Route } from '@angular/router';

/**
 * The routes for the facilities domain.
 * Note they are lazy loaded!
 *
 * @example
 *
 *  {
 *      path: '',
 *      loadComponent: () => import('@xd/facilities/view').then(m => m.XdFacilitiesViewPage)
 *  },
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
				path: 'register',
				loadComponent: () => import('account-frontend-view').then((m) => m.RegisterPage),
			},
		],
	},
];
