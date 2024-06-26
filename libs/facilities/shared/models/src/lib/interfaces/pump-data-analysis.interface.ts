import { EPumpIndicatorMessage } from '../enums/pump-indicator-message.enum';
import { EPumpStatus } from '../enums/pump-status.enum';
import { IPumpMetrics } from './pump-metrics.interface';

export interface IPumpDataAnalysis {
    /**
     * The status of the pump
     */
    status: EPumpStatus;

    /**
     * The reason for the status
     */
    indicatorMsg: EPumpIndicatorMessage;

    /**
     * The statistical report of the pump data
     */
    metrics: IPumpMetrics[];
}
