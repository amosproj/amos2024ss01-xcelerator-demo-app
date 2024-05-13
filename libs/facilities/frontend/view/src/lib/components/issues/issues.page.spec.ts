import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XdIssuesPage } from './issues.page';

describe('BrowseComponent', () => {
	let component: XdIssuesPage;
	let fixture: ComponentFixture<XdIssuesPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [XdIssuesPage],
		}).compileComponents();

		fixture = TestBed.createComponent(XdIssuesPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
