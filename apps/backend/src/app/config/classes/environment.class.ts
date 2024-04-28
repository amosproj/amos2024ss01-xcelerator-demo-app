import { IsDefined, IsNumber, IsString, MinLength } from 'class-validator';

/* Interfaces */
import { IEnvironmentVariables } from '../interfaces/environment.interface';

/**
 * Environment variables
 */
export class EnvironmentVariables implements IEnvironmentVariables {
	/* APP */
	@IsDefined()
	@IsNumber()
	APP_PORT: number;

	@IsDefined()
	@IsString()
	@MinLength(1)
	APP_HOST: string;

	@IsDefined()
	@IsString()
	@MinLength(1)
	APP_NAME: string;

	/* DATABASE */
	@IsDefined()
	@IsString()
	@MinLength(1)
	POSTGRES_HOST: string;

	@IsDefined()
	@IsNumber()
	POSTGRES_PORT: number;

	@IsDefined()
	@IsString()
	@MinLength(1)
	POSTGRES_USER: string;

	@IsDefined()
	@IsString()
	@MinLength(1)
	POSTGRES_PASSWORD: string;
}
