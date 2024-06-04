import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from 'common-frontend-models';

import { backendUrlInterceptor } from './backend-url.interceptor';

describe('backendUrlInterceptor', () => {
	let httpTestingController: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				provideHttpClient(withInterceptors([backendUrlInterceptor])),
				{
					provide: APP_CONFIG,
					useValue: {
						apiUrl: 'http://localhost:3000',
					},
				},
			],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	it('should return the original request if the request URL does not start with the API base segment', () => {
		const url = '/non-api/resource';

		httpClient.get(url).subscribe();
	});

	it('should return a new request with the backend URL if the request URL starts with the API base segment', () => {
		const url = '/api/resource';

		httpClient.get(url).subscribe();
	});
});
