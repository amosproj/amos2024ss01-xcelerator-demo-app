import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { APP_CONFIG } from 'common-frontend-models';
import { provideEcharts } from 'ngx-echarts';

import { environment } from '../environments/environment';
import { backendUrlInterceptor } from '../models/interceptors/backend-url.interceptor';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding()),
		importProvidersFrom(IxModule.forRoot()),
		provideAnimations(),
		provideEcharts(),
		{ provide: APP_CONFIG, useValue: environment },
		provideHttpClient(withInterceptors([backendUrlInterceptor])),
	],
};
