import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from 'common-frontend-models';
import { API_BASE_SEGMENT } from 'common-shared-models';
import { Observable } from 'rxjs';

@Injectable()
export class BackendUrlInterceptor implements HttpInterceptor {
	private readonly apiUrl = inject(APP_CONFIG).apiUrl;

	intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
		if (!req.url.startsWith(API_BASE_SEGMENT)) {
			return next.handle(req);
		}

		const backendReq = req.clone({
			url: `${this.apiUrl}${req.url}`,
		});
		return next.handle(backendReq);
	}
}
