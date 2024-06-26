import { EPumpIndicatorMessage, EPumpStatus, ITimeSeriesPumpReport } from 'facilities-shared-models';

import { checkPumpStatus, generateStatisticalReport, statisticalAnalysis } from './pump-analyse.utils';

describe('checkPumpStatus', () => {

    it('should return SUSPICIOUS when there is high standard deviation', () => {
        const pumpData: Partial<ITimeSeriesPumpReport>[] = [
            { Flow: 160, StuffingBoxTemperature: 20 },
            { Flow: 250, StuffingBoxTemperature: 20 }, // High deviation in Flow
            { Flow: 160, StuffingBoxTemperature: 20 },
        ];

        const { status, indicatorMsg } = checkPumpStatus(pumpData as ITimeSeriesPumpReport[]);

        expect(status).toEqual(EPumpStatus.SUSPICIOUS);
        expect(indicatorMsg).toBe(EPumpIndicatorMessage.STANDARD_DEVIATION);
    });

    it(('should return REGULAR when the time series data has no anomalies'), () => {
        const pumpData: Partial<ITimeSeriesPumpReport>[] = [
            { Flow: 160, StuffingBoxTemperature: 20 },
            { Flow: 162, StuffingBoxTemperature: 21 },
            { Flow: 180, StuffingBoxTemperature: 22 },
        ];

        const { status } = checkPumpStatus(pumpData as ITimeSeriesPumpReport[]);

        expect(status).toEqual(EPumpStatus.REGULAR);

    });

    it('should return SUSPICIOUS when the pump drops below the threshold even once', () => {
        const pumpData: Partial<ITimeSeriesPumpReport>[] = [
            { Flow: 151, StuffingBoxTemperature: 20 },
            { Flow: 149, StuffingBoxTemperature: 20 }, // Below threshold
            { Flow: 151, StuffingBoxTemperature: 20 },
        ];

        const { status, indicatorMsg } = checkPumpStatus(pumpData as ITimeSeriesPumpReport[]);

        expect(status).toEqual(EPumpStatus.SUSPICIOUS);
        expect(indicatorMsg).toBe(EPumpIndicatorMessage.FLOW_DROP);
    });

    it('should return FAULTY when the pump has been below the threshold for over 10 minutes', () => {
        const pumpData: Partial<ITimeSeriesPumpReport>[] = [
            { Flow: 140, StuffingBoxTemperature: 20, time: '2021-09-01T00:00:00Z' },
            { Flow: 149, StuffingBoxTemperature: 20, time: '2021-09-01T00:01:00Z' },
            { Flow: 149, StuffingBoxTemperature: 20, time: '2021-09-01T00:11:00Z' },
        ];

        const { status, indicatorMsg } = checkPumpStatus(pumpData as ITimeSeriesPumpReport[]);

        expect(status).toEqual(EPumpStatus.FAULTY);
        expect(indicatorMsg).toBe(EPumpIndicatorMessage.FLOW_LOW_DURATION);

    })
});

describe('generateStatisticalReport', () => {
    it('should return the statistical report for the pump data', () => {
        const pumpData = [
            { Flow: 6, StuffingBoxTemperature: 20, MotorCurrent: 10, PressureOut: 5, PressureIn: 4 },
            { Flow: 7, StuffingBoxTemperature: 21, MotorCurrent: 11, PressureOut: 6, PressureIn: 5 },
            { Flow: 8, StuffingBoxTemperature: 22, MotorCurrent: 12, PressureOut: 7, PressureIn: 6 },
        ];

        const result = generateStatisticalReport(pumpData as ITimeSeriesPumpReport[]);

        expect(result).toBeDefined();
        expect(result).toHaveLength(5);
        expect(result).toContainEqual(expect.objectContaining({ name: 'MotorCurrent' }));
        expect(result).toContainEqual(expect.objectContaining({ name: 'PressureOut' }));
        expect(result).toContainEqual(expect.objectContaining({ name: 'StuffingBoxTemperature' }));
        expect(result).toContainEqual(expect.objectContaining({ name: 'PressureIn' }));
        expect(result).toContainEqual(expect.objectContaining({ name: 'Flow' }));
    });
});

describe('statisticalAnalysis', () => {
    it('should return undefined if the mean is NaN', () => {
        const collection = [ { Flow: 'not a number' }, { Flow: 2 }, { Flow: 3 }, { Flow: 4 }, { Flow: 5 } ];
        const result = statisticalAnalysis(collection, 'Flow');
        expect(result).toBeUndefined();
    });
});
