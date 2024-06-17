const host = 'http://localhost:3333';

async function main() {
	const result = await fetch(`${host}/api/facilities/seed`)
		.then((response) => response.json())
		.catch(() => {
			throw new Error(`The Script failed - make sure that the server is running on: ${host}`);
		});

	console.log(`success`);
	console.log(`The server is running on: ${host}`);

	console.log(
		'You can now get all facilities by running: curl http://localhost:3333/api/facilities',
	);
	console.log(
		'you can get a specific facility by running: curl http://localhost:3333/api/facilities/{assetId}',
	);
	console.log(
		'You can get all time series data by running: curl http://localhost:3333/api/timeseries',
	);
	console.log(
		'You can get all propertySetNames of an item by running: curl http://localhost:3333/api/timeseries/{assetId}',
	);
	console.log(
		'You can get a specific time series data by running: curl http://localhost:3333/api/timeseries/{assetId}/{propertySetName}',
	);
}

main();
