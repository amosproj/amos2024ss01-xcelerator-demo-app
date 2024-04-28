import { IsNumber, IsString } from 'class-validator';

/* Interfaces */
import { IAppConfig } from '../interfaces/app.interface';

/**
 * The backend application configuration class
 */
export class AppConfig implements IAppConfig {
  /**
   * The port number that the application should listen on.
   * @type {number}
   */
  @IsNumber()
  port: number;

  /**
   * The host address that the application should use.
   * @type {string}
   */
  @IsString()
  host: string;

  /**
   * The name of the application.
   * @type {string}
   */
  @IsString()
  name: string;
}
