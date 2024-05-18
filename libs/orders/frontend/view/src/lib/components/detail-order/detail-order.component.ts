import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { orders } from '../orders';

@Component({
	selector: 'lib-detail-order',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './detail-order.component.html',
	styleUrl: './detail-order.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailOrderComponent {
	order = this.getOrder();

	constructor(private route: ActivatedRoute) {}

	getOrder() {
		const order = orders.find((order) => order.id === this.route.snapshot.params['id']);
		if (order === undefined) {
			throw new Error('Facility not found');
		} else {
			return order;
		}
	}
}
