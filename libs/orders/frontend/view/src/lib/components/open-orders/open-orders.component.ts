import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lib-open-orders',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './open-orders.component.html',
	styleUrl: './open-orders.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenOrdersComponent {}
