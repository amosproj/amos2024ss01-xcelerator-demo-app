import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_CONFIG } from 'common-frontend-models';

import { APP_ROUTES } from './app.routes';
import { environment } from '../environments/environment';
import { BackendUrlInterceptor } from '../models/interceptors/backend-url.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding()),
		importProvidersFrom(IxModule.forRoot()),
        { provide: APP_CONFIG, useValue: environment },
        { provide: HTTP_INTERCEPTORS, useClass: BackendUrlInterceptor, multi: true },
    ],
};
