import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_CONFIG } from 'common-frontend-models';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [{ provide: APP_CONFIG, useValue: { apiUrl: 'http://localhost:3333/api' } }],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});
