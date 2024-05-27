import { ICaseMock } from './case.interface';

/**
 *  This is just a Mock Interface for the Facility Component
 *  It has to be deleted once the actual implementation is done
 * */

export const cases: ICaseMock[] = [
	{
		//Push Card
		//id: 'AA-000',
		facilityId: 1,
		icon: 'battery-empty',
		notification: '99+',
		//heading: 'Fix the Aquarium Pump',
		//subheading: 'The pump in the aquarium is not working properly',
		//variant: 'warning',

		//Case
		handle: 'AA-000',
		dueDate: '2023-08-10T03:52:14.301Z',
		notifyAssignee: false,
		title: 'test WOM 1',
		type: 'warning',
		status: '0',
		assignedTo: 'Mike Jefferson von Schmitz man',
		description:
			'this case is for changing and cleaning the floppy disks for the nuclear launch codes',
		source: 'AHM',
		priority: '0',
		createdBy: 'test@test.com',
		createdDate: '2023-08-10T03:52:14.301Z',
		eTag: '1702540787672',
		modifiedBy: 'test@test.com',
		modifiedDate: '2023-08-10T03:52:14.301Z',
		overdue: true,
	},
	{
		//Push Card
		//id: 'AA-001',
		facilityId: 1,
		icon: 'battery-empty',
		notification: '99+',
		//heading: 'Fix the Aquarium Pump',
		//subheading: 'The pump in the aquarium is not working properly',
		//variant: 'warning',

		//Case
		handle: 'AA-001',
		dueDate: '2023-08-10T03:52:14.301Z',
		notifyAssignee: false,
		title: 'test WOM 1',
		type: 'warning',
		status: '0',
		assignedTo: 'No One',
		description: 'test wom',
		source: 'AHM',
		priority: '0',
		createdBy: 'test@test.com',
		createdDate: '2023-08-10T03:52:14.301Z',
		eTag: '1702540787672',
		modifiedBy: 'test@test.com',
		modifiedDate: '2023-08-10T03:52:14.301Z',
		overdue: true,
	},
];
