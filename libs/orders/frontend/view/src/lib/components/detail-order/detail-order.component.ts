import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lib-detail-order',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './detail-order.component.html',
	styleUrl: './detail-order.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailOrderComponent {}
