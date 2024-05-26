import { forwardRef,Inject, Injectable } from '@nestjs/common';
import { Case } from '@prisma/client';
import { PrismaService } from 'common-backend-prisma';
import { from, map,Observable } from 'rxjs';

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

	public getAllCases(): Observable<ICaseResponse[]> {
		return from(this.prismaService.case.findMany()).pipe(
			map((items) =>
				items.map((item) => ({
					id: item.id.toString(),
					handle: item.handle,
					dueDate: item.dueDate,
					title: item.title,
					type: item.type,
					status: item.status,
					description: item.description,
					source: item.source,
					priority: item.priority,
					createdDate: item.createdDate,
					createdBy: item.createdBy,
					eTag: item.eTag,
					modifiedBy: item.modifiedBy,
					modifiedDate: item.modifiedDate,
					overdue: item.overdue,
				})),
			),
		);
	}
}
