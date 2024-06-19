import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { XdBrowseFacadesService } from '@frontend/cases/frontend/domain';
import { ICaseResponse } from '@frontend/cases/shared/models';
import { IxModule } from '@siemens/ix-angular';


@Component({
    selector: 'lib-detail-case',
    standalone: true,
    imports: [ CommonModule, FormsModule, IxModule, RouterLink ],
    templateUrl: './detail-case.component.html',
    styleUrls: [ './detail-case.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCaseComponent {
    private readonly _browseFacade = inject(XdBrowseFacadesService);
    protected readonly _cases  = toSignal(this._browseFacade.getAllCases());
    protected readonly casedetail = computed(() => {
        const _case = this._cases();
        if (_case === undefined) {
            return;
        }
        return _case.find((_case) => String(_case.id) === this.route.snapshot.params['id']);
    });


    constructor(private route: ActivatedRoute) {}

    deleteCase(){
        const caseId = this.mapCaseId(this.casedetail());
        if (caseId !== undefined) {
            this._browseFacade.deleteCase(caseId).subscribe()
        }
    }

    mapCaseId(_case: ICaseResponse | undefined) {
        if (_case === undefined) {
            return undefined;
        }
        return {
            id: _case.id,
        }
    }
}
