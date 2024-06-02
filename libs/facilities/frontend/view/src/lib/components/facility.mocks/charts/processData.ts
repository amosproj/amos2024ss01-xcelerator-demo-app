/**
 *  processes pump/env Data to be used in charts
 *  @param {Array} data - the data to be processed, f.e. pumpData/envData
 *  @output {Array} - the processed data as an array of elements like this:
 *      [[time, value], time,value], ...]
 *      so each element is an array of tuples [time, value]
 */
import { envData } from './envData';
import { pumpData } from './pumpData';

export function processPumpData(data: any[]) {
    // for every variable
    const MotorCurrent = data.map((d) => [ d._time, d.MotorCurrent ]);
    const PressureOut = data.map((d) => [ d._time, d.PressureOut ]);
    const StuffingBoxTemperature = data.map((d) => [ d._time, d.StuffingBoxTemperature ]);
    const PressureIn = data.map((d) => [ d._time, d.PressureIn ]);
    const Flow = data.map((d) => [ d._time, d.Flow ]);
    return [ MotorCurrent, PressureOut, StuffingBoxTemperature, PressureIn, Flow ];
}

export const processEnvData = (data: any[]) => {
    const Temperature = data.map((d) => [ d._time, d.Temperature ]);
    const Humidity = data.map((d) => [ d._time, d.Humidity ]);
    const Pressure = data.map((d) => [ d._time, d.Pressure ]);
    return [ Temperature, Humidity, Pressure ];
}

/**
 * export data that looks exactly like we need it
 * **/

export const pumpChart = {
    title: 'Pump Data',
    names: [ 'MotorCurrent', 'PressureOut', 'StuffingBoxTemperature', 'PressureIn', 'Flow' ],
    colors: [ '#1E90FF', '#3CB371', '#40E0D0', '#bd11bd', '#FFD700' ], //
    data: processPumpData(pumpData),
}

export const envChart = {
    title: 'Environment Data',
    names: [ 'Temperature', 'Humidity', 'Pressure' ],
    colors: [ '#ffbf00', '#00FF00', '#00ffd9' ],
    data: processEnvData(envData),
}

