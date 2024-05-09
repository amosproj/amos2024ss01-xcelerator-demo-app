import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRootLayout } from './root.layout';

describe('AppRootLayout', () => {
	let component: AppRootLayout;
	let fixture: ComponentFixture<AppRootLayout>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppRootLayout],
		}).compileComponents();

		fixture = TestBed.createComponent(AppRootLayout);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
