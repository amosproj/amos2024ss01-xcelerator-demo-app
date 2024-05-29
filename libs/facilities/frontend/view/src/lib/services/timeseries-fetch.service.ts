import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TimeseriesFetchService {
	constructor(private http: HttpClient) {}

	private apiUrl =
		'http://localhost:3333/api/timeseries/Pump002/PumpData?select="flow","pressureIn"&limit=10';

	fetchTimeSeriesData() {
		return this.http.get<any>(this.apiUrl).pipe(
			catchError((error) => {
				return throwError(error);
			}),
		);
	}
}
