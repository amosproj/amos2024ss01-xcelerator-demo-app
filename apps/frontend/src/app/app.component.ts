import { Component, inject } from '@angular/core';
// import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from 'common-frontend-models';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
	standalone: true,
	imports: [ RouterModule, NgxEchartsDirective ],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'frontend';
	readonly apiUrl = inject(APP_CONFIG).apiUrl;
}
