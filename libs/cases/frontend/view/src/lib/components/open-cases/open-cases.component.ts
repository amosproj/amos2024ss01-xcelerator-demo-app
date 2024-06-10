import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject,ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { XdBrowseFacadesService } from '@frontend/cases/frontend/domain';
import { IxModule } from '@siemens/ix-angular';


@Component({
	selector: 'lib-open-cases',
	standalone: true,
	imports: [ CommonModule, IxModule, RouterLink ],
	templateUrl: './open-cases.component.html',
	styleUrl: './open-cases.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenCasesComponent {
	protected readonly _browseFacade = inject(XdBrowseFacadesService);
	protected readonly _cases  = toSignal(this._browseFacade.getAllCases());
}
