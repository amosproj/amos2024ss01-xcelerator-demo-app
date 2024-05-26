/**
 * Interface for getting time series parameters
 */
export interface IGetTimeSeriesParams {
	/**
	 * The entity id for an asset
	 */
	entityId: string;

	/**
	 * The name of the aspect
	 */
	propertySetName: string;
}
