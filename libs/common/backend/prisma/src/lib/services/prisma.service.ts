import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { TTimeSeriesData } from '../types';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	public isTTimeSeriesData = (value: unknown) => {
		return (
			['string', 'number', 'boolean'].includes(typeof value) &&
			(value === null || typeof value !== 'object' || value instanceof Date)
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

		const selectedData = select
			? Object.fromEntries(Object.entries(data).filter(([key]) => select.includes(key)))
			: data;

		const tmp = Object.fromEntries(
			Object.entries(selectedData).filter(
				([, value]) => this.isTTimeSeriesData(value) as TTimeSeriesData,
			),
		) as { [key: string]: TTimeSeriesData };

		return tmp;
	}
}
