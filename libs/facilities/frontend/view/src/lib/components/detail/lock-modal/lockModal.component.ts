import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IxActiveModal, IxModule } from '@siemens/ix-angular';
@Component({
	selector: 'lib-lock-modal',
	standalone: true,
    imports: [ CommonModule, IxModule ],
	templateUrl: './lockModal.component.html',
	styleUrl: './lockModal.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LockModalComponent {

    locked = true;
    constructor(readonly activeModal: IxActiveModal) {
        this.locked = activeModal.data.locked;
    }

    closeModal(){
        this.activeModal.close("okay");

    }
}
