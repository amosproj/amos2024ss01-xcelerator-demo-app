import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICaseParams, ICaseResponse } from '@frontend/cases/shared/models';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class XdCasesRequestService {
	private readonly _httpClient = inject(HttpClient);

	/**
	 * Get all cases via backend
	 */
	public getAllCases(): Observable<ICaseResponse[]> {
		return this._httpClient.get<ICaseResponse[]>('/api/case');
	}

	/**
	 * Get time series data via backend
	 *
	 * @param params
	 */
	public getTimeSeries(params: ICaseParams): Observable<ICaseResponse[]> {
		return this._httpClient.get<ICaseResponse[]>(`/api/case/${params.id}`);
	}
}