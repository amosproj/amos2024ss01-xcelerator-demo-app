import { Prisma, PrismaClient } from '@prisma/client';
import caseData from './demo_data/CASE-EXAMPLE.json';
import envData from './demo_data/PUMP-002_Environment_20240422-220000000_20240423-220000000.json';
import pumpData from './demo_data/PUMP-002_PumpData_20240422-220000000_20240423-220000000.json';

const prisma = new PrismaClient();

const seedFacilities = [
	'Pump001',
	'Pump002',
	'Pump003',
	'Pump004',
	'Pump005',
	'Pump006',
	'Pump007',
	'Pump008',
	'Pump009',
	'Pump010',
];

async function main() {
	const asset = await prisma.asset.create({
		data: {
			name: 'Pump002',
			typeId: 'Pump',
			description: 'Pump 002',
		},
	});

	const tsItemPumpData = await prisma.timeSeriesItem.create({
		data: {
			entityId: 'Pump002',
			propertySetName: 'PumpData',

			assetId: asset.id,
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

			assetId: asset.id,
		},
	});

	const newEnvData = envData.map((data: any) => {
		return {
			time: data._time,

			timeSeriesItementityId: tSItemEnv.entityId,
			timeSeriesItempropertySetName: tSItemEnv.propertySetName,

		const tSItemEnv = await prisma.timeSeriesItem.create({
			data: {
				entityId: facility,
				propertySetName: 'Environment',
			},
		});

		const newPumpData = pumpData.map((data: any) => {
			return {
				time: data._time as Date,

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

		const newEnvData = envData.map((data: any) => {
			return {
				time: data._time as Date,

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

		// Seed database with timeseries data
		await prisma.timeSeriesDataItem.createMany({
			data: [newPumpData, newEnvData].flat(),
		});
	}

	// create new case data from JSON file
	const newCaseData = caseData.map((data: any) => {
		return {
			handle: data.handle,
			dueDate: new Date(data.dueDate), // See https://stackoverflow.com/a/52823241
			title: data.title,
			type: data.type,
			status: data.status,
			description: data.description,
			source: data.source,
			priority: data.priority,
			createdBy: data.createdBy,
			eTag: data.eTag,
		};
	});

	// Seed database with case data
	await prisma.case.createMany({
		data: newCaseData,
	});
}

main().catch((e) => {
	console.error(e);

	process.exit(1);
});
