import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IxModule } from '@siemens/ix-angular';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { facilities } from 'libs/facilities/frontend/view/src/lib/components/facility.mocks/const';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IFacilityMock } from 'libs/facilities/frontend/view/src/lib/components/facility.mocks/facility.interface';

@Component({
	selector: 'lib-create-order',
	standalone: true,
	imports: [ CommonModule, IxModule, FormsModule ],
	templateUrl: './create-order.component.html',
	styleUrl: './create-order.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent {
	facilities: IFacilityMock[] = facilities;

	wasValidated = false;
	value = '1';

	createOrderForm = {
		selectFacility: '',
		selectAsset: '',
		phone: '',
		email: '',
		text: '',
	};

	onSubmit(form: NgForm): void {
		this.wasValidated = true;
		if (form.form.valid) {
			//Form is valid!!
			//get all values by form.form.value
		}
	}

	public setFacilityValue(value: string) {
		this.createOrderForm.selectFacility = value;
	}

	public setAssetValue(value: string) {
		this.createOrderForm.selectAsset = value;
	}

	public setPhoneValue(value: string) {
		this.createOrderForm.phone = value;
	}

	public setEmailValue(value: string) {
		this.createOrderForm.email = value;
	}

	public getFacilityValue() {
		return this.createOrderForm.selectFacility;
	}

	public getAssetValue() {
		return this.createOrderForm.selectAsset;
	}

	public getPhoneValue() {
		return this.createOrderForm.phone;
	}

	public getEmailValue() {
		return this.createOrderForm.email;
	}

	public getTextValue() {
		return this.createOrderForm.text;
	}
}
