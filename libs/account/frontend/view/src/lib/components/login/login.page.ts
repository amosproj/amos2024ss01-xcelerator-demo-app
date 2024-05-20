import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'lib-login',
	standalone: true,
	imports: [CommonModule, FormsModule, IxModule],
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
	username = '';
	password = '';

	constructor(private router: Router) {}

	onSubmit() {
		// Mock authentication process
		if (this.username === 'admin' && this.password === 'admin123') {
			// Redirect to dashboard on successful login
			this.router.navigate(['/dashboard']);
		} else {
			// Display an error message for failed login
			alert('Invalid username or password');
		}
	}

	onForgotPassword() {
		// Handle forgot password action
		alert('Forgot password functionality is not implemented yet.');
	}
}
