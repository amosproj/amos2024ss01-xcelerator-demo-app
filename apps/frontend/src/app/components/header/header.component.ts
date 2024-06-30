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
import { themeSwitcher } from '@siemens/ix';
import { IxModule } from '@siemens/ix-angular';
import { convertThemeName } from '@siemens/ix-echarts';
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

    protected theme = convertThemeName(themeSwitcher.getCurrentTheme());
    protected themeSwitched = false;
    themes = [ 'theme-classic-light', 'theme-classic-dark' ];
    selectedTheme = this.themes[1];
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    readonly routerEvents = toSignal(
        this._router.events.pipe(filter((e) => e instanceof NavigationEnd)),
        { initialValue: null },
    );

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

    onItemSelectionChange(event: Event) {
        const customEvent = event as CustomEvent<string | string[]>;
        const newTheme = customEvent.detail[0];
        themeSwitcher.setTheme(newTheme);
        this.selectedTheme = newTheme;
    }

    toggleMode() {
        themeSwitcher.toggleMode();
        this.themeSwitched = !this.themeSwitched;
    }

    getCorrectImage() {
        if (this.themeSwitched) {
            return "https://cdn.c2comms.cloud/images/logo-collection/2.1/sie-logo-black-rgb.svg";
        }
        return "https://cdn.c2comms.cloud/images/logo-collection/2.1/sie-logo-white-rgb.svg";
    }

    getCorrectIcon() {
        if (this.themeSwitched) {
            //lightmode
            return "sun-filled";
        }
        //darkmode (Default)
        return "sun";
    }

    protected readonly console = console;

}
