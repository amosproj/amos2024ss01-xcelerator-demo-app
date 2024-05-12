import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { HeaderComponent } from '../components/header/header.component';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink, RouterOutlet, HeaderComponent, MenuComponent],
	templateUrl: './root.layout.html',
	styleUrl: './root.layout.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRootLayout {}
