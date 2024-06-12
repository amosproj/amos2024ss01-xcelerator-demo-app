import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	Input,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { XdBrowseFacade } from '@frontend/facilities/frontend/domain';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'lib-browse',
	standalone: true,
	imports: [ CommonModule, IxModule, RouterLink ],
	templateUrl: './browse.page.html',
	styleUrl: './browse.page.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdBrowsePage implements OnInit {
	@Input()
	subtitle = 'List of all facilities';
	showCardList = true;
	private readonly _browseFacade = inject(XdBrowseFacade);
	protected readonly facilities = toSignal(this._browseFacade.getAllTimeseries());

	async ngOnInit() {
		if (this.subtitle === undefined) {
			this.subtitle = 'List of all facilities';
		}
	}

	toggleView() {
		this.showCardList = !this.showCardList;
	}
}
