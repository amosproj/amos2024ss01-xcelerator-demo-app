export interface params {
	entityId: string;
	propertySetName: string;
	from?: Date;
	to?: Date;
	limit?: number;
	select?: string[];
	sort: 'asc' | 'desc';
	latestValue: boolean;
}
