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
		children: [
			{
				// Route to create an order
				path: 'create',
				loadComponent: () =>
					import('orders-frontend-view').then((m) => m.CreateOrderComponent),
			},
			{
				// Route to order which are open - later this should be a query param!!!
				path: 'open',
				loadComponent: () =>
					import('orders-frontend-view').then((m) => m.OpenOrdersComponent),
			},
			{
				// Route to detail order
				path: ':id',
				loadComponent: () =>
					import('orders-frontend-view').then((m) => m.DetailOrderComponent),
			},
		],
	},
];
