import { EPumpStatus } from '../enums/pump-status.enum';

/**
 * Interface for the Pump Time Series Report
 */
export interface ITimeSeriesPumpReport {
	MotorCurrent: number;
	PressureOut: number;
	StuffingBoxTemperature: number;
	PressureIn: number;
	Flow: number;
	status: EPumpStatus;
	time: string;
}
