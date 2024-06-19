import { IsDefined, IsNumber, IsString, IsUrl, MinLength } from 'class-validator';

/* Interfaces */
import { IEnvironmentVariables } from '../interfaces/environment.interface';

/**
 * Environment variables
 */
export class EnvironmentVariables implements IEnvironmentVariables {
	/* APP */

	/**
	 * Application port for the backend
	 *
	 * @example 3000
	 */
	@IsDefined()
	@IsNumber()
	BACKEND_PORT?: number;

	/**
	 * Application host for the backend
	 *
	 * @example 'localhost'
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	BACKEND_HOST?: string;

	/**
	 * Application name for the backend
	 *
	 * @example 'backend'
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	BACKEND_NAME?: string;

	/* DATABASE */

	/**
	 * Postgres database host name
	 *
	 * @example 'localhost'
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	POSTGRES_HOST: string;

	/**
	 * Postgres database port
	 *
	 * @example 5432
	 */
	@IsDefined()
	@IsNumber()
	POSTGRES_PORT: number;

	/**
	 * Postgres database user name
	 *
	 * @example 'user'
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	POSTGRES_USER: string;

	/**
	 * Postgres passowrd for the user
	 *
	 * @example 'password'
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	POSTGRES_PASSWORD: string;

	/**
	 * The URL of the API to use for the IotTimeSeriesService
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	INSIGHT_HUB_API_URL?: string;

	/**
	 * The API key to use for the IotTimeSeriesService
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	INSIGHT_HUB_API_KEY?: string;

    /**
     * The URL of the Swagger UI
     */
    @IsDefined()
    @IsString()
    SWAGGER_URL_PATH: string;
}
