import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { map } from 'rxjs';

import { FacilitiesRequestService } from '../../infrastructure/facilities-request.service';
import { TimeSeriesRequestService } from '../../infrastructure/timeseries-request.service';

/**
 * Facade for the details page of a facility
 */
@Injectable({ providedIn: 'root' })
export class XdDetailsFacade {
	private readonly _facilitiesService = inject(FacilitiesRequestService);
	private readonly _timeseriesService = inject(TimeSeriesRequestService);

	/**
	 * Get facility
	 * @param assetId The asset id.
	 * @TODO: This method should NOT map the response data and add fake data. In a later ticket, we will provide a meaningful implementation.
	 */
	public getFacility(assetId: string) {
		return this._facilitiesService.getFacility({ assetId: assetId }).pipe(
			map((timeSeriesItem) => {
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
                    indicatorMsg: timeSeriesItem.indicatorMsg,
					pumps: faker.number.int({ min: 0, max: 99 }),
					location: timeSeriesItem.location,
				};
			}),
		);
	}

	/**
	 * Get a list of all the available timeSeries properties
	 * @param assetId The asset id.
	 */
	public getTimeSeriesItems(assetId: string) {
		return this._timeseriesService.getTimeSeriesItems({ assetId });
	}

	/**
	 * Get the specific data of a time series property of a facility
	 * @param assetId The asset id.
	 * @param propertySetName The property set name for which we will get the data.
	 * @param queryParams The query parameters.
	 */
	public getTimeSeriesDataItems(assetId: string, propertySetName: string, queryParams: any) {
		return this._timeseriesService.getTimeSeriesDataItems(
			{ assetId, propertySetName },
			queryParams,
		);
	}
}
