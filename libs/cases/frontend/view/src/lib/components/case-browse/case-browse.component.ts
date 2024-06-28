import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { XdCasesFacade } from '@frontend/cases/frontend/domain';
import { ICaseResponse } from '@frontend/cases/shared/models';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'lib-brows-cases',
	standalone: true,
	imports: [ CommonModule, IxModule, RouterLink ],
	templateUrl: './case-browse.component.html',
	styleUrls: [ './case-browse.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseBrowseComponent {
	protected readonly showPriorityEmergency = signal(true);
	protected readonly showPriorityHigh = signal(true);
	protected readonly showPriorityMedium = signal(true);
	protected readonly showPriorityLow = signal(true);

	protected readonly showTypePlanned = signal(true);
	protected readonly showTypeIncident = signal(true);
	protected readonly showTypeAnnotation = signal(true);

	protected readonly showStatusOpen = signal(true);
	protected readonly showStatusInProgress = signal(false);
	protected readonly showStatusOverdue = signal(false);
	protected readonly showStatusOnHold = signal(false);
	protected readonly showStatusDone = signal(false);
	protected readonly showStatusCancelled = signal(false);
	protected readonly showStatusArchived = signal(false);

	protected readonly _casesFacade = inject(XdCasesFacade);
	protected readonly _cases = toSignal(this._casesFacade.getAllCases());
	protected readonly _sortedCases = computed(() => {
		let cases = this._cases();
		if (cases === undefined) {
			return;
		}

		if (!this.showPriorityEmergency()) {
			cases = cases.filter((_case) => _case.priority != 'EMERGENCY');
		}
		if (!this.showPriorityHigh()) {
			cases = cases.filter((_case) => _case.priority != 'HIGH');
		}
		if (!this.showPriorityMedium()) {
			cases = cases.filter((_case) => _case.priority != 'MEDIUM');
		}
		if (!this.showPriorityLow()) {
			cases = cases.filter((_case) => _case.priority != 'LOW');
		}

		if (!this.showTypePlanned()) {
			cases = cases.filter((_case) => _case.type != 'PLANNED');
		}
		if (!this.showTypeIncident()) {
			cases = cases.filter((_case) => _case.type != 'INCIDENT');
		}
		if (!this.showTypeAnnotation()) {
			cases = cases.filter((_case) => _case.type != 'ANNOTATION');
		}

		if (!this.showStatusOpen()) {
			cases = cases.filter((_case) => _case.status != 'OPEN');
		}
		if (!this.showStatusInProgress()) {
			cases = cases.filter((_case) => _case.status != 'INPROGRESS');
		}
		if (!this.showStatusOnHold()) {
			cases = cases.filter((_case) => _case.status != 'ONHOLD');
		}
		if (!this.showStatusDone()) {
			cases = cases.filter((_case) => _case.status != 'DONE');
		}
		if (!this.showStatusOverdue()) {
			cases = cases.filter((_case) => _case.status != 'OVERDUE');
		}
		if (!this.showStatusCancelled()) {
			cases = cases.filter((_case) => _case.status != 'CANCELLED');
		}
		if (!this.showStatusArchived()) {
			cases = cases.filter((_case) => _case.status != 'ARCHIVED');
		}

		const statusOrder = [
			'OPEN',
			'INPROGRESS',
			'OVERDUE',
			'ONHOLD',
			'DONE',
			'CANCELLED',
			'ARCHIVED',
		];
		const priorityOrder = [ 'EMERGENCY', 'HIGH', 'MEDIUM', 'LOW' ];

		cases.sort((a, b) => {
			const statusAIndex = statusOrder.indexOf(a.status);
			const statusBIndex = statusOrder.indexOf(b.status);

			if (statusAIndex === statusBIndex) {
				const priorityAIndex = priorityOrder.indexOf(a.priority.toUpperCase());
				const priorityBIndex = priorityOrder.indexOf(b.priority.toUpperCase());

				if (priorityAIndex === priorityBIndex) {
					return a.id - b.id;
				} else if (priorityAIndex === -1) {
					return 1;
				} else if (priorityBIndex === -1) {
					return -1;
				}
				return priorityAIndex - priorityBIndex;
			} else if (statusAIndex === -1) {
				return 1;
			} else if (statusBIndex === -1) {
				return -1;
			}
			return statusAIndex - statusBIndex;
		});

		return cases;
	});

	getStatusClasses(_case: ICaseResponse) {
		return {
			emergency: _case.priority === 'EMERGENCY',
			'status-open': _case.status === 'OPEN',
			'status-inprogress': _case.status === 'INPROGRESS',
			'status-overdue': _case.status === 'OVERDUE',
			'status-onhold': _case.status === 'ONHOLD',
			'status-done': _case.status === 'DONE',
			'status-cancelled': _case.status === 'CANCELLED',
			'status-archived': _case.status === 'ARCHIVED',
		};
	}

    flipShowPriorityEmergency() {
        this.showPriorityEmergency.update(value => !value);
    }
    flipShowPriorityHigh() {
        this.showPriorityHigh.update(value => !value);
    }
    flipShowPriorityMedium() {
        this.showPriorityMedium.update(value => !value);
    }
    flipShowPriorityLow() {
        this.showPriorityLow.update(value => !value);
    }

    flipShowTypePlanned() {
        this.showTypePlanned.update(value => !value);
    }
    flipShowTypeIncident() {
        this.showTypeIncident.update(value => !value);
    }
    flipShowTypeAnnotation() {
        this.showTypeAnnotation.update(value => !value);
    }

    flipShowStatusOpen() {
        this.showStatusOpen.update(value => !value);
    }
    flipShowStatusInProgress() {
        this.showStatusInProgress.update(value => !value);
    }
    flipShowStatusOnHold() {
        this.showStatusOnHold.update(value => !value);
    }
    flipShowStatusDone() {
        this.showStatusDone.update(value => !value);
    }
    flipShowStatusOverdue() {
        this.showStatusOverdue.update(value => !value);
    }
    flipShowStatusCancelled() {
        this.showStatusCancelled.update(value => !value);
    }
    flipShowStatusArchived() {
        this.showStatusArchived.update(value => !value);
    }
}
