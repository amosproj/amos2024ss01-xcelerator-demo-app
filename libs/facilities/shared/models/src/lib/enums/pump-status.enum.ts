/**
 * Indicates the status of the pump
 */
export enum EPumpStatus {
	/**
	 * The pump is working as expected
	 */
	REGULAR = 'REGULAR',

	/**
	 * The pump returns suspicious data
	 */
	SUSPICIOUS = 'SUSPICIOUS',

	/**
	 * The pump is working incorrectly
	 */
	FAULTY = 'FAULTY',
}
