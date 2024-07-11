import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { XdBrowseFacade } from '@frontend/facilities/frontend/domain';
import { StatusToColorRecord } from '@frontend/facilities/frontend/models';
import { IxModule } from '@siemens/ix-angular';
import { LocalStorageService } from 'common-frontend-models';
import { EPumpStatus } from 'facilities-shared-models';

@Component({
	selector: 'lib-browse',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink],
	templateUrl: './browse.page.html',
	styleUrl: './browse.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdBrowsePage {
	protected showCardList = computed(
		() => this.localStorageService.getOrCreate('showCardList', 'true')() === 'true',
	);

	protected filterIssues = computed(
		() => this.localStorageService.getOrCreate('filterIssues', 'true')() === 'true',
	);

	protected readonly StatusToColorRecord = StatusToColorRecord;
	private readonly _browseFacade = inject(XdBrowseFacade);
	private readonly allFacilities = toSignal(this._browseFacade.getAllFacilities());
	protected readonly facilities = computed(() => {
		const facilities = this.allFacilities();
		if (!facilities) return undefined;

		if (this.filterIssues()) {
			return facilities.filter((facility) => facility.status != EPumpStatus.REGULAR);
		} else {
			return facilities;
		}
	});

	constructor(
		protected readonly router: Router,
		protected readonly route: ActivatedRoute,
		private readonly localStorageService: LocalStorageService,
	) {}

	toggleView() {
		this.localStorageService.set('showCardList', (!this.showCardList()).toString());
	}

	toggleFilter() {
		this.localStorageService.set('filterIssues', (!this.filterIssues()).toString());
	}
}
