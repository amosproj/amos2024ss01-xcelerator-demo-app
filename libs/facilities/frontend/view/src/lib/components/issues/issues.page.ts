import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { XdBrowsePage } from '../browse';

// TODO - Discuss how meaningful this component is since it is basically a copy of the browse page, currently not even the issue filter is applied
@Component({
	selector: 'lib-issues',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink, XdBrowsePage],
	templateUrl: './issues.page.html',
	styleUrl: './issues.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdIssuesPage {}
