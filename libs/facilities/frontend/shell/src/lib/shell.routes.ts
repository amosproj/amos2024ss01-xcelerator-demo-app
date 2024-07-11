import { Route } from '@angular/router';
import { AuthenticationGuard } from 'common-frontend-models';

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
				canActivate: [AuthenticationGuard],
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdBrowsePage),
			},
			{
				// Route to detail page
				path: ':id',
				canActivate: [AuthenticationGuard],
				data: {
					breadcrumb: 'Details',
				},
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdDetailPage),
			},
		],
	},
];
