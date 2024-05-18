import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { orders } from '../orders';

@Component({
	selector: 'lib-open-orders',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink],
	templateUrl: './open-orders.component.html',
	styleUrl: './open-orders.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenOrdersComponent {
	protected readonly _orders = orders;
}
