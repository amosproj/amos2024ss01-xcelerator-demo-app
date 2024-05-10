import { PrismaClient } from '@prisma/client';
import envData from './demo_data/PUMP-002_Environment_20240422-220000000_20240423-220000000.json';
import pumpData from './demo_data/PUMP-002_PumpData_20240422-220000000_20240423-220000000.json';

const prisma = new PrismaClient();

async function main() {
	const newPump = await prisma.pump.upsert({
		create: {
			name: 'PUMP-002',
		},
		update: {},
		where: {
			name: 'PUMP-002',
		},
	});

	const newEnvData = envData.map((data: any) => {
		return {
			pressureQc: data.Pressure_qc,
			temperature: data.Temperature,
			temperatureQc: data.Temperature_qc,
			humidityQc: data.Humidity_qc,
			humidity: data.Humidity,
			pressure: data.Pressure,
			time: data._time,
			pumpId: newPump.id,
		};
	});

	const newPumpData = pumpData.map((data: any) => {
		return {
			motorCurrent: data.MotorCurrent,
			pressureOut: data.PressureOut,
			stuffingBoxTemperature: data.StuffingBoxTemperature,
			pressureIn: data.PressureIn,
			flow: data.Flow,
			time: data._time,
			pumpId: newPump.id,
		};
	});
	await prisma.data.createMany({
		data: newPumpData,
	});

	await prisma.environment.createMany({
		data: newEnvData,
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
