import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from 'common-frontend-models';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';

@Component({
	standalone: true,
	imports: [ RouterModule, NgxEchartsDirective, HttpClientModule],
	providers: [ provideEcharts() ],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'frontend';
	readonly apiUrl = inject(APP_CONFIG).apiUrl;
}
