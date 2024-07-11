import { EColorVariant } from 'facilities-shared-models';

/**
 *  This is just a Mock Interface for the Facility Component
 *  It has to be deleted once the actual implementation is done
 * */
export interface IFacilityMock {
	id: string;
	icon: string;
	notification: string;
	heading: string;
	subheading: string;
	variant: EColorVariant;
	pumps: number;
	location: string;
}
