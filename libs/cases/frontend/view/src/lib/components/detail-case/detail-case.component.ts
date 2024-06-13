import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { cases } from '../case.mocks/fackerMock';

@Component({
    selector: 'lib-detail-case',
    standalone: true,
    imports: [ CommonModule, FormsModule, IxModule ],
    templateUrl: './detail-case.component.html',
    styleUrls: [ './detail-case.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCaseComponent implements OnInit{
    casedetail = this.getCaseDetail();
    isOverdue = false;

    ngOnInit(): void {
        this.checkIfOverdue(this.casedetail.dueDate);
    }


    constructor(private route: ActivatedRoute) {}

    getCaseDetail() {
        const casedetail = cases.find(
            (casedetail) => casedetail.handle === this.route.snapshot.params['handle'],
        );
        if (casedetail === undefined) {
            throw new Error('Facility not found');
        } else {
            return casedetail;
        }
    }

    checkIfOverdue(dueDate: string): boolean {
        const dueDateTime = new Date(dueDate).getTime();
        const currentDateTime = new Date().getTime();
        this.isOverdue = dueDateTime < currentDateTime;
        return this.isOverdue;
    }
}
