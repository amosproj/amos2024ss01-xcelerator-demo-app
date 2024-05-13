import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

import { facilities } from '../index';

@Component({
	selector: 'lib-browse',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './issues.page.html',
	styleUrl: './issues.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdIssuesPage {
	readonly issueFacilities = facilities.filter((facility) => facility.variant != 'success');
}
