/**
 * Interface for getting time series parameters
 */
export interface IGetTimeSeriesParams {
	/**
	 * The asset id for an asset
	 */
	assetId: string;

	/**
	 * The name of the aspect
	 */
	propertySetName: string;
}

export interface IGetTimeSeriesItemsParams {
    /**
     * The asset id for an asset
     */
    assetId: string;
}

export interface IGetFacilitiesParams {
	/**
	 * The asset id for an asset (facility)
	 */
	assetId: string;
}
