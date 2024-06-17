import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [ CommonModule, IxModule, RouterLink, NgOptimizedImage ],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
