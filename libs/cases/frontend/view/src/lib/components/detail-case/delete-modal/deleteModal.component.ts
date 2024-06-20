import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IxActiveModal, IxModule } from '@siemens/ix-angular';
import { RouterLink } from '@angular/router';
@Component({
	selector: 'lib-lock-modal',
	standalone: true,
    imports: [CommonModule, IxModule, RouterLink],
	templateUrl: './deleteModal.component.html',
	styleUrl: './deleteModal.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeleteModalComponent {
	constructor(readonly activeModal: IxActiveModal) {}
}
