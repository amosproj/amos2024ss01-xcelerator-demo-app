import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

@Component({
	standalone: true,
	imports: [RouterModule, IxModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'frontend';
}
