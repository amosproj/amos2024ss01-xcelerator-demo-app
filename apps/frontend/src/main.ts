import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
	.then((appRef) => {
		const router = appRef.injector.get(Router);
		router.navigate(['/facilities/issues']);
	})
	.catch((err) =>
		// eslint-disable-next-line no-console
		console.error(err),
	);
