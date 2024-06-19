import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

/* Interfaces */
import { IAppConfig } from '../interfaces/app.interface';
import { IBackendConfig } from '../interfaces/config.interface';
import { IDatabaseConfig } from '../interfaces/database.interface';
import { IInsightHub } from '../interfaces/insight-hub.interface';
import { ISwagger } from '../interfaces/swagger.interface';
/* Classes */
import { AppConfig } from './app.class';
import { DatabaseConfig } from './database.class';
import { InsightHub } from './insight-hub.class';
import { Swagger } from './swagger.class';

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

	/**
	 * The Insight configuration
	 * @type {IInsightHub}
	 */
	@ValidateNested()
	@Type(() => InsightHub)
	insightHub: IInsightHub;

	/**
	 * The Swagger configuration
	 * @type {ISwagger}
	 */
	@ValidateNested()
	@Type(() => Swagger)
	swagger: ISwagger;
}
