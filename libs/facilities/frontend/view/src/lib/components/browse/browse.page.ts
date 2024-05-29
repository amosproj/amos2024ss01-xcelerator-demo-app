import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	OnInit,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { of } from 'rxjs';

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
	facilities = input.required<IFacilityMock[]>();
	a = of({});
	signalA = toSignal(this.a);
	testFacilities = computed(() => {
		return this.facilities();
	});

	countrySignal = signal('germany');
	president = computed(() => {
		const country = this.countrySignal();
		if (country === 'germany') {
			return 'Scholz';
		} else {
			return 'Macron';
		}
	});

	subtitle = input.required<string>();

	async ngOnInit() {
		await new Promise((r) => setTimeout(r, 2000));
		this.countrySignal.set('France');
		this.countrySignal.update((value) => value + '.');
	}

	showCardList = true;

	toggleView() {
		this.showCardList = !this.showCardList;
	}
}
