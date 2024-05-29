import { Route } from '@angular/router';

// This should not be done, usually just export the const from the lib
// eslint-disable-next-line @nx/enforce-module-boundaries
import { facilities } from '../../../view/src/lib/components/facility.mocks/const';

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
				data: {
					facilities: facilities,
					subtitle: 'List of all facilities',
				},
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdBrowsePage),
			},

			{
				// Route to facilities with issues
				path: 'issues',
				data: {
					breadcrumbs: {
						label: 'Issues',
						url: 'facilities/issues',
					},
				},
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdIssuesPage),
			},
			{
				// Route to detail page
				path: ':id',
				data: {
					breadcrumbs: {
						label: 'Details',
						url: 'facilities/:id',
					},
				},
				loadComponent: () => import('facilities-frontend-view').then((m) => m.XdDetailPage),
			},
		],
	},
];
