import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding()),
		importProvidersFrom(IxModule.forRoot()),
	],
};
