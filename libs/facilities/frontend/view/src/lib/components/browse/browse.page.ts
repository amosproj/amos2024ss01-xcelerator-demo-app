import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

import { facilities } from '../index';

@Component({
	selector: 'lib-browse',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './browse.page.html',
	styleUrl: './browse.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdBrowsePage {
	readonly facilities = facilities;
}
