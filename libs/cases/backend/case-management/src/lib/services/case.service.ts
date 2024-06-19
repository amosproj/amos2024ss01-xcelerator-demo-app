import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CasePriority, CaseStatus, CaseType } from '@prisma/client';
import {
	ECasePriority,
	ECaseStatus,
	ECaseType,
	ICaseResponse,
	ICreateCaseBody,
	IUpdateCaseBody,
} from 'cases-shared-models';
import { PrismaService } from 'common-backend-prisma';
import { from, map, Observable, switchMap } from 'rxjs';

/**
 * handles database operations and contains business logic
 */
@Injectable()
export class XdCaseService {
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
				items.map((item) => {
					const { assetAssetId, type, status, priority, ...rest } = item;

					return {
						...rest,
						type: type as unknown as ECaseType,
						status: status as unknown as ECaseStatus,
						priority: priority as unknown as ECasePriority,

						assetId: assetAssetId,
						overdue: Date.now() > new Date(item.dueDate).getTime(),
					};
				}),
			),
		);
	}

	private convertCaseType(prismaType: CaseType): ECaseType {
		switch (prismaType) {
			case CaseType.PLANNED:
				return ECaseType.PLANNED;
			case CaseType.INCIDENT:
				return ECaseType.INCIDENT;
			case CaseType.ANNOTATION:
				return ECaseType.ANNOTATION;
			default:
				return ECaseType.PLANNED;
		}
	}

	private convertCaseStatus(prismaStatus: CaseStatus): ECaseStatus {
		switch (prismaStatus) {
			case CaseStatus.OPEN:
				return ECaseStatus.OPEN;
			case CaseStatus.INPROGRESS:
				return ECaseStatus.INPROGRESS;
			case CaseStatus.ONHOLD:
				return ECaseStatus.ONHOLD;
			case CaseStatus.DONE:
				return ECaseStatus.DONE;
			case CaseStatus.OVERDUE:
				return ECaseStatus.OVERDUE;
			case CaseStatus.CANCELLED:
				return ECaseStatus.CANCELLED;
			case CaseStatus.ARCHIVED:
				return ECaseStatus.ARCHIVED;
			default:
				return ECaseStatus.OPEN;
		}
	}

	private convertCasePriority(prismaPriority: CasePriority): ECasePriority {
		switch (prismaPriority) {
			case CasePriority.LOW:
				return ECasePriority.LOW;
			case CasePriority.MEDIUM:
				return ECasePriority.MEDIUM;
			case CasePriority.HIGH:
				return ECasePriority.HIGH;
			case CasePriority.EMERGENCY:
				return ECasePriority.EMERGENCY;
			default:
				return ECasePriority.LOW;
		}
	}

	private responseFromItem(item: any): ICaseResponse {
		const { assetAssetId, type, status, priority, ...rest } = item;

		return {
			...rest,
			type: this.convertCaseType(type),
			status: this.convertCaseStatus(status),
			priority: this.convertCasePriority(priority),

			assetId: assetAssetId,
			overdue: Date.now() > new Date(item.dueDate).getTime(),
		};
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
					throw new HttpException('Case not found', HttpStatus.NOT_FOUND);
				}

				return this.responseFromItem(item);
			}),
		);
	}

	/**
	 * creates a new case in the database using the provided case data
	 * @param {ICaseRequest} caseData represents a case
	 * @returns {Observable<Case>}
	 */
	public createCase({ assetId, ...caseData }: ICreateCaseBody): Observable<ICaseResponse> {
		return from(
			this.prismaService.asset.findUnique({
				where: { assetId },
			}),
		).pipe(
			map((asset) => {
				if (!asset) {
					throw new HttpException('Asset not found', HttpStatus.NOT_FOUND);
				}

				return asset;
			}),
			switchMap((asset) => {
				const data = {
					...caseData,
					assetAssetId: asset.assetId,
					dueDate: new Date(caseData.dueDate),
				};

				return from(
					this.prismaService.case.create({
						data,
					}),
				).pipe(map((item) => this.responseFromItem(item)));
			}),
		);
	}

	/**
	 * updates an existing case by ID
	 * @param {ICaseRequest} caseData contains the updated data for the case
	 * @returns {Observable<Case>} contains an Observable that emits the updated case
	 */
	public updateCaseById(id: number, caseData: IUpdateCaseBody): Observable<ICaseResponse> {
		return from(
			this.prismaService.case.update({
				where: { id },
				data: caseData,
			}),
		).pipe(map((item) => this.responseFromItem(item)));
	}

	/**
	 * deletes an existing case by ID
	 * @param {number} id
	 * @returns {Observable<Case>}
	 */
	public deleteCaseById(id: number): Observable<ICaseResponse> {
		return from(
			this.prismaService.case.delete({
				where: { id },
			}),
		).pipe(map((item) => this.responseFromItem(item)));
	}
}
