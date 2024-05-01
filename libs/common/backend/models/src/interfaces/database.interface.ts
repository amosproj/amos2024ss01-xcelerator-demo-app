/**
 * The database configuration interface
 */
export interface IDatabaseConfig {
	/**
	 * The host of the database
	 * @type {string}
	 */
	host: string;
	/**
	 * The port of the database
	 * @type {number}
	 */
	port: number;

	/**
	 * The user of the database
	 * @type {string}
	 */
	user: string;

	/**
	 * The password of the database
	 * @type {string}
	 */
	password: string;
}
