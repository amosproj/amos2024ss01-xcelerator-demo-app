import { ITimeSeriesPumpReport } from '@frontend/facilities/backend/models';
import { EPumpStatus } from '@frontend/facilities/backend/models';

import {
	checkPumpStatus,
	generateStatisticalReport,
	statisticalAnalysis,
} from './pump-analyse.utils';

describe('checkPumpStatus', () => {
	it('should return REGULAR when the pump is operating normally', () => {
		const pumpData: Partial<ITimeSeriesPumpReport>[] = [
			{ Flow: 6, StuffingBoxTemperature: 20 },
			{ Flow: 6, StuffingBoxTemperature: 20 },
			{ Flow: 6, StuffingBoxTemperature: 20 },
		];

		const status = checkPumpStatus(pumpData as ITimeSeriesPumpReport[]);

		expect(status).toEqual(EPumpStatus.REGULAR);
	});

	it('should return SUSPICIOUS when the pump is suspicious', () => {
		const pumpData: Partial<ITimeSeriesPumpReport>[] = [
			{ Flow: 8, StuffingBoxTemperature: 20 },
			{ Flow: 5, StuffingBoxTemperature: 22 }, // Flow drops below threshold and temperature increases
			{ Flow: 8, StuffingBoxTemperature: 20 },
		];

		const status = checkPumpStatus(pumpData as ITimeSeriesPumpReport[]);

		expect(status).toEqual(EPumpStatus.SUSPICIOUS);
	});

	it('should return FAULTY when the pump is faulty', () => {
		const pumpData: Partial<ITimeSeriesPumpReport>[] = [
			{ Flow: 6, StuffingBoxTemperature: 20 },
			{ Flow: 4, StuffingBoxTemperature: 20 }, // Flow drops below threshold
			{ Flow: 4, StuffingBoxTemperature: 20 }, // Flow remains below threshold
		];

		const status = checkPumpStatus(pumpData as ITimeSeriesPumpReport[]);

		expect(status).toEqual(EPumpStatus.FAULTY);
	});
});

describe('generateStatisticalReport', () => {
	it('should return the statistical report for the pump data', () => {
		const result = generateStatisticalReport([]);

		expect(result).toBeDefined();
		expect(result.MotorCurrent).toBeDefined();
		expect(result.PressureOut).toBeDefined();
		expect(result.StuffingBoxTemperature).toBeDefined();
		expect(result.PressureIn).toBeDefined();
		expect(result.Flow).toBeDefined();
	});
});

describe('statisticalAnalysis', () => {
	it('should return undefined if collection is null', () => {
		const result = statisticalAnalysis(null, 'Flow');
		expect(result).toBeUndefined();
	});

	it('should return undefined if collection is undefined', () => {
		const result = statisticalAnalysis(undefined, 'Flow');
		expect(result).toBeUndefined();
	});

	it('should calculate the variance correctly', () => {
		const collection = [{ Flow: 1 }, { Flow: 2 }, { Flow: 3 }, { Flow: 4 }, { Flow: 5 }];
		const result = statisticalAnalysis(collection, 'Flow');
		expect(result?.mean).toBeCloseTo(3);
		expect(result?.variance).toBeCloseTo(2);
		expect(result?.standardDeviation).toBeCloseTo(1.414);
		expect(result?.coefficientOfVariation).toBeCloseTo(0.471);
	});
});
