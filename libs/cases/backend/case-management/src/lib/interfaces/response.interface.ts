// TODO: Add User model
export interface ICaseResponse {
	id: number;
	handle: string;
	dueDate: Date;
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
