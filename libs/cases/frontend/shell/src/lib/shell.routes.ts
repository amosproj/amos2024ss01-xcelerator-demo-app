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
					breadcrumb: 'Create',
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
					breadcrumb: 'Details',
					title: 'Detail of Case',
					subtitle: '',
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.DetailCaseComponent),
			},
		],
	},
];
