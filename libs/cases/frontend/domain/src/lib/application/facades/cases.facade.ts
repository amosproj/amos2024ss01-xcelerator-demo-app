import { inject, Injectable } from '@angular/core';
import { ICaseParams, ICaseResponse, ICreateCaseBody } from '@frontend/cases/shared/models';
import { Observable } from 'rxjs';

import { XdCasesRequestService } from '../../infrastructure/cases-request.service';

/**
 * Browse facades service.
 */
@Injectable({ providedIn: 'root' })
export class XdCasesFacade {
	private readonly _scanService = inject(XdCasesRequestService);

	/**
	 * Get all cases via infrastructure.
	 */
	public getAllCases(): Observable<ICaseResponse[]> {
		return this._scanService.getAllCases();
	}

	/**
	 * Get time series data via backend
	 *
	 * @param params
	 */
	public getTimeSeries(params: ICaseParams): Observable<ICaseResponse[]> {
		return this._scanService.getTimeSeries(params);
	}

	public createCase(body: ICreateCaseBody) {
		return this._scanService.createCase(body);
	}

    public updateCase(params: ICaseParams, body: ICreateCaseBody) {
        return this._scanService.updateCase(params,body);
    }

    public deleteCase(params: ICaseParams){
        return this._scanService.deleteCase(params);
    }
}
