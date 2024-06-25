import { EPumpMetricsName } from '../enums/pump-metrics-name.enum';
import { IStatisticalVariance } from './statistical-variance.interface';

/**
 * Interface for statistic reports which analyze the data for a certain property group
 */
export interface IPumpMetrics extends IStatisticalVariance {
	/**
	 * Minimum value
	 */
	min?: number;

	/**
	 * Maximum value
	 */
	max?: number;

    /**
     * The name of the statistical report
     */
    name: EPumpMetricsName;
}
