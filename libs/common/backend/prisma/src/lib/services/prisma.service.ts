import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	/**
	 * Selects the specified keys from a  Prisma.JsonValue
	 */
	public selectKeysFromJSON(json: Prisma.JsonValue, select?: string[]) {
		const data = typeof json === 'string' ? JSON.parse(json) : json;

		if (!select) {
			return data;
		}

		return Object.fromEntries(Object.entries(data).filter(([key]) => select.includes(key)));
	}
}
