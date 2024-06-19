import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { faker } from '@faker-js/faker';
import { XdBrowseFacadesService } from '@frontend/cases/frontend/domain';
import { XdBrowseFacade } from '@frontend/facilities/frontend/domain';
import { IxModule, IxSelectCustomEvent, ToastService } from '@siemens/ix-angular';
import { ECasePriority, ECaseStatus, ECaseType } from 'cases-shared-models';

import { CaseFormData } from '../interfaces/case-form-data.interface';
import { DateDropdownWrapperComponent } from './date-dropdown-accessor';

@Component({
	selector: 'lib-create-case',
	standalone: true,
	imports: [ CommonModule, IxModule, FormsModule, RouterLink, DateDropdownWrapperComponent ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useClass: DateDropdownWrapperComponent,
			multi: true,
		},
	],
	templateUrl: './create-case.component.html',
	styleUrl: './create-case.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCaseComponent implements OnInit {
	private readonly _browseFacade = inject(XdBrowseFacade);
	protected readonly _browseFacade2 = inject(XdBrowseFacadesService);
	protected readonly facilities = toSignal(this._browseFacade.getAllFacilities());

	facilityPlaceholder = signal('Select Facility');
	typePlaceholder = signal('Select Type');
	priorityPlaceholder = signal('Select Priority');

	constructor(private readonly toastService: ToastService) {}

	casePriority = ECasePriority;
	caseType = ECaseType;
	wasValidated = false;

	createCaseForm = {
		selectFacility: '',
		title: '',
		dueDate: '',
		selectPriority: '',
		selectType: '',
		email: '',
		text: '',
	};

	ngOnInit() {
		this.resizeObserver('input-facilitySelection', 'facilitySelection');
		this.resizeObserver('input-typeSelection', 'typeSelection');
		this.resizeObserver('input-prioritySelection', 'prioritySelection');
	}

	/**
	 * called when the user presses the Create Case Button
	 */
	onSubmit(form: NgForm): void {
		this.wasValidated = true;

		if (form.valid) {
			const caseData = this.mapFormData(form.form.value);

			this._browseFacade2.createCase(caseData).subscribe({
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				next: (_) => {
					this.showSuccessToast();
					this.wasValidated = false;
					form.reset();
				},
			});
		}
	}

	async showSuccessToast() {
		await this.toastService.show({
			type: 'success',
			message: 'Successfully created Case',
		});
	}

	public set facilityValue(value: string) {
		this.createCaseForm.selectFacility = value;
	}

	public get facilityValue() {
		return this.createCaseForm.selectFacility;
	}

	public set emailValue(value: string) {
		this.createCaseForm.email = value;
	}

	public get emailValue() {
		return this.createCaseForm.email;
	}

	public getFacility() {
		return this.facilities()?.find(
			(facility) => facility.id === this.createCaseForm.selectFacility,
		);
	}

	private resizeObserver(inputElement: string, selectElement: string) {
		const input = document.getElementById(inputElement);
		const select = document.getElementById(selectElement);
		if (input && select) {
			new ResizeObserver((entries) => {
				entries.forEach((entry) => {
					const width = entry.contentRect.width;
					const height = entry.contentRect.height;
					const xPos = entry.contentRect.x;
					const yPos = entry.contentRect.y;
					if (input && input.style) {
						input.style.width = `${width}px`;
						input.style.height = `${height}px`;
						input.style.x = `${xPos}`;
						input.style.y = `${yPos}`;
					}
				});
			}).observe(select);
		}
	}

	onFacilityChange(event: IxSelectCustomEvent<string | string[]>) {
		if (event.target.value !== undefined) {
			this.createCaseForm.selectFacility = event.target.value.toString();
		}
	}

	onFacilityInputChange(event: CustomEvent<string>) {
		this.createCaseForm.selectFacility = '';
		this.facilityPlaceholder.set(event.detail);
	}

	onTypeChange(event: IxSelectCustomEvent<string | string[]>) {
		if (event.target.value !== undefined) {
			this.createCaseForm.selectType = event.target.value.toString();
		}
	}

	onTypeInputChange(event: CustomEvent<string>) {
		this.createCaseForm.selectType = '';
		this.typePlaceholder.set(event.detail);
	}

	onPriorityChange(event: IxSelectCustomEvent<string | string[]>) {
		if (event.target.value !== undefined) {
			this.createCaseForm.selectPriority = event.target.value.toString();
		}
	}

	onPriorityInputChange(event: CustomEvent<string>) {
		this.createCaseForm.selectPriority = '';
		this.priorityPlaceholder.set(event.detail);
	}

	/**
	 *
	 * @param formData case data in the form filled in by the user
	 * @returns {JSON}
	 */
	private mapFormData(formData: CaseFormData) {
		return {
			handle: 'AA-' + faker.number.int({ min: 1000, max: 9999 }),
			dueDate: formData.dueDate,
			title: formData.title,
			type: formData.selectType,
			status: ECaseStatus.OPEN,
			description: formData.text,
			source: 'Internal System ' + faker.number.int({ min: 1, max: 10 }),
			priority: formData.selectPriority,
			createdBy: formData.email,
			eTag: faker.string.alphanumeric(10),
		};
	}
}
