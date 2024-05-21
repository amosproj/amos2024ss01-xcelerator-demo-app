import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { themeSwitcher } from '@siemens/ix';
import { IxModule, ModalService } from '@siemens/ix-angular';
import { convertThemeName, registerTheme } from '@siemens/ix-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { BehaviorSubject } from 'rxjs';

import { facilities } from '../facility.mocks/const';
import { IFacilityMock } from '../facility.mocks/facility.interface';
import LockModalComponent from './lock-modal/lockModal.component';

@Component({
	selector: 'lib-detail',
	standalone: true,
	imports: [CommonModule, IxModule, NgxEchartsModule, LockModalComponent, RouterLink],
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
		['2024-04-22T22:05:51.357Z', 2.43912],
		['2024-04-22T22:06:01.438Z', 2.45927],
		['2024-04-22T22:06:11.347Z', 2.46393],
		['2024-04-22T22:06:21.328Z', 2.42277],
		['2024-04-22T22:06:31.352Z', 2.4516],
		['2024-04-22T22:06:41.339Z', 2.4171],
		['2024-04-22T22:06:51.336Z', 2.4504200000000003],
		['2024-04-22T22:07:01.347Z', 2.42876],
		['2024-04-22T22:07:11.332Z', 2.43398],
		['2024-04-22T22:07:21.336Z', 2.44047],
		['2024-04-22T22:07:31.341Z', 2.4885300000000004],
		['2024-04-22T22:07:41.338Z', 2.4641300000000004],
		['2024-04-22T22:07:51.345Z', 2.4231800000000003],
		['2024-04-22T22:08:01.348Z', 2.45654],
		['2024-04-22T22:08:11.352Z', 2.42968],
		['2024-04-22T22:08:21.367Z', 2.41587],
		['2024-04-22T22:08:31.354Z', 2.47291],
		['2024-04-22T22:08:41.350Z', 2.49594],
		['2024-04-22T22:08:51.347Z', 2.43321],
		['2024-04-22T22:09:01.353Z', 2.49452],
		['2024-04-22T22:09:11.359Z', 2.4099600000000003],
		['2024-04-22T22:09:21.361Z', 2.48293],
		['2024-04-22T22:09:31.349Z', 2.49549],
		['2024-04-22T22:09:41.350Z', 2.4599100000000003],
		['2024-04-22T22:09:51.359Z', 2.40101],
		['2024-04-22T22:10:01.395Z', 2.4460200000000003],
		['2024-04-22T22:10:11.407Z', 2.42534],
		['2024-04-22T22:10:21.390Z', 2.49716],
		['2024-04-22T22:10:31.402Z', 2.46405],
		['2024-04-22T22:10:41.396Z', 2.42101],
		['2024-04-22T22:10:51.398Z', 2.42516],
		['2024-04-22T22:11:01.430Z', 2.43966],
		['2024-04-22T22:11:11.405Z', 2.4089500000000004],
		['2024-04-22T22:11:21.402Z', 2.46822],
		['2024-04-22T22:11:31.409Z', 2.487],
		['2024-04-22T22:11:41.418Z', 2.48612],
		['2024-04-22T22:11:51.407Z', 2.44152],
		['2024-04-22T22:12:01.495Z', 2.47593],
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
	) {}

	ngOnInit() {
		registerTheme(echarts);

		themeSwitcher.themeChanged.on((theme: string) => {
			this.theme = convertThemeName(theme);
		});

		/*fetch('./assets/PUMP-002_PumpData_20240422-220000000_20240423-220000000.json')
            .then(response => response.json()).then(data => {
                let environmentData = data.map((item: {
                    _time: string,
                    Flow: number;
                }) => [item._time, item.Flow]);

                environmentData = environmentData.slice(0, 100);
                let msg = '[';
                for (let i = 0; i < environmentData.length; i++) {
                    msg += '[ "' + environmentData[i][0].toString() + '", ' + environmentData[i][1].toString() + '], ';
                }
                msg += ']';
                console.log(msg);
            },
        ); */
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
