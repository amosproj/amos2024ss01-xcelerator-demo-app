import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { map } from 'rxjs';

import { TimeseriesRequestService } from '../../infrastructure/timeseries-request.service';

/**
 * Browse facades service.
 */
@Injectable({ providedIn: 'root' })
export class XdBrowseFacade {
	private readonly _scanService = inject(TimeseriesRequestService);

	/**
	 * Get all timeseries.
	 *
	 * @TODO: This method should NOT map the response data and add fake data. In a later ticket, we will provide a meaningful implementation.
	 */
	public getAllTimeseries() {
		return this._scanService.getAllTimeseries().pipe(
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
						heading: timeSeriesItem.assetId,
						subheading: timeSeriesItem.propertySetName,
						variant: 'success',
						pumps: faker.number.int({ min: 0, max: 99 }),
						location: faker.location.city(),
					};
				});
			}),
		);
	}

	/**
	 * Get timeseries.
	 * @param assetId The asset id.
	 * @param propertySetName The property set name.
	 * @param queryParams The query parameters.
	 */
	public getTimeSeries(assetId: string, propertySetName: string, queryParams: any) {
		return this._scanService.getTimeSeries({ assetId, propertySetName }, queryParams);
	}
}
