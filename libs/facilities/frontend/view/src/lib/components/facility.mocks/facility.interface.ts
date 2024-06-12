import { FACILITY_VARIANT } from './facility.variant';

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
	variant: FACILITY_VARIANT;
	pumps: number;
	location: string;
}
