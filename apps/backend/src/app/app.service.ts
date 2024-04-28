import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendConfig } from 'common-backend-models';

@Injectable()
export class AppService {
	constructor(private readonly configService: ConfigService<BackendConfig>) {}

	getData(): { message: string } {
		return {
			message: `Welcome to ${this.configService.get('app', { infer: true }).name || 'API'}`,
		};
	}
}
