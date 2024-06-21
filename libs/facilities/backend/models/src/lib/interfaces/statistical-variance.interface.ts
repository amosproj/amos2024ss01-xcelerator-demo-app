/**
 * Interface for the statistical variance of a data set
 */
export interface IStatisticalVariance {
	/**
	 * The variance σ² of the data
	 */
	variance?: number;

	/**
	 * The standard deviation σ of the data
	 */
	standardDeviation?: number;

	/**
	 * The coefficient of variation of the data
	 */
	coefficientOfVariation?: number;

	/**
	 * The mean μ of the data
	 */
	mean?: number;
}
