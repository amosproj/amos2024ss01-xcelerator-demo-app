export interface Facility {
	id: string;
	icon: string;
	notification: string;
	heading: string;
	subheading: string;
	variant: string;
	pumps: number;
	location: string;
}

export const facilities: Facility[] = [
	{
		id: '1',
		icon: 'battery-empty',
		notification: '99+',
		heading: 'totally legal waste disposal',
		subheading: 'No shady business.com',
		variant: 'success',
		pumps: 99,
		location: 'Ethical Valley',
	},
	{
		id: '2',
		icon: 'water-fish',
		notification: '3',
		heading: 'Water Tank - FAU Erlangen',
		subheading: 'Large Aquarium in CS Department building',
		variant: 'critical',
		pumps: 38,
		location: 'Erlangen',
	},
	{
		id: '3',
		icon: 'water-plant',
		notification: '20',
		heading: 'Water Tank - TU Berlin',
		subheading: 'Submarine testing facility',
		variant: 'warning',
		pumps: 14,
		location: 'Berlin',
	},
	{
		id: '4',
		icon: 'truck',
		notification: '3',
		heading: 'Water Tank - Waste Water Processing',
		subheading: 'Waste water processing in Mosville',
		variant: 'success',
		pumps: 93,
		location: 'Mosville',
	},
];
