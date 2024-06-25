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
				// Route to list page
				path: '',
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.CaseBrowseComponent),
			},
			{
				// Route to create a case
				path: 'create',
				data: {
					breadcrumbs: {
						label: 'Create',
						url: 'cases/create',
					},
					title: 'Create a Case',
					subtitle: '',
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.CreateCaseComponent),
			},
			{
				// Route to detail case
				path: ':id',
				data: {
					breadcrumbs: {
						label: 'Details',
						url: 'cases/:id',
					},
					title: 'Detail of case',
					subtitle: '',
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.DetailCaseComponent),
			},
		],
	},
];
