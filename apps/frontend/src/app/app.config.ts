import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(appRoutes), importProvidersFrom(IxModule.forRoot())],
};
