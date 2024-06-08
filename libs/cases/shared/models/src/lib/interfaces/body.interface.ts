import { CasePriority, CaseStatus, CaseType } from '@prisma/client';

/* Interface for creating a new case body */
export interface ICreateCaseBody {
	/* Unique identifier of the work order */
	handle: string;
	/* Deadline for the work order */
	dueDate: Date;
	/* Title of the work order */
	title: string;
	/* Type of the work order */
	type: CaseType;
	/* Status of the work order */
	status: CaseStatus;
	// assignedTo: User,
	// assignedToId: Int,
	/* Description of the work order */
	description: string;
	/* Source of the work order */
	source: string;
	/* Priority of the work order (create ENUM) */
	priority: CasePriority;
	/* Author mail of the work order */
	createdBy: string;
	/* Identifier of the work order */
	eTag: string;
}

/* Interface for updating an existing case body */
export interface IUpdateCaseBody {
	/* Unique identifier of the work order */
	handle?: string;
	/* Deadline for the work order */
	dueDate?: Date;
	/* Title of the work order */
	title?: string;
	/* Type of the work order */
	type?: CaseType;
	/* Status of the work order */
	status?: CaseStatus;
	// assignedTo: User,
	// assignedToId: Int,
	/* Description of the work order */
	description?: string;
	/* Source of the work order */
	source?: string;
	/* Priority of the work order */
	priority?: CasePriority;
	/* Identifier of the work order */
	eTag?: string;
	/* Author of any changes to the work order */
	modifiedBy?: string;
}
