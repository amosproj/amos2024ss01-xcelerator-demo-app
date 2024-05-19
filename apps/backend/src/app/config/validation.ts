import { Logger } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
/* Interfaces */
import { BackendConfig } from 'common-backend-models';

/* classes */
import { EnvironmentVariables } from './classes/environment.class';
import { IEnvironmentVariables } from './interfaces/environment.interface';

/**
 * Validate the configuration
 */
export const validateConfig = (config: IEnvironmentVariables): BackendConfig => {
	/**
	 * Validate the environment variables
	 */
	const validatedEnv = plainToClass(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedEnv, {
		skipMissingProperties: false,
	});

	errors.length && Logger.error(`Config validation error: ${errors}`, 'ConfigValidation');

	const configWithDefaults = generateConfig(validatedEnv);

	/**
	 * Return the validated configuration
	 */
	return configWithDefaults;
};

const generateConfig = (config: IEnvironmentVariables): BackendConfig =>
	plainToInstance(BackendConfig, {
		app: {
			port: config.BACKEND_PORT || 3333,
			host: config.BACKEND_HOST || 'localhost',
			name: config.BACKEND_NAME || 'backend',
		},
		database: {
			host: config.POSTGRES_HOST,
			port: config.POSTGRES_PORT,
			user: config.POSTGRES_USER,
			password: config.POSTGRES_PASSWORD,
		},
		insightHub: {
			apiUrl: config.INSIGHT_HUB_API_URL,
			apiKey: config.INSIGHT_HUB_API_KEY,
		},
	} as BackendConfig);
