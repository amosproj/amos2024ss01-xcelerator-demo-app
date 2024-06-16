import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
    IGetTimeSeriesItemsParams,
    IGetTimeSeriesParams,
    IGetTimeseriesQuery, ITimeSeriesDataItemResponse,
    ITimeSeriesItemResponse,
} from 'facilities-shared-models';
import { isNull, omitBy } from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TimeSeriesRequestService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _baseRoute = '/api/timeseries';

	public getAllTimeSeries(): Observable<ITimeSeriesItemResponse[]> {
		return this._httpClient.get<ITimeSeriesItemResponse[]>(this._baseRoute);
	}

        public getTimeSeriesItems(
        params: IGetTimeSeriesItemsParams,
    ): Observable<ITimeSeriesItemResponse[]> {
        return this._httpClient.get<ITimeSeriesItemResponse[]>(`${this._baseRoute}/${params.assetId}`);
    }

	public getTimeSeriesDataItems(
		params: IGetTimeSeriesParams,
		queryParams: IGetTimeseriesQuery,
	): Observable<ITimeSeriesDataItemResponse[]> {
		const httpParams = new HttpParams({
			fromObject: omitBy(queryParams, isNull),
		});

		return this._httpClient.get<ITimeSeriesDataItemResponse[]>(
			`${this._baseRoute}/${params.assetId}/${params.propertySetName}`,
			{
				params: httpParams,
			},
		);
	}
}
