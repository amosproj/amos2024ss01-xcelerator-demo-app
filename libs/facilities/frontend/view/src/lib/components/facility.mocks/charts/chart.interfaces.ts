export interface IChart {
    title: string;
    names: string[];
    colors: string[];
    data: Array<Array<[string, number]>>,
}

export interface IPumpDataItem {
    'MotorCurrent': number,
    'PressureOut': number,
    'StuffingBoxTemperature': number,
    'PressureIn': number,
    'Flow': number,
    '_time': string,
}

export interface IEnvDataItem {
    'Pressure_qc': number,
    'Temperature': number,
    'Temperature_qc': number,
    'Humidity_qc': number,
    'Humidity': number,
    'Pressure': number,
    '_time': string,
}

