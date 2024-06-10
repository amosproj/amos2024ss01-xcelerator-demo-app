import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IxModule, ModalService } from '@siemens/ix-angular';

import { cases } from '../case.mocks/const';

@Component({
	selector: 'lib-detail-case',
	standalone: true,
	imports: [ CommonModule, IxModule ],
	templateUrl: './detail-case.component.html',
	styleUrl: './detail-case.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCaseComponent {

	@ViewChild('customModal', { read: TemplateRef })
	customModalRef!: TemplateRef<any>;
  

	casedetail = this.getCaseDetail();

	constructor(
		private route: ActivatedRoute,
		private readonly modalService: ModalService
	) {}

	getCaseDetail() {
		const casedetail = cases.find(
			(casedetail) => casedetail.handle === this.route.snapshot.params['handle'],
		);
		if (casedetail === undefined) {
			throw new Error('Facility not found');
		} else {
			return casedetail;
		}
	}

	async openModal() {
		await this.modalService.open({
			content: this.customModalRef
		});
	}
	
}
