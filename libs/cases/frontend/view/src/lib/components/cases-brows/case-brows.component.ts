import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { cases } from '../case.mocks/const';

@Component({
    selector: 'lib-open-cases',
    standalone: true,
    imports: [ CommonModule, IxModule, RouterLink ],
    templateUrl: './case-brows.component.html',
    styleUrl: './case-brows.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CaseBrowsComponent {
    protected readonly _cases = cases;
}
