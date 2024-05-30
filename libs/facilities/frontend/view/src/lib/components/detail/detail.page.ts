import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { themeSwitcher } from '@siemens/ix';
import { IxModule, ModalService } from '@siemens/ix-angular';
import { convertThemeName, registerTheme } from '@siemens/ix-echarts';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { BehaviorSubject } from 'rxjs';

import { BackButtonDirective } from '../../directives/back-button.directive';
import { facilities } from '../facility.mocks/const';
import { IFacilityMock } from '../facility.mocks/facility.interface';
import LockModalComponent from './lock-modal/lockModal.component';

@Component({
	selector: 'lib-detail',
	standalone: true,
	imports: [
		CommonModule,
		IxModule,
		NgxEchartsModule,
		LockModalComponent,
		RouterLink,
		BackButtonDirective,
	],
	templateUrl: './detail.page.html',
	styleUrl: './detail.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdDetailPage implements OnInit {
	facility: IFacilityMock = this.getFacility();

	theme = convertThemeName(themeSwitcher.getCurrentTheme());

	pumpData = [
		['2024-04-22T22:00:01.334Z', 0],
		['2024-04-22T22:00:11.316Z', 0],
		['2024-04-22T22:00:21.346Z', 0.01],
		['2024-04-22T22:00:31.351Z', 0.05],
		['2024-04-22T22:00:41.317Z', 0.13],
		['2024-04-22T22:00:51.362Z', 0.22],
		['2024-04-22T22:01:01.322Z', 0.4],
		['2024-04-22T22:01:11.324Z', 0.6],
		['2024-04-22T22:01:21.319Z', 0.8],
		['2024-04-22T22:01:31.358Z', 1],
		['2024-04-22T22:01:41.336Z', 1.2],
		['2024-04-22T22:01:51.327Z', 1.4000000000000001],
		['2024-04-22T22:02:01.351Z', 1.6],
		['2024-04-22T22:02:11.370Z', 1.8],
		['2024-04-22T22:02:21.334Z', 2.41892],
		['2024-04-22T22:02:31.336Z', 2.47939],
		['2024-04-22T22:02:41.322Z', 2.43057],
		['2024-04-22T22:02:51.329Z', 2.46347],
		['2024-04-22T22:03:01.355Z', 2.41149],
		['2024-04-22T22:03:11.329Z', 2.47207],
		['2024-04-22T22:03:21.323Z', 2.46379],
		['2024-04-22T22:03:31.391Z', 2.46315],
		['2024-04-22T22:03:41.327Z', 2.47475],
		['2024-04-22T22:03:51.354Z', 2.42092],
		['2024-04-22T22:04:01.334Z', 2.40428],
		['2024-04-22T22:04:11.349Z', 2.4148300000000003],
		['2024-04-22T22:04:21.334Z', 2.49095],
		['2024-04-22T22:04:31.327Z', 2.46889],
		['2024-04-22T22:04:41.334Z', 2.42701],
		['2024-04-22T22:04:51.328Z', 2.40368],
		['2024-04-22T22:05:01.374Z', 2.44037],
		['2024-04-22T22:05:11.344Z', 2.44591],
		['2024-04-22T22:05:21.338Z', 2.45186],
		['2024-04-22T22:05:31.332Z', 2.49327],
		['2024-04-22T22:05:41.330Z', 2.46024],
	];

	pumpOptions: EChartsOption = {
		title: {
			text: 'Pump Data',
			left: 'center',
		},
		xAxis: {
			type: 'time',
			name: 'Time',
			nameLocation: 'middle',
			nameGap: 30,
		},
		yAxis: {
			type: 'value',
			name: 'Flow',
			nameLocation: 'middle',
			nameGap: 25,
		},
		series: [
			{
				data: this.pumpData,
				type: 'line',
			},
		],
	};

	environmentData = [
		['2024-04-22T22:06:03.695Z', 69],
		['2024-04-22T22:26:03.696Z', 76],
		['2024-04-22T22:46:03.701Z', 76],
		['2024-04-22T23:06:03.781Z', 76],
		['2024-04-22T23:26:03.757Z', 80],
		['2024-04-22T23:46:03.755Z', 80],
		['2024-04-23T00:06:03.734Z', 80],
		['2024-04-23T00:26:03.759Z', 81],
		['2024-04-23T00:46:03.732Z', 81],
		['2024-04-23T01:06:03.806Z', 81],
		['2024-04-23T01:26:03.702Z', 79],
		['2024-04-23T01:46:03.713Z', 79],
		['2024-04-23T02:06:03.756Z', 79],
		['2024-04-23T02:26:03.766Z', 78],
	];

	environmentOptions: EChartsOption = {
		title: {
			text: 'Environment Data',
			left: 'center',
		},
		xAxis: {
			type: 'time',
			name: 'Time',
			nameLocation: 'middle',
			nameGap: 30,
		},
		yAxis: {
			type: 'value',
			name: 'Humidity',
			nameLocation: 'middle',
			nameGap: 25,
		},
		series: [
			{
				data: this.environmentData,
				type: 'line',
				itemStyle: { color: '#008000' },
				lineStyle: { color: '#008000' },
			},
		],
	};

	protected locked$ = new BehaviorSubject<boolean>(true);

	constructor(
		private route: ActivatedRoute,
		private readonly modalService: ModalService,
		protected _location: Location,
	) {}

	ngOnInit() {
		registerTheme(echarts);

		themeSwitcher.themeChanged.on((theme: string) => {
			this.theme = convertThemeName(theme);
		});
	}

	getFacility(): IFacilityMock {
		const facility = facilities.find(
			(facility) => facility.id === this.route.snapshot.params['id'],
		);
		if (facility === undefined) {
			throw new Error('Facility not found');
		} else {
			return facility;
		}
	}

	async changeLocked() {
		const instance = await this.modalService.open({
			content: LockModalComponent,
			data: { locked: this.locked$.getValue() },
		});

		// modal closes on confirm and dismisses on cancel
		instance.onClose.on(() => {
			this.locked$.next(!this.locked$.getValue());
		});
	}
}
