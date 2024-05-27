import caseData from './demo_data/CASE-EXAMPLE.json';

async function main() {
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
			createdDate: data.createdDate,
			createdBy: data.createdBy,
			eTag: data.eTag,
			modifiedBy: data.modifiedBy,
			modifiedDate: data.modifiedDate,
			overdue: data.overdue,
		};
	});

	console.log(newCaseData[0].dueDate);
}

main().catch((e) => {
	console.error(e);

	process.exit(1);
});
