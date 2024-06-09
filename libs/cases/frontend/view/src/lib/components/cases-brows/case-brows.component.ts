import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { cases } from '../case.mocks/const';

@Component({
	selector: 'lib-open-cases',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink],
	templateUrl: './case-brows.component.html',
	styleUrl: './case-brows.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseBrowsComponent {
	protected readonly _cases = cases;
	sortedCases: any[];

	ngOnInit(): void {
		const statusOrder = [
			'OPEN',
			'INPROGRESS',
			'OVERDUE',
			'ONHOLD',
			'DONE',
			'CANCELLED',
			'ARCHIVED',
		];
		const priorityOrder = ['EMERGENCY', 'HIGH', 'MEDIUM', 'LOW'];

		this.sortedCases = [...this._cases].sort((a, b) => {
			const statusAIndex = statusOrder.indexOf(a.status);
			const statusBIndex = statusOrder.indexOf(b.status);

			if (statusAIndex === statusBIndex) {
				const priorityAIndex = priorityOrder.indexOf(a.priority.toUpperCase());
				const priorityBIndex = priorityOrder.indexOf(b.priority.toUpperCase());

				if (priorityAIndex === priorityBIndex) {
					return a.handle.localeCompare(b.handle);
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
	}
}
