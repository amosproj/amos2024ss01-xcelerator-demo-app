import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ICaseResponse } from '../interfaces/response.interface';
import { CaseService } from '../services/case.service';

/**
 * handles incoming HTTP-requests
 */
@Controller('case')
export class CaseController {
	constructor(private readonly caseService: CaseService) {}

	/**
	 * returns all cases (work orders)
	 */
	@Get()
	public getAllCases(): Observable<ICaseResponse[]> {
		return this.caseService.getAllCases();
	}

	/**
    @Get(':id'): Observable<ICaseResponse>
    public getCaseById(@Param('id') id: string) {
        return this.caseService.getCaseById(id);
    }

    @Post()
    public createCase(@Body() user: User) {
        return this.caseService.createCase(user);
    }

    @Put(':id')
    public updateCaseById(@Param('id') id: string, @Body() case: Case) {
        return this.caseService.updateCase(id, case);
    }

    @Delete(':id')
    public deleteCaseById(@Param('id') id: string) {
        return this.caseService.deleteCase(id);
    }
    */
}
