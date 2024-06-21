import { IStatisticalVariance } from './statistical-variance.interface';

/**
 * Interface for statistic reports which analyze the data for a certain property group
 */
export interface IStatisticalReport extends IStatisticalVariance {
	/**
	 * Minimum value
	 */
	min?: number;

	/**
	 * Maximum value
	 */
	max?: number;
}
