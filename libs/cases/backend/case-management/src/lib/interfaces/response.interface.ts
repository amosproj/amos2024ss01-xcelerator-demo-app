import { CasePriority, CaseStatus, CaseType } from '@prisma/client';

// TODO: Add User model
export interface ICaseResponse {
	id: number;
	handle: string;
	dueDate: Date;
	title: string;
	type: CaseType;
	status: CaseStatus;
	// assignedTo: User,
	// assignedToId: Int,
	description: string;
	source: string;
	priority: CasePriority;
	createdBy: string;
	createdAt: Date;
	eTag: string;
	modifiedBy: string;
	updatedAt: Date;
	overdue?: boolean;
}
