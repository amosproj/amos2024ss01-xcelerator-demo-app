import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { XdBrowseFacade } from '@frontend/facilities/frontend/domain';
import { StatusToColorRecord } from '@frontend/facilities/frontend/models';
import { IxModule } from '@siemens/ix-angular';
import { EPumpStatus } from 'facilities-shared-models';

@Component({
	selector: 'lib-browse',
	standalone: true,
	imports: [ CommonModule, IxModule, RouterLink ],
	templateUrl: './browse.page.html',
	styleUrl: './browse.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdBrowsePage {

	protected showCardList = true;
    protected readonly StatusToColorRecord = StatusToColorRecord;
    protected readonly filter = signal(true);
	private readonly _browseFacade = inject(XdBrowseFacade);
	private readonly allFacilities = toSignal(this._browseFacade.getAllFacilities());
    protected readonly facilities = computed(() => {
        const facilities = this.allFacilities();
        if(!facilities)
            return undefined;

       if(this.filter()) {
           return facilities.filter(facility => facility.status != EPumpStatus.REGULAR);
       } else {
           return facilities;
       }
    });

	toggleView() {
		this.showCardList = !this.showCardList;
	}

    toggleFilter() {
        this.filter.set(!this.filter());
    }
}
