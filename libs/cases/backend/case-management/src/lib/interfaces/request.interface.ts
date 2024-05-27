export interface ICaseRequest {
	id: number;
	handle: string;
	dueDate: string;
	title: string;
	type: string;
	status: string;
	// assignedTo: User,
	// assignedToId: Int,
	description: string;
	source: string;
	priority: string;
	createdBy: string;
	createdDate: Date;
	eTag: string;
	modifiedBy: string;
	modifiedDate: Date;
	overdue: boolean;
}
