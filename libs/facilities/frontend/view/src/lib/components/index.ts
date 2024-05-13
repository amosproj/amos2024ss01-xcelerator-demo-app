export * from './browse';
export * from './issues';
export * from './detail';

export interface Facility {
	icon: string;
	notification: string;
	heading: string;
	subheading: string;
	variant: string;
}

export const facilities: Facility[] = [
	{
		icon: 'battery-empty',
		notification: '99+',
		heading: 'totally legal waste disposal',
		subheading: 'No shady business.com',
		variant: 'success',
	},
	{
		icon: 'water-fish',
		notification: '3',
		heading: 'Water Tank - FAU Erlangen',
		subheading: 'Large Aquarium in CS Department building',
		variant: 'critical',
	},
	{
		icon: 'water-plant',
		notification: '20',
		heading: 'Water Tank - TU Berlin',
		subheading: 'Submarine testing facility',
		variant: 'warning',
	},
	{
		icon: 'truck',
		notification: '3',
		heading: 'Water Tank - Waste Water Processing',
		subheading: 'Waste water processing in Mosville',
		variant: 'success',
	},
];
