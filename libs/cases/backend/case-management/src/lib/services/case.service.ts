import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'common-backend-prisma';
import { from, map, Observable } from 'rxjs';

import { ICaseRequest } from '../interfaces/request.interface';
import { ICaseResponse } from '../interfaces/response.interface';

/**
 * handles database operations and contains business logic
 */
@Injectable()
export class CaseService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
	) {}

	/**
	 * retrieves all cases from the database and maps them to
	 * an array of ICaseResponse objects
	 * @returns an Observable<ICaseResponse[]> that emits the array of cases
	 */
	public getAllCases(): Observable<ICaseResponse[]> {
		return from(this.prismaService.case.findMany()).pipe(
			map((items) =>
				items.map((item) => ({
					...item,
					dueDate: new Date(item.dueDate),
				})),
			),
		);
	}

	/**
	 * retrieves a single case by ID
	 * Maps the found case to an ICaseResponse object and returns an Observable<ICaseResponse>
	 * @param {number} id number containing a unique id
	 * @returns {Observable<ICaseResponse>} a single Case
	 */
	public getCaseById(id: number): Observable<ICaseResponse> {
		return from(this.prismaService.case.findUnique({ where: { id } })).pipe(
			map((item) => {
				if (!item) {
					throw new Error('Case not found');
				}
				return {
					...item,
					dueDate: new Date(item.dueDate),
				};
			}),
		);
	}

	/**
	 * creates a new case in the database using the provided case data
	 * @param {ICaseRequest} caseData represents a case
	 * @returns {Observable<Case>}
	 */
	public createCase(caseData: ICaseRequest): Observable<ICaseResponse> {
		return from(
			this.prismaService.case.create({
				data: {
					...caseData,
					dueDate: new Date(caseData.dueDate),
				},
			}),
		);
	}

	/**
	 * updates an existing case by ID
	 * @param {ICaseRequest} caseData contains the updated data for the case
	 * @returns {Observable<Case>} contains an Observable that emits the updated case
	 */
	public updateCaseById(id: number, caseData: ICaseRequest): Observable<ICaseResponse> {
		return from(
			this.prismaService.case.update({
				where: { id },
				data: {
					handle: caseData.handle,
					dueDate: new Date(caseData.dueDate),
					title: caseData.title,
					type: caseData.type,
					status: caseData.status,
					description: caseData.description,
					source: caseData.source,
					priority: caseData.priority,
					createdBy: caseData.createdBy,
					createdDate: caseData.createdDate,
					eTag: caseData.eTag,
					modifiedBy: caseData.modifiedBy,
					modifiedDate: caseData.modifiedDate,
					overdue: caseData.overdue,
				},
			}),
		);
	}

	/**
	 * deletes an existing case by ID
	 * @param {number} id
	 * @param {ICaseRequest} caseData
	 * @returns {Observable<Case>}
	 */
	public deleteCaseById(id: number, caseData: ICaseRequest): Observable<ICaseResponse> {
		return from(
			this.prismaService.case.delete({
				where: { id },
			}),
		);
	}
}
