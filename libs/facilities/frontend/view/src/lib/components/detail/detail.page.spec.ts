import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideEcharts } from 'ngx-echarts';

import { XdDetailPage } from './detail.page';

describe('DetailComponent', () => {
	let component: XdDetailPage;
	let fixture: ComponentFixture<XdDetailPage>;

	window.ResizeObserver =
		window.ResizeObserver ||
		jest.fn().mockImplementation(() => ({
			disconnect: jest.fn(),
			observe: jest.fn(),
			unobserve: jest.fn(),
		}));

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ XdDetailPage, HttpClientTestingModule ],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { id: '1' } } },
				},
				provideEcharts(),
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
