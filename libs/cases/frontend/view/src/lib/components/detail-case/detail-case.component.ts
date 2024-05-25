import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { cases } from '../case.mocks/const';

@Component({
	selector: 'lib-detail-case',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './detail-case.component.html',
	styleUrl: './detail-case.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCaseComponent {
	casedetail = this.getCaseDetail();

	constructor(private route: ActivatedRoute) {}

	getCaseDetail() {
		const casedetail = cases.find(
			(casedetail) => casedetail.id === this.route.snapshot.params['id'],
		);
		if (casedetail === undefined) {
			throw new Error('Facility not found');
		} else {
			return casedetail;
		}
	}
}
