import { ICaseResponse } from '@frontend/cases/shared/models';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';

import { createCaseBodyDto, updateCaseBodyDto } from '../dto/body.dto';
import { caseParamsDto } from '../dto/params.dto';
import { XdCaseService } from '../services/case.service';

/**
 * handles incoming HTTP-requests
 */
@Controller('case')
export class XdCaseController {
	constructor(private readonly caseService: XdCaseService) {}

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
	 * @returns {Observable<ICaseResponse>}
	 * @param params
	 */
	@Get(':id')
	public getCaseById(@Param() params: caseParamsDto): Observable<ICaseResponse> {
		return this.caseService.getCaseById(params.id);
	}

	/**
	 * creates a new case (work order)
	 * @param {ICaseRequest} caseRequest
	 * @returns {Observable<ICaseResponse>}
	 */
	@Post()
	public createCase(@Body() caseRequest: createCaseBodyDto): Observable<ICaseResponse> {
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
		@Param() params: caseParamsDto,
		@Body() body: updateCaseBodyDto,
	): Observable<ICaseResponse> {
		return this.caseService.updateCaseById(params.id, body);
	}

	/**
	 * deletes an existing case (work order) by ID
	 * @param {number} id unique identifier of the case to retrieve
	 * @param {ICaseRequest} caseRequest
	 * @returns {Observable<ICaseResponse>}
	 */
	@Delete(':id')
	public deleteCaseById(@Param() params: caseParamsDto) {
		return this.caseService.deleteCaseById(params.id);
	}
}
