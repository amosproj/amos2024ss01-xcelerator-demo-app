import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'lib-create-order',
	standalone: true,
	imports: [CommonModule, IxModule, ReactiveFormsModule],
	templateUrl: './create-order.component.html',
	styleUrl: './create-order.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent {
	createOrderForm = new FormGroup({
		selectFacility: new FormControl('', Validators.required),
		assets: new FormControl('', Validators.required),
		phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		text: new FormControl(''),
	});
	onSubmit() {
		// submit order
	}
}
