import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

/* Interfaces */
import { IAppConfig } from '../interfaces/app.interface';
import { IBackendConfig } from '../interfaces/config.interface';
import { IDatabaseConfig } from '../interfaces/database.interface';

/* Classes */
import { AppConfig } from './app.class';
import { DatabaseConfig } from './database.class';

/**
 * The Backend configuration class
 */
export class BackendConfig implements IBackendConfig {
	/**
	 * The app configuration
	 * @type {IAppConfig}
	 */
	@ValidateNested()
	@Type(() => AppConfig)
	app: IAppConfig;

	/**
	 * The database configuration
	 * @type {IDatabaseConfig}
	 */
	@ValidateNested()
	@Type(() => DatabaseConfig)
	database: IDatabaseConfig;
}
