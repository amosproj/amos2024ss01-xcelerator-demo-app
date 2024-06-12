import { IChart, IEnvDataItem, IPumpDataItem } from './chart.interfaces';
import { envData } from './envData';
import { pumpData } from './pumpData';

/**
 * The function processPumpData processes pump data to be used in the chart.
 * Each data item (IPumpDataItem) has measurements (MotorCurrent, PressureOut, etc.) and a timestamp (_time).
 * The function creates an array of tuples for each measurement type.
 * Each tuple consists of the timestamp and the measurement value.
 * The result is an array of these arrays - one for each measurement type.
 *
 * @param {Array<IPumpDataItem>} data - An array of pump data items.
 * @returns {Array<Array<[string, number]>>} - An array of arrays. Each inner array represents a measurement type.
 */
export function processPumpData(data: Array<IPumpDataItem>): Array<Array<[string, number]>> {
    const MotorCurrent = data.map((d) => [ d._time, d.MotorCurrent ]);
    const PressureOut= data.map((d) => [ d._time, d.PressureOut ]);
    const StuffingBoxTemperature = data.map((d) => [ d._time, d.StuffingBoxTemperature ]);
    const PressureIn= data.map((d) => [ d._time, d.PressureIn ]);
    const Flow = data.map((d) => [ d._time, d.Flow ]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return [ Flow, MotorCurrent, StuffingBoxTemperature, PressureIn, PressureOut ];
}

/**
 * similar to the processPumpData function just for IEnvDataItem
 */
const processEnvData = (data: Array<IEnvDataItem>): Array<Array<[string, number]>> => {
    const Temperature = data.map((d) => [ d._time, d.Temperature ]);
    const Humidity = data.map((d) => [ d._time, d.Humidity ]);
    const Pressure = data.map((d) => [ d._time, d.Pressure ]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return [ Temperature, Humidity, Pressure ];
}

/**
 * export the charts, so they can be used in the detail page
 * **/

export const pumpChart : IChart = {
    title: 'Pump Data',
    names: [ 'Flow (l/s)', 'MotorCurrent (V)', 'StuffingBoxTemperature (°C)', 'PressureIn (hPa)', 'PressureOut (hPa)' ],
    colors: [ '#bd11bd', '#1E90FF', '#3CB371', '#40E0D0',  '#FFD700' ],
    data: processPumpData(pumpData),
}

export const envChart: IChart = {
    title: 'Environment Data',
    names: [ 'Temperature (°C)', 'Humidity (%)', 'Pressure (kPa)' ],
    colors: [ '#ffbf00', '#00FF00', '#00ffd9' ],
    data: processEnvData(envData),
}

