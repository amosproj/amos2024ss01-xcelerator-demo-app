import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'lib-view',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './view.component.html',
	styleUrl: './view.component.scss',
})
export class ViewComponent {}
