import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [CommonModule, IxModule, RouterLink],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {}
