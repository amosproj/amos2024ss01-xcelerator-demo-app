import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { map } from 'rxjs';

import { FacilitiesRequestService } from '../../infrastructure/facilities-request.service';

/**
 * Browse facades service.
 */
@Injectable({ providedIn: 'root' })
export class XdBrowseFacade {
	private readonly _scanService = inject(FacilitiesRequestService);

	/**
	 * Get all the facilities.
	 *
	 * @TODO: This method should NOT map the response data and add fake data. In a later ticket, we will provide a meaningful implementation.
	 */
	public getAllFacilities() {
		return this._scanService.getAllFacilities().pipe(
			map((timeSeriesItem) => {
				return timeSeriesItem.map((timeSeriesItem) => {
					return {
						id: timeSeriesItem.assetId,
						icon: faker.helpers.arrayElement([
							'battery-empty',
							'water-fish',
							'water-plant',
							'truck',
						]),
						notification: `${faker.number.int({ min: 0, max: 99 })}`,
						heading: timeSeriesItem.name,
						subheading: timeSeriesItem.description,
						status: timeSeriesItem.status,
						pumps: faker.number.int({ min: 0, max: 99 }),
						location: timeSeriesItem.location,
					};
				});
			}),
		);
	}

}
