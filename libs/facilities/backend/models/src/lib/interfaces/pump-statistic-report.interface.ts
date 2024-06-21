import { IStatisticalReport } from './statistical-report.interface';

/**
 * Interface for pump statistic report
 */
export interface IPumpStatisticReport {
	MotorCurrent?: IStatisticalReport;
	PressureOut?: IStatisticalReport;
	StuffingBoxTemperature?: IStatisticalReport;
	PressureIn?: IStatisticalReport;
	Flow?: IStatisticalReport;
}
