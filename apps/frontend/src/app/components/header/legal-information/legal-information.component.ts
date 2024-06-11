import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'app-legal-information',
	standalone: true,
	imports: [ CommonModule, IxModule ],
	templateUrl: './legal-information.component.html',
	styleUrl: './legal-information.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalInformationComponent {}
