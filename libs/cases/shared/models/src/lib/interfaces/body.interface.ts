
/* Interface for creating a new case body */
import { ECasePriority, ECaseStatus, ECaseType } from '../enums';

export interface ICreateCaseBody {
	/* Unique identifier of the work order */
	handle: string;
	/* Deadline for the work order */
	dueDate: Date;
	/* Title of the work order */
	title: string;
	/* Type of the work order */
	type: ECaseType;
	/* Status of the work order */
	status: ECaseStatus;
	// assignedTo: User,
	// assignedToId: Int,
	/* Description of the work order */
	description: string;
	/* Source of the work order */
	source: string;
	/* Priority of the work order (create ENUM) */
	priority: ECasePriority;
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
	type?: ECaseType;
	/* Status of the work order */
	status?: ECaseStatus;
	/* Description of the work order */
	description?: string;
	/* Source of the work order */
	source?: string;
	/* Priority of the work order */
	priority?: ECasePriority;
	/* Identifier of the work order */
	eTag?: string;
	/* Author of any changes to the work order */
	modifiedBy?: string;
}
