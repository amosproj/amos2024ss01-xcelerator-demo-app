import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { XdBrowseFacadesService } from '@frontend/cases/frontend/domain';
import { XdBrowseFacade } from '@frontend/facilities/frontend/domain';
import { CasePriority, CaseStatus, CaseType } from '@prisma/client';
import { IxModule } from '@siemens/ix-angular';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { facilities } from 'libs/facilities/frontend/view/src/lib/components/facility.mocks/const';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IFacilityMock } from 'libs/facilities/frontend/view/src/lib/components/facility.mocks/facility.interface';
import { fromPairs } from 'lodash';
import { map } from 'rxjs';

@Component({
	selector: 'lib-create-case',
	standalone: true,
	imports: [ CommonModule, IxModule, FormsModule, RouterLink ],
	templateUrl: './create-case.component.html',
	styleUrl: './create-case.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCaseComponent {
	private readonly _browseFacade = inject(XdBrowseFacade);
	protected readonly facilities = toSignal(this._browseFacade.getAllTimeseries());

	protected readonly _browseFacade2 = inject(XdBrowseFacadesService);
	
	casePriority = CasePriority;
	caseType = CaseType;
	wasValidated = false;
	value = '1';

	createCaseForm = {
		selectFacility: '',
		title: '',
		dueDate: '',
		selectPriority: '',
		selectType: '',
		phone: '',
		email: '',
		text: '',
	};
	
	/**
	 * called when the user presses the Create Case Button
	 */
	onSubmit(form: NgForm): void {
		this.wasValidated = true;

		if(!form.valid) {
			console.error('Form is invalid');
			return;
		}
		const caseData = this.mapFormData(form.form.value);
		this._browseFacade2.createCase(caseData).subscribe({
			next: (response) => {
				console.log('Case created successfully:', response);
			},
			error: (error) => {
				console.error('Failed to create case:', error);
			}
		});
	}

	public setFacilityValue(value: string) {
		this.createCaseForm.selectFacility = value;
	}

	public setPhoneValue(value: string) {
		this.createCaseForm.phone = value;
	}

	public setEmailValue(value: string) {
		this.createCaseForm.email = value;
	}

	public getFacilityValue() {
		return this.facilities()?.find(
			(facility) => facility.id === this.createCaseForm.selectFacility,
		);
	}

	public getPhoneValue() {
		return this.createCaseForm.phone;
	}

	public getEmailValue() {
		return this.createCaseForm.email;
	}

	public getTextValue() {
		return this.createCaseForm.text;
	}

	onDateChange($event: any) {
		this.createCaseForm.dueDate = $event.value.from;
	}
	
	/**
	 * 
	 * @param formData 
	 * @returns 
	 */
	private mapFormData(formData: any) {
		return {
			handle: 'CASE123456789',
    		dueDate: formData.dueDate,
    		title: formData.title,
    		type: formData.selectType,
    		status: CaseStatus.OPEN,
    		description: formData.text,
    		source: 'Internal System A',
    		priority: formData.selectPriority,
    		createdBy: formData.email,
    		eTag: 'etag_value_here'
		};
	}
}
