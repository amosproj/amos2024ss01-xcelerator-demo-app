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
				// Route to create a case
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
				// Route to cases which are open - later this should be a query param!!!
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
				// Route to detail case
				path: ':handle',
				data: {
					breadcrumbs: {
						label: 'Details',
						url: 'cases/:handle',
					},
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.DetailCaseComponent),
			},
		],
	},
];
