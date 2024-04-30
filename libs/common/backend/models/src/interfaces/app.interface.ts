/**
 * The App configuration interface
 */
export interface IAppConfig {
	/**
	 * The port the application will run on
	 * @type {number}
	 */
	port: number;

	/**
	 * The host the application will run on
	 * @type {string}
	 */
	host: string;

	/**
	 * The name of the application
	 * @type {string}
	 */
	name: string;
}
