import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	Signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { XdCasesFacade } from '@frontend/cases/frontend/domain';
import { FilterState, IxCategoryFilterCustomEvent, IxModule } from '@siemens/ix-angular';
import { ICaseResponse } from 'cases-shared-models';
import { LocalStorageService } from 'common-frontend-models';

@Component({
	selector: 'lib-brows-cases',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink],
	templateUrl: './case-browse.component.html',
	styleUrls: ['./case-browse.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseBrowseComponent {
	private readonly _filter: Signal<{ id: string; value: string; operator: string }[]> = computed(
		() =>
			this.stringToFilter(this.localStorage.getOrCreate('caseFilter', 'Status,Equal,OPEN')()),
	);

	private readonly _cases = toSignal(this._casesFacade.getAllCases());
	protected readonly processedCases = computed(() => {
		const initialCases = this._cases();
		if (initialCases === undefined) {
			return;
		}

		const filteredCases = this._filter().reduce((cases, filter) => {
			return cases.filter((c) => {
				const filterId = filter.id.toLowerCase();
				if (filterId !== 'status' && filterId !== 'type' && filterId !== 'priority')
					return true;

				const caseValue = c[filterId];
				if (filter.operator === 'Equal') {
					return caseValue === filter.value;
				} else {
					return caseValue !== filter.value;
				}
			});
		}, initialCases);

		filteredCases.sort((a, b) => {
			const statusAIndex = this.statusOptions.indexOf(a.status);
			const statusBIndex = this.statusOptions.indexOf(b.status);
			return statusAIndex - statusBIndex;
		});

		return filteredCases;
	});

	private readonly statusOptions = [
		'OPEN',
		'INPROGRESS',
		'OVERDUE',
		'ONHOLD',
		'DONE',
		'CANCELLED',
		'ARCHIVED',
	];
	private readonly priorityOptions = ['EMERGENCY', 'HIGH', 'MEDIUM', 'LOW'];
	private readonly typeOptions = ['PLANNED', 'INCIDENT', 'ANNOTATION'];

	protected readonly repeatCategories = true;
	protected filterState = {
		tokens: [],
		categories: this._filter(),
	};

	protected readonly categories = {
		Status: {
			label: 'status',
			options: this.statusOptions,
		},
		Priority: {
			label: 'priority',
			options: this.priorityOptions,
		},
		Type: {
			label: 'type',
			options: this.typeOptions,
		},
	};

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected localStorage: LocalStorageService,
		private _casesFacade: XdCasesFacade,
	) {}

	getStatusClasses(_case: ICaseResponse) {
		return {
			'priority-emergency': _case.priority === 'EMERGENCY',
			'status-inprogress': _case.status === 'INPROGRESS',
			'status-overdue': _case.status === 'OVERDUE',
			'status-onhold': _case.status === 'ONHOLD',
			'status-done': _case.status === 'DONE',
			'status-cancelled': _case.status === 'CANCELLED',
			'status-archived': _case.status === 'ARCHIVED',
		};
	}

	filterList(event: IxCategoryFilterCustomEvent<FilterState>) {
		this.localStorage.set('caseFilter', this.filterToString(event.detail.categories));
	}

	shortenDescription(description: string) {
		if (description.length < 50) {
			return description;
		} else {
			return description.substring(0, 50) + '...';
		}
	}

	private filterToString(filter: { id: string; value: string; operator: string }[]): string {
		return filter.map((f) => f.id + ',' + f.operator + ',' + f.value).join('|');
	}

	private stringToFilter(filterString: string) {
		const filter = filterString.split('|');
		return filter.map((f) => {
			const filterParts = f.split(',');
			return { id: filterParts[0], operator: filterParts[1], value: filterParts[2] };
		});
	}
}
