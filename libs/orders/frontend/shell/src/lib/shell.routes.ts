import { Route } from '@angular/router';

/**
 * The routes for the orders domain.
 * Note they are lazy loaded!
 *
 * @example
 *
 *  {
 *      path: '',
 *      loadComponent: () => import('@xd/orders/view').then(m => m.XdOrdersViewPage)
 *  },
 */
export const ORDERS_SHELL_ROUTES: Route[] = [
	{
		path: '',
		redirectTo: 'not-found',
		children: [
			{
				// Route to create an order
				path: 'create',
				redirectTo: 'not-found',
			},
			{
				// Route to order which are open - later this should be a query param!!!
				path: 'open',
				redirectTo: 'not-found',
			},
			{
				// Route to detail order
				path: ':id',
				redirectTo: 'not-found',
			},
		],
	},
];
