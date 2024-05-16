import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { facilities } from '../facility.mocks/const';

@Component({
	selector: 'lib-detail',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './detail.page.html',
	styleUrl: './detail.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdDetailPage {
	facility = this.getFacility();

	constructor(private route: ActivatedRoute) {}

	getFacility() {
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
