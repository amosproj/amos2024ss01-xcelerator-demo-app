/**
 *  This is just a Mock Interface for the Case Component
 *  It has to be deleted once the actual implementation is done
 * */

export interface ICaseMock {
	//Push-Card
	//id: string;
	facilityId: number;
	icon: string;
	notification: string;
	//heading: string;
	//subheading: string;
	//variant: string;

	//Case
	handle: string;
	dueDate: string;
	notifyAssignee: boolean;
	title: string;
	type: string;
	status: string;
	assignedTo: string;
	description: string;
	source: string;
	priority: string;
	createdBy: string;
	createdDate: string;
	eTag: string;
	modifiedBy: string;
	modifiedDate: string;
	overdue: true;
}
