import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AuthenticationGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthenticationService);
	const router = inject(Router);

	if (!authService.isLoggedIn()) {
		router.navigate(['/account/login']); // Redirect to login page
		return false;
	}

	return true;
};
