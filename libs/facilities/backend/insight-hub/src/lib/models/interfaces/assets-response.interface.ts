/**
 * Response from: https://gateway.eu1.mindsphere.io/api/assetmanagement/v3/assets
 * Interfaces generated using: https://transform.tools/json-to-typescript
 */
export interface IAssetsResponse {
	_embedded: Embedded;
	_links: Links3;
	page: Page;
}

/**
 * The following interfaces are NOT being prefixed with 'I' as they are just extracted from the JSON response
 */
export interface Embedded {
	assets: Asset[];
}

export interface Asset {
	assetId: string;
	tenantId: string;
	name: string;
	etag: number;
	externalId: any;
	t2Tenant: any;
	subTenant: any;
	description?: string;
	timezone: string;
	twinType: string;
	parentId: string;
	typeId: string;
	location: Location;
	fileAssignments: any[];
	variables: any[];
	aspects: Aspect[];
	locks: Lock[];
	deleted: any;
	sharing: Sharing;
	_links: Links2;
}

export interface Location {
	country: string;
	region: string;
	locality: string;
	streetAddress: string;
	postalCode: string;
	longitude: any;
	latitude: any;
}

export interface Aspect {
	name: string;
	variables: Variable[];
}

export interface Variable {
	name: string;
	value: string;
}

export interface Lock {
	service: string;
	reason: string;
	reasonCode: string;
	_links: Links;
	id: string;
}

export interface Links {
	self: Self;
}

export interface Self {
	href: string;
}

export interface Sharing {
	modes: any[];
}

export interface Links2 {
	self: Self2;
	aspects: Aspects;
	variables: Variables;
	location: Location2;
	parent: Parent;
}

export interface Self2 {
	href: string;
}

export interface Aspects {
	href: string;
}

export interface Variables {
	href: string;
}

export interface Location2 {
	href: string;
}

export interface Parent {
	href: string;
}

export interface Links3 {
	first: First;
	self: Self3;
	next: Next;
	last: Last;
}

export interface First {
	href: string;
}

export interface Self3 {
	href: string;
}

export interface Next {
	href: string;
}

export interface Last {
	href: string;
}

export interface Page {
	size: number;
	totalElements: number;
	totalPages: number;
	number: number;
}
