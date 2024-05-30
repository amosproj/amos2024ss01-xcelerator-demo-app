import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
	IGetTimeSeriesParams,
	IGetTimeseriesQuery,
	ITimeSeriesItemResponse,
} from '@frontend/facilities/shared/models';
import { isNull, omitBy } from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TimeseriesRequestService {
	private readonly _httpClient = inject(HttpClient);

	public getAllTimeseries(): Observable<ITimeSeriesItemResponse[]> {
		return this._httpClient.get<ITimeSeriesItemResponse[]>('/api/timeseries');
	}

	public getTimeSeries(
		params: IGetTimeSeriesParams,
		queryParams: IGetTimeseriesQuery,
	): Observable<ITimeSeriesItemResponse[]> {
		const httpParams = new HttpParams({
			fromObject: omitBy(queryParams, isNull),
		});

		return this._httpClient.get<ITimeSeriesItemResponse[]>(
			`/api/timeseries/${params.entityId}/${params.propertySetName}`,
			{
				params: httpParams,
			},
		);
	}
}
