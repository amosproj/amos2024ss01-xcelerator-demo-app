import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ICaseRequest } from '../interfaces/request.interface';
import { ICaseResponse } from '../interfaces/response.interface';
import { CaseService } from '../services/case.service';

/**
 * handles incoming HTTP-requests
 */
@Controller('case')
export class CaseController {
	constructor(private readonly caseService: CaseService) {}

	/**
	 * retrieves all cases (work orders)
	 * does not take any parameters
	 */
	@Get()
	public getAllCases(): Observable<ICaseResponse[]> {
		return this.caseService.getAllCases();
	}

	/**
	 * retrieves a single case (work order) by its ID
	 * @param {number} id unique identifier of the case to retrieve
	 * @returns {Observable<ICaseResponse>}
	 */
	@Get(':id')
	public getCaseById(@Param('id') id: number): Observable<ICaseResponse> {
		return this.caseService.getCaseById(id);
	}

	/**
	 * creates a new case (work order)
	 * @param {ICaseRequest} caseRequest
	 * @returns {Observable<ICaseResponse>}
	 */
	@Post()
	public createCase(@Body() caseRequest: ICaseRequest): Observable<ICaseResponse> {
		return this.caseService.createCase(caseRequest);
	}

	/**
	 * updates an existing case (work order)
	 * @param {number} id unique identifier of the case to retrieve
	 * @param {ICaseRequest} caseRequest
	 * @returns {Observable<ICaseResponse>}
	 */
	@Put(':id')
	public updateCaseById(
		@Param('id') id: number,
		@Body() caseRequest: ICaseRequest,
	): Observable<ICaseResponse> {
		return this.caseService.updateCaseById(id, caseRequest);
	}

	/**
	 * deletes an existing case (work order) by ID
	 * @param {number} id unique identifier of the case to retrieve
	 * @param {ICaseRequest} caseRequest
	 * @returns {Observable<ICaseResponse>}
	 */
	@Delete(':id')
	public deleteCaseById(@Param('id') id: number, @Body() caseRequest: ICaseRequest) {
		return this.caseService.deleteCaseById(id, caseRequest);
	}
}
