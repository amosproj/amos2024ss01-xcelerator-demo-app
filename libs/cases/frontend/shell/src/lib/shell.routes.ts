import { Route } from '@angular/router';
import { AuthenticationGuard } from 'common-frontend-models';

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
				canActivate: [AuthenticationGuard],
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.CaseBrowseComponent),
			},
			{
				// Route to create a case
				path: 'create',
				canActivate: [AuthenticationGuard],
				data: {
					breadcrumb: 'Create',
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.CreateCaseComponent),
			},
			{
				// Route to detail case
				path: ':id',
				canActivate: [AuthenticationGuard],
				data: {
					breadcrumb: 'Details',
				},
				loadComponent: () =>
					import('cases-frontend-view').then((m) => m.DetailCaseComponent),
			},
		],
	},
];
