import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { themeSwitcher } from '@siemens/ix';
import { IxModule } from '@siemens/ix-angular';
import { convertThemeName, registerTheme } from '@siemens/ix-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { facilities } from '../facility.mocks/const';
import { IFacilityMock } from '../facility.mocks/facility.interface';

@Component({
	selector: 'lib-detail',
	standalone: true,
	imports: [CommonModule, IxModule, NgxEchartsModule],
	templateUrl: './detail.page.html',
	styleUrl: './detail.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdDetailPage implements OnInit {
	facility: IFacilityMock = this.getFacility();

	theme = convertThemeName(themeSwitcher.getCurrentTheme());
	options: EChartsOption = {
		xAxis: {
			type: 'category',
			data: [
				'16:20',
				'16:30',
				'16:40',
				'16:50',
				'17:00',
				'17:10',
				'17:20',
				'17:30',
				'17:40',
				'17:50',
				'18:00',
				'18:10',
				'18:20',
			],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [98, 88, 88, 102, 102, 88, 88, 88, 80, 76, 70, 72, 68],
				type: 'line',
			},
		],
	};

	constructor(private route: ActivatedRoute) {}

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
}
