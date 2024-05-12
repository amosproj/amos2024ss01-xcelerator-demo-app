import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XdDetailPage } from './detail.page';

describe('DetailComponent', () => {
	let component: XdDetailPage;
	let fixture: ComponentFixture<XdDetailPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [XdDetailPage],
		}).compileComponents();

		fixture = TestBed.createComponent(XdDetailPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
