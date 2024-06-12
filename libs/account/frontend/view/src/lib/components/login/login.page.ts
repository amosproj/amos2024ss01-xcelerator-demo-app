import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'lib-login',
	standalone: true,
	imports: [ CommonModule, FormsModule, IxModule ],
	templateUrl: './login.page.html',
	styleUrls: [ './login.page.scss' ],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
	username = '';
	password = '';

	constructor(private router: Router) {}

	onSubmit() {
		// Mock authentication process
		if (this.username === 'siemens' && this.password === 'siemens') {
			// Redirect to dashboard on successful login
			this.router.navigate([ '/facilities' ]);
		} else {
			// Display an error message for failed login
			alert('Invalid username or password');
		}
	}

	onForgotPassword() {
		// TODO: Handle forgot password action
		alert('Forgot password functionality is not implemented yet.');
	}

	onGitHubLogin() {
		// Redirect to GitHub OAuth login page
		window.location.href =
			'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI';
	}
}
