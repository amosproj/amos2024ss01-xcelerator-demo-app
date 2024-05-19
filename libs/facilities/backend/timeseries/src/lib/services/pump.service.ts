import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'common-backend-prisma';

@Injectable()
export class PumpService {
	constructor(
		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
		@Inject(ConfigService)
		private readonly configService: ConfigService,
	) {}

	// async getTimeSeries(pumpWhereUniqueInput: ): Observable<ITimeSeriesItemData | null> {
	//
	//
	// }
}
