import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IxModule, themeSwitcher } from '@siemens/ix-angular';
import { AuthenticationService } from 'common-frontend-models';

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
	protected email = '';
	protected password = '';

	protected formValid = signal(false);
	protected loginSuccess = signal(false);
	protected wasValidated = false;
	protected showPassword = false;

	private readonly emailRegExp =
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	constructor(
		private _router: Router,
		private _authenticationService: AuthenticationService,
	) {
		// this site is always in dark mode
		themeSwitcher.setTheme('theme-classic-dark');
	}

	onSubmit() {
		this.wasValidated = true;

		const formValid = this.emailRegExp.test(this.email) && this.password !== '';
		this.formValid.set(formValid);
		if (!formValid) {
			return;
		}

		const loginSuccess = this._authenticationService.login(this.email, this.password);
		this.loginSuccess.set(loginSuccess);
		if (loginSuccess) {
			this._router.navigate(['/']);
		}
	}

	togglePassword() {
		const passwordElement = document.getElementById('passwordElement');
		if (!passwordElement) {
			return;
		}

		this.showPassword = !this.showPassword;
		const typeVal = this.showPassword ? 'text' : 'password';
		passwordElement.setAttribute('type', typeVal);
	}
}
