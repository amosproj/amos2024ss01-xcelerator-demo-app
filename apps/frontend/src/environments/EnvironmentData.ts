import { InjectionToken } from '@angular/core';

import { environment } from './environment';

export interface EnvironmentData {
	production: boolean;
	apiUrl: string;
}

export const ENVIRONMENT = new InjectionToken<EnvironmentData>('ENVIRONMENT', {
	providedIn: 'root',
	factory: () => environment as EnvironmentData,
});
