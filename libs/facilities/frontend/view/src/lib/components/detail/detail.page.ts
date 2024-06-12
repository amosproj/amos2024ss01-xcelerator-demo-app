import { CommonModule} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { XdDetailsFacade } from '@frontend/facilities/frontend/domain';
import { IxModule, ModalService } from '@siemens/ix-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { BehaviorSubject } from 'rxjs';

import { envChart, pumpChart } from '../facility.mocks/charts/processData';
import { ChartComponent } from './chart/chart.component';
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
		ChartComponent,
	],
	templateUrl: './detail.page.html',
	styleUrl: './detail.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdDetailPage {
	private readonly _detailsFacade = inject(XdDetailsFacade);

	protected readonly facility = toSignal(this._detailsFacade.getFacility(this._route.snapshot.params['id']))

	protected $locked = new BehaviorSubject<boolean>(true);

    pumpChart = pumpChart;
    envChart = envChart;

	constructor(
		private _route: ActivatedRoute,
		private readonly _modalService: ModalService
	) {}


	async changeLocked() {
		const instance = await this._modalService.open({
			content: LockModalComponent,
			data: { locked: this.$locked.getValue() },
		});

		// modal closes on confirm and dismisses on cancel
		instance.onClose.on(() => {
			this.$locked.next(!this.$locked.getValue());
		});
	}
}
