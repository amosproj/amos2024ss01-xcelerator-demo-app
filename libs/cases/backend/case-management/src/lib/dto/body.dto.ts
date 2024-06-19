import {
	ECasePriority,
	ECaseStatus,
	ECaseType,
	ICreateCaseBody,
	IUpdateCaseBody,
} from 'cases-shared-models';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * The DTO (Data Transfer Object) for Case (Work Order)
 * This validates the correctness of the data sent for
 * creating a Case in the database
 */
export class createCaseBodyDto implements ICreateCaseBody {
	/**
	 * unique identifier of the work order
	 * @example: "AA-000"
	 */
	@IsString()
	@IsNotEmpty()
	handle: string;

	/**
	 * deadline for work order
	 * @example: "2021-11-25"
	 */
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	dueDate: Date;

	/**
	 * title of the work order
	 * @example "test WOM 1"
	 */
	@IsString()
	@IsNotEmpty()
	title: string;

	/**
	 * type of the work order
	 * @example "PLANNED"
	 */
	@IsString()
	@IsEnum(ECaseType, {
		message: 'type must be one of these values: ' + Object.values(ECaseType).join(', '),
	})
	type: ECaseType;

	@IsString()
	@IsNotEmpty()
	@IsEnum(ECaseStatus, {
		message: 'status must be one of these values: ' + Object.values(ECaseStatus).join(', '),
	})
	status: ECaseStatus;

	// assignedTo: User;

	// assignedToId: Int;

	@IsString()
	@IsNotEmpty()
	description: string;

	/**
	 * source of the work order
	 * @example "AHM"
	 */
	@IsString()
	@IsNotEmpty()
	source: string;

	/**
	 * priority of the work order
	 * @example "LOW"
	 */
	@IsString()
	@IsNotEmpty()
	@IsEnum(ECasePriority, {
		message: 'priority must be one of these values: ' + Object.values(ECasePriority).join(', '),
	})
	priority: ECasePriority;

	/**
	 * author mail of the work order
	 * @example "test@test.com"
	 */
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	createdBy: string;

	/**
	 * identifier of the work order
	 * @exampel "1702540787672"
	 */
	@IsString()
	@IsNotEmpty()
	eTag: string;

	/**
	 * The asset which the case belongs to
	 * @example "1702540787672"
	 */
	@IsString()
	@IsNotEmpty()
	assetId: string;
}

/**
 * The DTO (Data Transfer Object) for Case (Work Order)
 * This validates the correctness of the data sent for
 * updating an existing Case in the database
 * @see https://developer.siemens.com/insights-hub/docs/apis/advanced-casemanagement/api-casemanagement-api.html
 */
export class updateCaseBodyDto implements IUpdateCaseBody {
	/**
	 * unique identifier of the work order
	 * @example: "AA-000"
	 */
	@IsString()
	@IsOptional()
	handle: string;

	/**
	 * deadline for work order
	 * @example: "2021-11-25"
	 */
	@IsDate()
	@IsOptional()
	@Type(() => Date)
	dueDate: Date;

	/**
	 * title of the work order
	 * @example "test WOM 1"
	 */
	@IsString()
	@IsOptional()
	title: string;

	/**
	 * type of the work order
	 * @example "PLANNED"
	 */
	@IsString()
	@IsOptional()
	@IsEnum(ECaseType, {
		message: 'Type must be one of these values: ' + Object.values(ECaseType).join(', '),
	})
	type: ECaseType;

	/**
	 * current status of the work order
	 * @exampel "OPEN"
	 */
	@IsString()
	@IsOptional()
	@IsEnum(ECaseStatus, {
		message: 'Status must be one of these values: ' + Object.values(ECaseStatus).join(', '),
	})
	status: ECaseStatus;

	/**
	 * user to which the work order is assigned to
	 * @example User
	 */
	// assignedTo: User;

	/**
	 * ID of the user to which the work order is assigned to
	 * @example 123456
	 */
	// assignedToId: Int;

	/**
	 * description of the work order
	 * @example "This is an important order etc."
	 */
	@IsString()
	@IsOptional()
	description: string;

	/**
	 * source of the work order
	 * @example "AHM"
	 */
	@IsString()
	@IsOptional()
	source: string;

	/**
	 * priority of the work order
	 * @example "LOW"
	 */
	@IsString()
	@IsOptional()
	@IsEnum(ECasePriority, {
		message: 'Priority must be one of these values: ' + Object.values(ECasePriority).join(', '),
	})
	priority: ECasePriority;

	/**
	 * identifier of the work order
	 * @example "1702540787672"
	 */
	@IsString()
	@IsOptional()
	eTag: string;

	/**
	 * author of any changes to the work order
	 * @example "test@test.com"
	 */
	@IsOptional()
	@IsEmail()
	modifiedBy: string;
}
