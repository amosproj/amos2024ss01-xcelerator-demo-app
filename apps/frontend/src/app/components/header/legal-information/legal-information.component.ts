import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

@Component({
	selector: 'app-legal-information',
	standalone: true,
	imports: [CommonModule, IxModule],
	templateUrl: './legal-information.component.html',
	styleUrl: './legal-information.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalInformationComponent implements AfterViewInit {
	@ViewChild('menu', { read: ElementRef })
	menuRef!: ElementRef<HTMLIxMenuElement>;

	ngAfterViewInit() {
		const { nativeElement } = this.menuRef;
		nativeElement.toggleAbout(true);
	}
}
