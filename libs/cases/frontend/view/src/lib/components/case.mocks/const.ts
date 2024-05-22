import { ICaseMock } from './case.interface';

/**
 *  This is just a Mock Interface for the Facility Component
 *  It has to be deleted once the actual implementation is done
 * */
export const cases: ICaseMock[] = [
	{
		id: '1',
		facilityId: 1,
		icon: 'battery-empty',
		notification: '99+',
		heading: 'Fix the Aquarium Pump',
		subheading: 'The pump in the aquarium is not working properly',
		variant: 'warning',
	},
	{
		facilityId: 2,
		id: '2',
		icon: 'water-fish',
		notification: '3',
		heading: 'Leaking Water Tank',
		subheading: 'The water tank in the CS Department building is leaking',
		variant: 'critical',
	},
];
