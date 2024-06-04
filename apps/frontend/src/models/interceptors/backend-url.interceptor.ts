import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_CONFIG } from 'common-frontend-models';
import { API_BASE_SEGMENT } from 'common-shared-models';
import { Observable } from 'rxjs';

/**
 * Interceptor that prepends the backend URL to the request URL.
 *
 * @param req
 * @param next
 */
export function backendUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const apiUrl = inject(APP_CONFIG).apiUrl;

    if (!req.url.startsWith(API_BASE_SEGMENT)) {
        return next(req);
    }

    const backendReq = req.clone({
        url: `${apiUrl}${req.url}`,
    });
    return next(backendReq);
}
