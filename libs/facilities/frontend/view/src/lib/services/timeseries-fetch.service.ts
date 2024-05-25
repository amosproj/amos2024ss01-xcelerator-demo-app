import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { APP_CONFIG } from 'common-frontend-models';

@Injectable({
    providedIn: 'root',
})
export class TimeseriesFetchService {

    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:3333/api/timeseries/Pump002/PumpData?select="flow","pressureIn"&limit=10';

    fetchTimeSeriesData(){

        return this.http.get<any>(this.apiUrl).pipe(catchError(error => {
            console.error('Error fetching time series data:', error);
            return throwError(error);
        }));
    }

}
