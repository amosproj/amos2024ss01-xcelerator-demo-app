import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'lib-create-order',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './create-order.component.html',
	styleUrl: './create-order.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent {
	onSubmit() {
		// submit order
	}
}
