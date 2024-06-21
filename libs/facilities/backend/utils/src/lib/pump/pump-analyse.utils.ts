import {
	EPumpStatus,
	IPumpStatisticReport,
	IStatisticalReport,
	IStatisticalVariance,
	ITimeSeriesPumpReport,
} from '@frontend/facilities/backend/models';
import { maxBy, meanBy, minBy, sumBy } from 'lodash';

export function checkPumpStatus(pumpData: ITimeSeriesPumpReport[]): EPumpStatus {
	const flowThreshold = 5;
	const tempIncreaseThreshold = 2;
	const coefficientOfVariationThreshold = 0.2;
	const standardDeviationThreshold = 5;

	let status = EPumpStatus.REGULAR;

	const report = generateStatisticalReport(pumpData);
	if (
		report.Flow?.coefficientOfVariation &&
		report.Flow?.coefficientOfVariation > coefficientOfVariationThreshold
	) {
		status = EPumpStatus.SUSPICIOUS;
	}

	if (
		report.Flow?.standardDeviation &&
		report.Flow?.standardDeviation > standardDeviationThreshold
	) {
		status = EPumpStatus.FAULTY;
	}

	for (let i = 0; i < pumpData.length - 1; i++) {
		if (
			pumpData[i].Flow < flowThreshold &&
			pumpData[i + 1].Flow > flowThreshold &&
			pumpData[i + 1].StuffingBoxTemperature >
				pumpData[i].StuffingBoxTemperature + tempIncreaseThreshold
		) {
			status = EPumpStatus.SUSPICIOUS;
		}

		if (pumpData[i].Flow < flowThreshold) {
			status = EPumpStatus.FAULTY;
			break;
		}
	}

	return status;
}

export function generateStatisticalReport(pumpData: ITimeSeriesPumpReport[]): IPumpStatisticReport {
	return {
		MotorCurrent: generateStatistic(pumpData, 'MotorCurrent'),
		PressureOut: generateStatistic(pumpData, 'PressureOut'),
		StuffingBoxTemperature: generateStatistic(pumpData, 'StuffingBoxTemperature'),
		PressureIn: generateStatistic(pumpData, 'PressureIn'),
		Flow: generateStatistic(pumpData, 'Flow'),
	};
}

function generateStatistic<T>(
	collection: Array<T> | null | undefined,
	iteratee: keyof T,
): IStatisticalReport | undefined {
	if (!collection) {
		return undefined;
	}

	return {
		min: minBy(collection, iteratee)?.[iteratee] as number,
		max: maxBy(collection, iteratee)?.[iteratee] as number,
		...statisticalAnalysis(collection, iteratee),
	};
}

export function statisticalAnalysis<T>(
	collection: Array<T> | null | undefined,
	iteratee: keyof T,
): IStatisticalVariance | undefined {
	if (!collection) {
		return undefined;
	}

	// Calculate the mean (μ)
	const mean = meanBy(collection, iteratee);

	// Calculate the variance (σ²)
	const variance =
		sumBy(collection, (item) => Math.pow(+item[iteratee] - mean, 2)) / collection.length;

	// Calculate the standard deviation (σ)
	const standardDeviation = Math.sqrt(variance);

	// Calculate the coefficient of variation (VarK)
	const coefficientOfVariation = standardDeviation / mean;

	return { mean, variance, standardDeviation, coefficientOfVariation };
}
