import { IsDefined, IsNumber, IsString, MinLength } from 'class-validator';

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
	APP_PORT: number;

	/**
	 * Application host for the backend
	 *
	 * @example 'localhost'
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	APP_HOST: string;

	/**
	 * Application name for the backend
	 *
	 * @example 'backend'
	 */
	@IsDefined()
	@IsString()
	@MinLength(1)
	APP_NAME: string;

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
}
