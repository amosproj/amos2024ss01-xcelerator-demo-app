/**
 * The interface for the frontend app environment
 */
export interface IAppEnvironment {
	/**
	 * The production flag
	 */
	production: boolean;

	/**
	 * The url of the main api of the frontend application
	 */
	apiUrl: string;
}
