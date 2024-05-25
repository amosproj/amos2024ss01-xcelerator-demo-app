import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { APP_CONFIG } from 'common-frontend-models';

import { environment } from '../environments/environment';
import { BackendUrlInterceptor } from '../models/interceptors/backend-url.interceptor';
import { APP_ROUTES } from './app.routes';
import { provideEcharts } from 'ngx-echarts';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding()),
		importProvidersFrom(IxModule.forRoot()),
        provideEcharts(),
		{ provide: APP_CONFIG, useValue: environment },
		{ provide: HTTP_INTERCEPTORS, useClass: BackendUrlInterceptor, multi: true },
	],
};
