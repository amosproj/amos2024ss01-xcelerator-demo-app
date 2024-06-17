import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { XdBrowseFacadesService } from '@frontend/cases/frontend/domain';
import { IxModule } from '@siemens/ix-angular';

@Component({
    selector: 'lib-detail-case',
    standalone: true,
    imports: [ CommonModule, FormsModule, IxModule ],
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
}
