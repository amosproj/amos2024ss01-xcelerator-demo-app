import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { XdDetailPage } from './detail.page';

describe('DetailComponent', () => {
	let component: XdDetailPage;
	let fixture: ComponentFixture<XdDetailPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [XdDetailPage],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { id: '1' } } },
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(XdDetailPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
