import { Prisma, PrismaClient } from '@prisma/client';
import caseData from './demo_data/CASE-EXAMPLE.json';
import pump2envData from './demo_data/PUMP-002_Environment_20240422-220000000_20240423-220000000.json';
import pump2pumpData from './demo_data/PUMP-002_PumpData_20240422-220000000_20240423-220000000.json';

import pump10envData from './demo_data/PUMP-010_Environment_20240422-220000000_20240423-220000000.json';
import pump10pumpData from './demo_data/PUMP-010_PumpData_20240422-220000000_20240423-220000000.json';

const prisma = new PrismaClient();

const facilityNames = [
	{ name: 'Facility 1', assetId: 'Facility1', description: 'This is facility 1', typeId: 'pump' },
	{ name: 'Facility 2', assetId: 'Facility2', description: 'This is facility 2', typeId: 'pump' },
	{ name: 'Facility 3', assetId: 'Facility3', description: 'This is facility 3', typeId: 'pump' },
	{ name: 'Facility 4', assetId: 'Facility4', description: 'This is facility 4', typeId: 'pump' },
	{ name: 'Facility 5', assetId: 'Facility5', description: 'This is facility 5', typeId: 'pump' },
	{ name: 'Facility 6', assetId: 'Facility6', description: 'This is facility 6', typeId: 'pump' },
	{ name: 'Facility 7', assetId: 'Facility7', description: 'This is facility 7', typeId: 'pump' },
	{ name: 'Facility 8', assetId: 'Facility8', description: 'This is facility 8', typeId: 'pump' },
	{ name: 'Facility 9', assetId: 'Facility9', description: 'This is facility 9', typeId: 'pump' },
];

async function seedSingleFacility({
	name,
	assetId,
	description,
	typeId,
	index,
}: {
	name: string;
	assetId: string;
	description: string;
	typeId: string;
	index: number;
}) {
	const pumpData = index % 2 === 0 ? pump2pumpData : pump10pumpData;
	const envData = index % 2 === 0 ? pump2envData : pump10envData;

	const asset = await prisma.asset.create({
		data: {
			assetId,
			name,
			typeId,
			description,
			location: {
				create: {
					latitude: 0,
					longitude: 0,
				},
			},
			variables: {},
		},
	});

	const tsItemPumpData = await prisma.timeSeriesItem.create({
		data: {
			assetId: asset.assetId,
			propertySetName: 'PumpData',
			variables: [
				{
					name: 'Flow',
					unit: 'l/s',
				},
				{
					name: 'MotorCurrent',
					unit: 'V',
				},
				{
					name: 'PressureIn',
					unit: 'hPa',
				},
				{
					name: 'PressureOut',
					unit: 'hPa',
				},
				{
					name: 'StuffingBoxTemperature',
					unit: '°C',
				},
			],
		},
	});

	const newPumpData = pumpData.map((data: any) => {
		return {
			time: new Date(data._time),

			timeSeriesItemAssetId: tsItemPumpData.assetId,
			timeSeriesItemPropertySetName: tsItemPumpData.propertySetName,

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
			assetId: asset.assetId,
			propertySetName: 'Environment',
			variables: [
				{
					name: 'Humidity',
					unit: '%',
				},
				{
					name: 'Pressure',
					unit: 'kPa',
				},
				{
					name: 'Temperature',
					unit: '°C',
				},
			],
		},
	});

	const newEnvData = envData.map((data: any) => {
		return {
			time: new Date(data._time),

			timeSeriesItemAssetId: asset.assetId,
			timeSeriesItemPropertySetName: tSItemEnv.propertySetName,

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
			assetAssetId: asset.assetId,
		};
	});

	// Seed database with case data
	await prisma.case.createMany({
		data: newCaseData,
	});
}

async function main() {
	// Seed database with facility data
	for (let i = 0; i < facilityNames.length; i++) {
		await seedSingleFacility({ ...facilityNames[i], index: i });
	}
}

main().catch((e) => {
	console.error(e);

	process.exit(1);
});
