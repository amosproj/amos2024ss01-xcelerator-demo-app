import { Route } from '@angular/router';

/**
 * The routes for the cases domain.
 * Note they are lazy loaded!
 *
 * @example
 *
 *  {
 *      path: '',
 *      loadComponent: () => import('@xd/cases/view').then(m => m.XdCasesViewPage)
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
						url: 'cases/create',
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
						url: 'cases/open',
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
						url: 'cases/:id',
					},
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.DetailCaseComponent),
			},
		],
	},
];
