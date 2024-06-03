import { inject, Injectable } from '@angular/core';

import { TimeseriesRequestService } from '../../infrastructure/timeseries-request.service';

/**
 * Browse facades service.
 */
@Injectable({ providedIn: 'root' })
export class XdBrowseFacadesService {
	private readonly _scanService = inject(TimeseriesRequestService);

	/**
	 * Get all timeseries.
	 */
	public getAllTimeseries() {
		return this._scanService.getAllTimeseries();
	}

	/**
	 * Get timeseries.
	 * @param entityId The entity id.
	 * @param propertySetName The property set name.
	 * @param queryParams The query parameters.
	 */
	public getTimeSeries(entityId: string, propertySetName: string, queryParams: any) {
		return this._scanService.getTimeSeries({ entityId, propertySetName }, queryParams);
	}
}
