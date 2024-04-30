import { IsNumber, IsString } from 'class-validator';

/* Interfaces */
import { IDatabaseConfig } from '../interfaces/database.interface';

/**
 * The Database configuration class
 */
export class DatabaseConfig implements IDatabaseConfig {
	/**
	 * The host of the database
	 * @type {string}
	 */
	@IsString()
	host: string;

	/**
	 * The port of the database
	 * @type {number}
	 */
	@IsNumber()
	port: number;

	/**
	 * The user of the database
	 * @type {string}
	 */
	@IsString()
	user: string;

	/**
	 * The password of the database
	 * @type {string}
	 */
	@IsString()
	password: string;
}
