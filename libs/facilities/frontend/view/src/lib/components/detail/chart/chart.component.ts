import { CommonModule } from '@angular/common';
import { Component, Input, OnInit  } from '@angular/core';
import { themeSwitcher } from '@siemens/ix';
import { convertThemeName, registerTheme } from '@siemens/ix-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
	selector: 'lib-chart',
	standalone: true,
    imports: [ CommonModule, NgxEchartsDirective ],
	templateUrl: './chart.component.html',
	styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {

    theme = convertThemeName(themeSwitcher.getCurrentTheme());

    // this is how the values are supposed to look but these values are never used
    @Input({required: true}) data = [ [ '2024-04-22T22:06:03.695Z', 69 ] ]
    @Input({required: true}) title = 'sample title';
    @Input({required: true}) yname = 'sample yname';
    @Input({required: true}) color = 'sample color';

    options!: EChartsOption;

    ngOnInit() {
        registerTheme(echarts);

        themeSwitcher.themeChanged.on((theme: string) => {
            this.theme = convertThemeName(theme);
        });

        this.options = {
            title: {
                text: this.title,
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
                name: this.yname,
                nameLocation: 'middle',
                nameGap: 30,
            },
            series: [
                {
                    data: this.data,
                    type: 'line',
                    itemStyle: { color: this.color },
                    lineStyle: { color: this.color },
                },
            ],
        };
    }
}
