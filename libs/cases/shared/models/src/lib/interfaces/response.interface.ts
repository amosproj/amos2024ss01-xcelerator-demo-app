import { ECasePriority, ECaseStatus, ECaseType } from '../enums';

// TODO: Add User model
export interface ICaseResponse {
	id: number;
	handle: string;
	dueDate: Date;
	title: string;
	type: ECaseType;
	status: ECaseStatus;
	// assignedTo: User,
	// assignedToId: Int,
	description: string;
	source: string;
	priority: ECasePriority;
	createdBy: string;
	createdAt: Date;
	eTag: string;
	modifiedBy: string;
	updatedAt: Date;
	overdue: boolean;
	assetId: string;
}
