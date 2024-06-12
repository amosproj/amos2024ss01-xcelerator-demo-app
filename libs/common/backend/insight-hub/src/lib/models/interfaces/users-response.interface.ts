/**
 * Response from: https://gateway.eu1.mindsphere.io/api/im/v3/Users
 * Interfaces generated using: https://transform.tools/json-to-typescript
 */
export interface IUsersResponse {
	resources: Resource[];
	startIndex: number;
	itemsPerPage: number;
	totalResults: number;
	schemas: string[];
}

/**
 * The following interfaces are NOT being prefixed with 'I' as they are just extracted from the JSON response
 */
export interface Resource {
	id: string;
	externalId: string;
	meta: Meta;
	userName: string;
	name: Name;
	emails: Email[];
	groups: Group[];
	approvals: any[];
	active: boolean;
	verified: boolean;
	origin: string;
	zoneId: string;
	passwordLastModified: string;
	previousLogonTime?: number;
	lastLogonTime?: number;
	schemas: string[];
}

export interface Meta {
	version: number;
	created: string;
	lastModified: string;
}

export interface Name {
	familyName?: string;
	givenName?: string;
}

export interface Email {
	value: string;
	primary: boolean;
}

export interface Group {
	value: string;
	display: string;
	type: string;
}
