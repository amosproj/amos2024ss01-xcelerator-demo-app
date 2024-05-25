/**
 *  I (Ingo) did not get this class to work yet
 *  It should be used to get the facility from the URL in the future
 *  and then can be added in app.config.ts just below the other interceptor
 * */

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FacilityInterceptor implements HttpInterceptor {
	public facilityId: string | undefined;

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const url = request.url;
		const match = url.match(/facilities\/(\d+)/);

		if (match) {
			this.facilityId = match[1];
		}
		return next.handle(request);
	}
}
