import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { TTimeSeriesData } from 'common-shared-models';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	public isTTimeSeriesData = (value: unknown): value is TTimeSeriesData => {
		return (
			typeof value === 'string' ||
			typeof value === 'number' ||
			typeof value === 'boolean' ||
			value === null ||
			value instanceof Date
		);
	};

	/**
	 * Selects the specified keys from a  Prisma.JsonValue
	 */
	public selectKeysFromJSON(
		json: Prisma.JsonValue,
		select?: string[],
	): { [key: string]: TTimeSeriesData } {
		const data = typeof json === 'string' ? JSON.parse(json) : json;

		return Object.fromEntries(
			Object.entries(data).filter(([key, value]) => {
				if (this.isTTimeSeriesData(value)) {
					return select ? select.includes(key) : true;
				}

				return false;
			}),
		) as { [key: string]: TTimeSeriesData };
	}
}
