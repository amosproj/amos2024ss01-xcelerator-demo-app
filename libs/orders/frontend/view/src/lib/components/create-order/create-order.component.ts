import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lib-create-order',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './create-order.component.html',
	styleUrl: './create-order.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent {}
