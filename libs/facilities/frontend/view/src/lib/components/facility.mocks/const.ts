import { IFacilityMock } from './facility.interface';
import { FACILITY_VARIANT } from './facility.variant';

/**
 *  This is just a Mock Interface for the Facility Component
 *  It has to be deleted once the actual implementation is done
 * */
export const facilities: IFacilityMock[] = [
	{
		id: '1',
		icon: 'battery-empty',
		notification: '99+',
		heading: 'totally legal waste disposal',
		subheading: 'No shady business.com',
		variant: FACILITY_VARIANT.SUCCESS,
		pumps: 99,
		location: 'Ethical Valley',
	},
	{
		id: '2',
		icon: 'water-fish',
		notification: '3',
		heading: 'Water Tank - FAU Erlangen',
		subheading: 'Large Aquarium in CS Department building',
		variant: FACILITY_VARIANT.CRITICAL,
		pumps: 38,
		location: 'Erlangen',
	},
	{
		id: '3',
		icon: 'water-plant',
		notification: '20',
		heading: 'Water Tank - TU Berlin',
		subheading: 'Submarine testing facility',
		variant: FACILITY_VARIANT.WARNING,
		pumps: 14,
		location: 'Berlin',
	},
	{
		id: '4',
		icon: 'truck',
		notification: '3',
		heading: 'Water Tank - Waste Water Processing',
		subheading: 'Waste water processing in Mosville',
		variant: FACILITY_VARIANT.SUCCESS,
		pumps: 93,
		location: 'Mosville',
	},
];
