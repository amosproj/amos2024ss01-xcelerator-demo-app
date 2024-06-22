import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { XdBrowseFacadesService } from '@frontend/cases/frontend/domain';
import { ICaseResponse } from '@frontend/cases/shared/models';
import { IxModule } from '@siemens/ix-angular';

@Component({
    selector: 'lib-brows-cases',
    standalone: true,
    imports: [ CommonModule, IxModule, RouterLink ],
    templateUrl: './case-browse.component.html',
    styleUrls: [ './case-browse.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseBrowseComponent {
    protected filterPriority = 'ALL';
    protected filterStatus = 'ALL';
    protected filterType = 'ALL';
    protected readonly _browseFacade = inject(XdBrowseFacadesService);
    protected readonly _cases = toSignal(this._browseFacade.getAllCases());
    protected readonly _sortedCases = computed( () => {
        let cases = this._cases();
        if (cases === undefined) {
            return;
        }
        if(this.filterPriority != 'ALL') {
            cases = cases.filter(_case => _case.priority == this.filterPriority);
        }
        if(this.filterStatus != 'ALL') {
            cases = cases.filter(_case => _case.status == this.filterStatus);
        }
        if(this.filterType != 'ALL') {
            cases = cases.filter(_case => _case.type == this.filterType);
        }

        const statusOrder = [
            'OPEN',
            'INPROGRESS',
            'OVERDUE',
            'ONHOLD',
            'DONE',
            'CANCELLED',
            'ARCHIVED',
        ];
        const priorityOrder = [
            'EMERGENCY',
            'HIGH',
            'MEDIUM',
            'LOW'
        ];

        cases.sort((a, b) => {
            const statusAIndex = statusOrder.indexOf(a.status);
            const statusBIndex = statusOrder.indexOf(b.status);

            if (statusAIndex === statusBIndex) {
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
            } else if (statusAIndex === -1) {
                return 1;
            } else if (statusBIndex === -1) {
                return -1;
            }
            return statusAIndex - statusBIndex;
        });

        return cases;
    })

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
