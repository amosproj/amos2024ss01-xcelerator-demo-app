import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'lib-detail',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './detail.page.html',
	styleUrl: './detail.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdDetailPage {}
