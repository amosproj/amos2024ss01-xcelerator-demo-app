import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { XdBrowsePage } from '../browse';
import { facilities } from '../facility.mocks/const';

@Component({
	selector: 'lib-issues',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink, XdBrowsePage],
	templateUrl: './issues.page.html',
	styleUrl: './issues.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdIssuesPage {
	protected readonly _issueFacilities = facilities.filter(
		(facility) => facility.variant != 'success',
	);
}
