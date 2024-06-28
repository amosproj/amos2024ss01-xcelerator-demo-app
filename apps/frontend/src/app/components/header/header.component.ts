import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { filter } from 'rxjs';

import { LegalInformationComponent } from './legal-information/legal-information.component';

/**
 * Header component
 */
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ CommonModule, IxModule, RouterLink, RouterOutlet, LegalInformationComponent ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private readonly _router: Router = inject(Router);

    readonly routerEvents = toSignal(
        this._router.events.pipe(filter((e) => e instanceof NavigationEnd)),
        { initialValue: null },
    );

    private readonly _lastRoute = computed(() => {
        this.routerEvents();

        let currentRoute = this._activatedRoute.root;
        while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
        }

        return currentRoute;
    });

    readonly title = computed(() => {
        return this._lastRoute().snapshot.data['title'];
    });

    readonly subtitle = computed(() => {
        return this._lastRoute().snapshot.data['subtitle'];
    });

    readonly backButtonPresent = computed(() => {
        return this.breadcrumbs().length > 1;
    });

    readonly breadcrumbs = computed(() => {
        this.routerEvents();

        const breadcrumbs = [];
        let currentRoute = this._activatedRoute.root;
        while (currentRoute.firstChild) {
            const breadcrumb = currentRoute.snapshot.data['breadcrumb'];
            if(breadcrumb && breadcrumbs[breadcrumbs.length - 1] !== breadcrumb)
                breadcrumbs.push(breadcrumb)

            currentRoute = currentRoute.firstChild;
        }

        const breadcrumb = currentRoute.snapshot.data['breadcrumb'];
        if(breadcrumb && breadcrumbs[breadcrumbs.length - 1] !== breadcrumb)
            breadcrumbs.push(breadcrumb)

        return breadcrumbs;
    });

    /**
     * from the right cut the current url until a '/' is reached n times
     * So for /cases/10/abc, goBack(1) yields /cases/10
     *
     * @param n
     */
    cutUrl(n: number) {
        const currentUrl = this._router.url;
        const urlSegments = currentUrl.split('/');
        return urlSegments.slice(0, urlSegments.length - n).join('/');
    }

    goBack(n = 1) {
        this._router.navigateByUrl(this.cutUrl(n));
    }

}
