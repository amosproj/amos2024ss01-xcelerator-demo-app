import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from 'common-frontend-models';

import { backendUrlInterceptor } from './backend-url.interceptor';

describe('backendUrlInterceptor', () => {
	let httpTestingController: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: APP_CONFIG,
					useValue: {
						apiUrl: 'http://localhost:3000',
					},
				},
				provideHttpClient(withInterceptors([backendUrlInterceptor])),
				provideHttpClientTesting(),
			],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	it('should return the original request if the request URL does not start with the API base segment', () => {
		const url = '/non-api/resource';

		httpClient.get(url).subscribe();

		const req = httpTestingController.expectOne(url);
		expect(req.request.url).toEqual(url);
	});

	it('should return a new request with the backend URL if the request URL starts with the API base segment', () => {
		const url = '/api/resource';

		httpClient.get(url).subscribe();

		const req = httpTestingController.expectOne('http://localhost:3000/api/resource');
		expect(req.request.url).toEqual('http://localhost:3000/api/resource');
	});
});
