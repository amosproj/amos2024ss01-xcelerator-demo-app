import {
    EPumpIndicatorMessage,
    EPumpMetricsName,
    EPumpStatus,
    IPumpDataAnalysis,
    IPumpMetrics,
    IStatisticalVariance,
    ITimeSeriesPumpReport,
} from 'facilities-shared-models';
import { compact, maxBy, meanBy, minBy, sumBy } from 'lodash';
import dayjs = require('dayjs');

export function checkPumpStatus(pumpData: ITimeSeriesPumpReport[]): IPumpDataAnalysis {
	const flowThreshold = 150;
	const tempIncreaseThreshold = 2;
	const flowDeviation = 10;
    const standardDeviationThreshold = 10;

	let status = EPumpStatus.REGULAR;
	let indicatorMsg = EPumpIndicatorMessage.REGULAR;
	let belowThresholdStartTime: dayjs.Dayjs | undefined = undefined;

	for (let i = 0; i < pumpData.length; i++) {
		if (pumpData[i].Flow < flowThreshold) {
			if (!belowThresholdStartTime) {
				belowThresholdStartTime = dayjs(pumpData[i].time);
			}

			// If the pump has been below the threshold for over 10 minutes, it's faulty
			if (
                belowThresholdStartTime && dayjs(pumpData[i].time).diff(belowThresholdStartTime, 'minutes') > 10
			) {
				status = EPumpStatus.FAULTY;
				indicatorMsg = EPumpIndicatorMessage.FLOW_LOW_DURATION;
				break;
			}

			// If the pump drops below the threshold even once, it's suspicious
			status = EPumpStatus.SUSPICIOUS;
			indicatorMsg = EPumpIndicatorMessage.FLOW_DROP;
		} else {
			belowThresholdStartTime = undefined;
		}

		// Check for a rise in StuffingBoxTemperature while the flow is stable
		if (
            i < pumpData.length - 1 &&
			pumpData[i + 1].StuffingBoxTemperature > pumpData[i].StuffingBoxTemperature + tempIncreaseThreshold
            && Math.abs(pumpData[i + 1].Flow - pumpData[i].Flow) > flowDeviation
		) {
			status = EPumpStatus.SUSPICIOUS;
			indicatorMsg = EPumpIndicatorMessage.TEMP_RISE_FLOW_STABLE;
		}
	}

    const metrics = generateStatisticalReport(pumpData);

    const hasHighDeviation = metrics.some((metric: IPumpMetrics) =>
        metric.standardDeviation && metric.standardDeviation > standardDeviationThreshold
    );

    if (hasHighDeviation) {
        status = EPumpStatus.SUSPICIOUS;
        indicatorMsg = EPumpIndicatorMessage.STANDARD_DEVIATION;
    }

    return { status, indicatorMsg, metrics };
}

export function generateStatisticalReport(pumpData: ITimeSeriesPumpReport[]) {
	return compact([
        generateStatistic(pumpData, 'MotorCurrent'),
        generateStatistic(pumpData, 'PressureOut'),
        generateStatistic(pumpData, 'StuffingBoxTemperature'),
        generateStatistic(pumpData, 'PressureIn'),
        generateStatistic(pumpData, 'Flow'),
    ]);
}

function generateStatistic<T>(
	collection: Array<T> | null | undefined,
	iteratee: keyof T,
): IPumpMetrics | undefined {
	if (!collection) {
		return undefined;
	}

	return {
		name: iteratee as EPumpMetricsName,
		min: minBy(collection, iteratee)?.[iteratee] as number,
		max: maxBy(collection, iteratee)?.[iteratee] as number,
		...statisticalAnalysis(collection, iteratee),
	};
}

export function statisticalAnalysis<T>(
	collection: Array<T> | null | undefined,
	iteratee: keyof T,
): IStatisticalVariance | undefined {
	if (
		!collection ||
		(Array.isArray(collection) && collection.length === 0) ||
		isNaN(meanBy(collection, iteratee))
	) {
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
