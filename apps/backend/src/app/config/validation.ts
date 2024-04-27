import { validateSync } from "class-validator";
import { plainToClass } from "class-transformer";

/* classes */
import { EnvironmentVariables } from "./classes/environment.class";

/* Interfaces */
import { IEnvironmentVariables } from "./interfaces/environment.interface";


/**
 * Validate the configuration
 */
export const validateConfig = (config: IEnvironmentVariables) => {

  /**
   * Extract config and assign default values
   */
  const defaultConfig: IEnvironmentVariables = 
    {
      ...config,
        APP_PORT: config.APP_PORT || 3000,
        APP_HOST: config.APP_HOST || 'localhost',
    }

    const validatedConfig = plainToClass(
        EnvironmentVariables,
        defaultConfig,
        { enableImplicitConversion: true },
      );

      const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    
      if (errors.length > 0) {
        throw new Error(errors.toString());
      }

      return validatedConfig;
};