import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideEcharts } from 'ngx-echarts';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
	let component: ChartComponent;
	let fixture: ComponentFixture<ChartComponent>;

    window.ResizeObserver =
        window.ResizeObserver ||
        jest.fn().mockImplementation(() => ({
            disconnect: jest.fn(),
            observe: jest.fn(),
            unobserve: jest.fn(),
        }));

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ ChartComponent ],
            providers: [ provideEcharts() ],
		}).compileComponents();

		fixture = TestBed.createComponent(ChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
