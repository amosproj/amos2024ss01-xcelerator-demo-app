import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component, computed,
    inject, OnInit, Signal,
    ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { XdDetailsFacade } from '@frontend/facilities/frontend/domain';
import { themeSwitcher } from '@siemens/ix';
import { IxModule, ModalService } from '@siemens/ix-angular';
import { convertThemeName, registerTheme } from '@siemens/ix-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { BehaviorSubject } from 'rxjs';

import { Colors } from './colors';
import LockModalComponent from './lock-modal/lockModal.component';

@Component({
    selector: 'lib-detail',
    standalone: true,
    imports: [
        CommonModule,
        IxModule,
        NgxEchartsModule,
        LockModalComponent,
        RouterLink,
    ],
    templateUrl: './detail.page.html',
    styleUrl: './detail.page.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XdDetailPage implements OnInit {
    private readonly _assetId = this._route.snapshot.params['id'];
    private readonly _currentTime = new Date();
    private readonly _28MinutesAgo = new Date(this._currentTime.getTime() - 28 * 60 * 1000);

    private readonly _detailsFacade = inject(XdDetailsFacade);

    protected readonly facility = toSignal(this._detailsFacade.getFacility(this._assetId));

    protected readonly pumpData = toSignal(this._detailsFacade.getTimeSeriesDataItems(this._assetId, 'pumpData',
        { from: this._28MinutesAgo, to: this._currentTime },
    ));

    protected readonly envData = toSignal(this._detailsFacade.getTimeSeriesDataItems(this._assetId, 'Environment',
        { from: this._28MinutesAgo, to: this._currentTime },
    ));

    protected theme = convertThemeName(themeSwitcher.getCurrentTheme());
    protected readonly defaultOptions: EChartsOption = {
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
        },
    };

    protected readonly pumpChart: Signal<EChartsOption | undefined> = computed(() => {
        const pumpData = this.pumpData();
        if (!pumpData)
            return undefined;

        const Flow = pumpData.map((item) => [ item.time, item['Flow'] ]);
        const MotorCurrent = pumpData.map((item) => [ item.time, item['MotorCurrent'] ]);
        const StuffingBoxTemperature = pumpData.map((item) => [ item.time, item['StuffingBoxTemperature'] ]);
        const PressureIn = pumpData.map((item) => [ item.time, item['PressureIn'] ]);
        const PressureOut = pumpData.map((item) => [ item.time, item['PressureOut'] ]);

        return {
            ...this.defaultOptions,
            series: [
                {
                    name: 'Flow (l/s)',
                    type: 'line',
                    data: Flow,
                    itemStyle: { color: Colors.WATER },
                    lineStyle: { color: Colors.WATER },
                },
                {
                    name: 'Motor Current (V)',
                    type: 'line',
                    itemStyle: { color: Colors.MOTORCURRENT },
                    lineStyle: { color: Colors.MOTORCURRENT },
                    data: MotorCurrent,
                },
                {
                    name: 'Stuffing Box Temperature (°C)',
                    type: 'line',
                    itemStyle: { color: Colors.TEMPERATURE },
                    lineStyle: { color: Colors.TEMPERATURE },
                    data: StuffingBoxTemperature,
                },
                {
                    name: 'Pressure In (hPa)',
                    type: 'line',
                    itemStyle: { color: Colors.PRESSURE1 },
                    lineStyle: { color: Colors.PRESSURE1 },
                    data: PressureIn,
                },
                {
                    name: 'Pressure Out (hPa)',
                    type: 'line',
                    itemStyle: { color: Colors.PRESSURE2 },
                    lineStyle: { color: Colors.PRESSURE2 },
                    data: PressureOut,
                },
            ],

        };
    });

    protected readonly envChart: Signal<EChartsOption | undefined> = computed(() => {
        const envData = this.envData();
        if (!envData)
            return undefined;

        const Temperature = envData.map((item) => [ item.time, item['Temperature'] ]);
        const Humidity = envData.map((item) => [ item.time, item['Humidity'] ]);
        const Pressure = envData.map((item) => [ item.time, item['Pressure'] ]);

        return {
            ...this.defaultOptions,
            series: [
                {
                    name: 'Temperature (°C)',
                    type: 'line',
                    itemStyle: { color: Colors.TEMPERATURE },
                    lineStyle: { color: Colors.TEMPERATURE },
                    data: Temperature,
                },
                {
                    name: 'Humidity (%)',
                    type: 'line',
                    itemStyle: { color: Colors.WATER },
                    lineStyle: { color: Colors.WATER },
                    data: Humidity,
                },
                {
                    name: 'Pressure (kPa)',
                    type: 'line',
                    itemStyle: { color: Colors.PRESSURE1 },
                    lineStyle: { color: Colors.PRESSURE1 },
                    data: Pressure,
                },
            ],

        };
    });

    protected locked$ = new BehaviorSubject<boolean>(true);

    constructor(
        private _route: ActivatedRoute,
        private readonly _modalService: ModalService,
    ) {
    }

    ngOnInit() {
        registerTheme(echarts);

        themeSwitcher.themeChanged.on((theme: string) => {
            this.theme = convertThemeName(theme);
        });
    }

    async changeLocked() {
        const instance = await this._modalService.open({
            content: LockModalComponent,
            data: { locked: this.locked$.getValue() },
        });

        // modal closes on confirm and dismisses on cancel
        instance.onClose.on(() => {
            this.locked$.next(!this.locked$.getValue());
        });
    }
}
