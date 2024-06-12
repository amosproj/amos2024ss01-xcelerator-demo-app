import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { themeSwitcher } from '@siemens/ix';
import { convertThemeName, registerTheme } from '@siemens/ix-echarts';
import { EChartsOption, SeriesOption } from 'echarts';
import * as echarts from 'echarts';
import { TitleOption } from 'echarts/types/dist/shared';
import { NgxEchartsDirective } from 'ngx-echarts';

import { IChart } from '../../facility.mocks/charts/chart.interfaces';
import { envChart } from '../../facility.mocks/charts/processData';
@Component({
	selector: 'lib-chart',
	standalone: true,
    imports: [ CommonModule, NgxEchartsDirective ],
	templateUrl: './chart.component.html',
	styleUrl: './chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {

    theme = convertThemeName(themeSwitcher.getCurrentTheme());

    @Input({required: true}) chart: IChart  = envChart;

    options: EChartsOption = {
        animationDuration: 1000,
        animation: true,
        title: {
            left: 'center',
        },
        xAxis: {
            type: 'time',
            name: 'Time',
            nameLocation: 'middle',
            nameGap: 30,
        },
        yAxis: {
            type: 'value',
            name: 'Value',
            nameLocation: 'middle',
            nameGap: 30,
        },
        legend: {
            top: 30,
            left: 20,
            right: 20,
        },
        grid: {
            top: 80,
        }
    };

    ngOnInit() {
        registerTheme(echarts);

        themeSwitcher.themeChanged.on((theme: string) => {
            this.theme = convertThemeName(theme);
        });

        if(!this.options.title) {
            return;
        }
        (this.options.title as TitleOption).text = this.chart.title;

        const series: SeriesOption[] = [];
        for(let i = 0; i < this.chart.names.length; i++) {
            series.push({
                name: this.chart.names[i],
                type: 'line',
                data: this.chart.data[i],
                itemStyle: { color: this.chart.colors[i] },
                lineStyle: { color: this.chart.colors[i] },
                animationDuration: 1000,
                animation: true,
            });
        }

        this.options.series = series;
    }
}
