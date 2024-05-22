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
export const CASES_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				// Route to create an order
				path: 'create',
				data: {
					breadcrumbs: {
						label: 'Create',
						url: 'create',
					},
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.CreateCaseComponent),
			},
			{
				// Route to order which are open - later this should be a query param!!!
				path: 'open',
				data: {
					breadcrumbs: {
						label: 'Open',
						url: 'orders/open',
					},
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.OpenCasesComponent),
			},
			{
				// Route to detail order
				path: ':id',
				data: {
					breadcrumbs: {
						label: 'Details',
						url: 'orders/:id',
					},
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.DetailCaseComponent),
			},
		],
	},
];
