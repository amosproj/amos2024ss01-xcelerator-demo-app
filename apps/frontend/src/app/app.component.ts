import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from 'common-frontend-models';

@Component({
	standalone: true,
	imports: [RouterModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'frontend';
	readonly apiUrl = inject(APP_CONFIG).apiUrl;
}
