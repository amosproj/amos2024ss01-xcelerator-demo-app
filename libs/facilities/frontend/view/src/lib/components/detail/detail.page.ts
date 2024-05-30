import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IxModule, ModalService } from '@siemens/ix-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { BehaviorSubject } from 'rxjs';

import { envData } from '../facility.mocks/charts/envData';
import { pumpData } from '../facility.mocks/charts/pumpData';
import { BehaviorSubject } from 'rxjs';
import { facilities } from '../facility.mocks/const';
import { IFacilityMock } from '../facility.mocks/facility.interface';
import { ChartComponent } from './chart/chart.component';
import LockModalComponent from './lock-modal/lockModal.component';

@Component({
	selector: 'lib-detail',
	standalone: true,
  imports: [ CommonModule, IxModule, NgxEchartsModule, LockModalComponent, RouterLink, ChartComponent ],
	templateUrl: './detail.page.html',
	styleUrl: './detail.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdDetailPage {
	facility: IFacilityMock = this.getFacility();
    pumpData = pumpData;
    envData = envData;

	protected locked$ = new BehaviorSubject<boolean>(true);

	constructor(
		private route: ActivatedRoute,
		private readonly modalService: ModalService,
		protected _location: Location,
	) {}

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
