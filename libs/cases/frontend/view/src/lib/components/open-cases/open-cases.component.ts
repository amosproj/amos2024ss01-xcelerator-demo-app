import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit,ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { ICaseMock } from '../case.mocks/case.interface';
import { cases } from '../case.mocks/fackerMock';

@Component({
	selector: 'lib-open-cases',
	standalone: true,
	imports: [ CommonModule, IxModule, RouterLink ],
	templateUrl: './open-cases.component.html',
	styleUrl: './open-cases.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenCasesComponent implements OnInit {
    protected readonly _cases = cases;
    filteredCases: ICaseMock[];

    ngOnInit(): void {
        this.filteredCases = this._cases.filter(_case => _case.status === 'OPEN').sort((a, b) => {
            const priorityOrder = [ 'EMERGENCY', 'HIGH', 'MEDIUM', 'LOW' ];
            const priorityAIndex = priorityOrder.indexOf(a.priority.toUpperCase());
            const priorityBIndex = priorityOrder.indexOf(b.priority.toUpperCase());

            if (priorityAIndex === priorityBIndex) {
                return a.handle.localeCompare(b.handle);
            } else if (priorityAIndex === -1) {
                return 1;
            } else if (priorityBIndex === -1) {
                return -1;
            }
            return priorityAIndex - priorityBIndex;
        });
    }

    getStatusClasses(_case: ICaseMock) {
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
