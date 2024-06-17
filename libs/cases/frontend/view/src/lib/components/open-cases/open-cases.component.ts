import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { XdBrowseFacadesService } from '@frontend/cases/frontend/domain';
import { ICaseResponse } from '@frontend/cases/shared/models';
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

export class OpenCasesComponent  {
    protected readonly _browseFacade = inject(XdBrowseFacadesService);
    protected readonly _cases = toSignal(this._browseFacade.getAllCases());
    protected readonly _filteredCases = computed(() => {
        const cases = this._cases();
        if (cases === undefined) {
            return;
        }
        cases.filter((_case: ICaseResponse) => _case.status === 'OPEN').sort((a, b) => {
            const priorityOrder = [ 'EMERGENCY', 'HIGH', 'MEDIUM', 'LOW' ];
            const priorityAIndex = priorityOrder.indexOf(a.priority.toUpperCase());
            const priorityBIndex = priorityOrder.indexOf(b.priority.toUpperCase());

            if (priorityAIndex === priorityBIndex) {
                return a.id - b.id;
            } else if (priorityAIndex === -1) {
                return 1;
            } else if (priorityBIndex === -1) {
                return -1;
            }
            return priorityAIndex - priorityBIndex;
        });

        return cases;
    });

    getStatusClasses(_case: ICaseResponse) {
        return {
            emergency: _case.priority === 'EMERGENCY',
            'status-open': _case.status === 'OPEN',
            'status-inprogress': _case.status === 'INPROGRESS',
            'status-overdue': _case.status === 'OVERDUE',
            'status-onhold': _case.status === 'ONHOLD',
            'status-done': _case.status === 'DONE',
            'status-cancelled': _case.status === 'CANCELLED',
            'status-archived': _case.status === 'ARCHIVED'
        };
    }
}
