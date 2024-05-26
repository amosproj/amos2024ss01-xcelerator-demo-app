/* Interfaces */
import { IAppConfig } from './app.interface';
import { IDatabaseConfig } from './database.interface';
import { IInsightHub } from './insight-hub.interface';

/**
 * The backend configuration interface
 */
export interface IBackendConfig {
	/**
	 * The app configuration
	 * @type {IAppConfig}
	 */
	app: IAppConfig;

	/**
	 * The database configuration
	 * @type {IDatabaseConfig}
	 */
	database: IDatabaseConfig;

	/**
	 * The Insight configuration
	 * @type {IInsightHub}
	 */
	insightHub: IInsightHub;
}
