import { ICreateCaseBody, IUpdateCaseBody } from '@frontend/cases/shared/models';
import { CasePriority, CaseStatus, CaseType } from '@prisma/client';
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
	@IsEnum(CaseType, {
		message: 'Type must be one of these values: ' + Object.values(CaseType).join(', '),
	})
	type: CaseType;

	@IsString()
	@IsNotEmpty()
	@IsEnum(CaseStatus, {
		message: 'Status must be one of these values: ' + Object.values(CaseStatus).join(', '),
	})
	status: CaseStatus;

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
	@IsEnum(CasePriority, {
		message: 'Priority must be one of these values: ' + Object.values(CasePriority).join(', '),
	})
	priority: CasePriority;

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
	@IsEnum(CaseType, {
		message: 'Type must be one of these values: ' + Object.values(CaseType).join(', '),
	})
	type: CaseType;

	/**
	 * current status of the work order
	 * @exampel "OPEN"
	 */
	@IsString()
	@IsOptional()
	@IsEnum(CaseStatus, {
		message: 'Status must be one of these values: ' + Object.values(CaseStatus).join(', '),
	})
	status: CaseStatus;

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
	@IsEnum(CasePriority, {
		message: 'Priority must be one of these values: ' + Object.values(CasePriority).join(', '),
	})
	priority: CasePriority;

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
