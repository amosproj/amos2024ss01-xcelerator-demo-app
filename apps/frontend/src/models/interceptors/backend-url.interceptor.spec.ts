import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from 'common-frontend-models';
import { API_BASE_SEGMENT } from 'common-shared-models';
import { Observable, of } from 'rxjs';

import { BackendUrlInterceptor } from './backend-url.interceptor';

describe('BackendUrlInterceptor', () => {
	let interceptor: BackendUrlInterceptor;
	let mockHttpHandler: HttpHandler;
	let mockHttpHandlerSpy: jest.SpyInstance;

	beforeEach(() => {
		mockHttpHandler = {
			handle: (req: HttpRequest<object>): Observable<HttpEvent<object>> =>
				of(new HttpResponse(req)),
		} as HttpHandler;

		TestBed.configureTestingModule({
			providers: [
				BackendUrlInterceptor,
				{ provide: APP_CONFIG, useValue: { apiUrl: 'http://localhost:3000' } },
				{ provide: API_BASE_SEGMENT, useValue: '/api' },
			],
		});

		interceptor = TestBed.inject(BackendUrlInterceptor);
		mockHttpHandlerSpy = jest.spyOn(mockHttpHandler, 'handle');
	});

	it('should be created', () => {
		expect(interceptor).toBeTruthy();
	});

	it('should return the original request if the request URL does not start with the API base segment', () => {
		const req = new HttpRequest<object>('GET', '/test');

		interceptor.intercept(req, mockHttpHandler);

		expect(mockHttpHandlerSpy).toHaveBeenCalledTimes(1);
		expect(mockHttpHandlerSpy).toHaveBeenCalledWith(req);
	});

	it('should return a new request with the backend URL if the request URL starts with the API base segment', () => {
		const req = new HttpRequest<object>('GET', '/api/test');

		interceptor.intercept(req, mockHttpHandler);

		expect(mockHttpHandlerSpy).toHaveBeenCalledTimes(1);
		expect(mockHttpHandlerSpy).toHaveBeenCalledWith(
			req.clone({
				url: 'http://localhost:3000/api/test',
			}),
		);
	});
});
