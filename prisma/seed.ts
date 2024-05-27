import { Prisma, PrismaClient } from '@prisma/client';
import envData from './demo_data/PUMP-002_Environment_20240422-220000000_20240423-220000000.json';
import pumpData from './demo_data/PUMP-002_PumpData_20240422-220000000_20240423-220000000.json';

const prisma = new PrismaClient();

async function main() {
	const tsItemPumpData = await prisma.timeSeriesItem.create({
		data: {
			entityId: 'Pump002',
			propertySetName: 'PumpData',
		},
	});

	const newPumpData = pumpData.map((data: any) => {
		return {
			time: data._time,

			timeSeriesItementityId: tsItemPumpData.entityId,
			timeSeriesItempropertySetName: tsItemPumpData.propertySetName,

			data: {
				motorCurrent: data.MotorCurrent,
				pressureOut: data.PressureOut,
				stuffingBoxTemperature: data.StuffingBoxTemperature,
				pressureIn: data.PressureIn,
				flow: data.Flow,
			} as Prisma.JsonObject,
		};
	});

	const tSItemEnv = await prisma.timeSeriesItem.create({
		data: {
			entityId: 'Pump002',
			propertySetName: 'Environment',
		},
	});

	const newEnvData = envData.map((data: any) => {
		return {
			time: data._time,

			timeSeriesItementityId: tSItemEnv.entityId,
			timeSeriesItempropertySetName: tSItemEnv.propertySetName,

			data: {
				pressureQc: data.Pressure_qc,
				temperature: data.Temperature,
				temperatureQc: data.Temperature_qc,
				humidityQc: data.Humidity_qc,
				humidity: data.Humidity,
				pressure: data.Pressure,
			} as Prisma.JsonObject,
		};
	});

	await prisma.timeSeriesDataItem.createMany({
		data: [newPumpData, newEnvData].flat(),
	});
}

main()
	.catch((e) => {
		console.error(e);

		process.exit(1);
	})

	.finally(async () => {
		await prisma.$disconnect();
	});
