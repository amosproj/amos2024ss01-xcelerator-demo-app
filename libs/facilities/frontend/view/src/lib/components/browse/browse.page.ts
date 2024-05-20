import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { facilities } from '../facility.mocks/const';
import { IFacilityMock } from '../facility.mocks/facility.interface';

@Component({
	selector: 'lib-browse',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink],

	templateUrl: './browse.page.html',
	styleUrl: './browse.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdBrowsePage implements OnInit {
	@Input()
	facilities: IFacilityMock[] = facilities;

	@Input()
	subtitle = 'List of all facilities';

    showCardList = true;
    ngOnInit() {
        if (this.facilities === undefined) {
            this.facilities = facilities;
        }
        if (this.subtitle === undefined) {
            this.subtitle = 'List of all facilities';
        }
    }

    toggleView() {
        this.showCardList = !this.showCardList;
    }

    trackByFacilityId(index: number, facility: IFacilityMock): string {
        return facility.id;
    }
}

