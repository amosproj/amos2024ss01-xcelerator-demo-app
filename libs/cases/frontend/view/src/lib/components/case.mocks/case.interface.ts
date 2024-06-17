/**
 *  This is just a Mock Interface for the Case Component
 *  It has to be deleted once the actual implementation is done
 * */

export interface ICaseMock {
	//Push-Card
	//id: string;
	//facilityId: number;
	//icon: string;
	//notification: string;
	//heading: string;
	//subheading: string;
	//variant: string;

	//Case
	handle: string;
	dueDate: string;
	notifyAssignee: boolean;
	title: string;
	type: TypeEnum;
	status: StatusEnum;
	assignedTo: string;
	description: string;
	source: string;
	priority: PriorityEnum;
	createdBy: string;
	createdDate: number;
	eTag: string;
	modifiedBy: string;
	modifiedDate: number;
	overdue: boolean;
}

export enum PriorityEnum {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    EMERGENCY = 'EMERGENCY',

}

export enum StatusEnum {
    OPEN = 'OPEN',
    INPROGRESS = 'INPROGRESS',
    ONHOLD = 'ONHOLD',
    DONE = 'DONE',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED',
    ARCHIVED = 'ARCHIVED',
}

export enum TypeEnum {
    PLANNED = 'PLANNED',
    INCIDENT = 'INCIDENT',
    ANNOTATION = 'ANNOTATION',
}

