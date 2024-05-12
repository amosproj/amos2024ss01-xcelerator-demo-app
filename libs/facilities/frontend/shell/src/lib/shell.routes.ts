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
export const FACILITIES_SHELL_ROUTES: Route[] = [
	{
		path: '',
		children: [
			{
				// Route to list page
				path: '',
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdBrowsePage),
			},
			{
				// Route to facilities with issues
				path: 'issues',
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdIssuesPage),
			},
			{
				// Route to detail page
				path: ':id',
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdDetailPage),
			},
		],
	},
];
