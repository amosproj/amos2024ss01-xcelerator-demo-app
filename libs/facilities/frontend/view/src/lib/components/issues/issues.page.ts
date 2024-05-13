import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { facilities } from '../facility';

@Component({
	selector: 'lib-browse',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink],
	templateUrl: './issues.page.html',
	styleUrl: './issues.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdIssuesPage {
	readonly issueFacilities = facilities.filter((facility) => facility.variant != 'success');
}
