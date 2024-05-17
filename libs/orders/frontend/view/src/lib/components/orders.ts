export interface Order {
	id: string;
	icon: string;
	notification: string;
	heading: string;
	subheading: string;
	variant: string;
}

export const orders: Order[] = [
	{
		id: '1',
		icon: 'battery-empty',
		notification: '99+',
		heading: 'Fix the Aquarium Pump',
		subheading: 'The pump in the aquarium is not working properly',
		variant: 'warning',
	},
	{
		id: '2',
		icon: 'water-fish',
		notification: '3',
		heading: 'Leaking Water Tank',
		subheading: 'The water tank in the CS Department building is leaking',
		variant: 'critical',
	},
];
