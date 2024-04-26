import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	A = 'awdawdawd';

	constructor(private readonly appService: AppService) {}

	@Get()
	getData() {
		return this.appService.getData();
	}
}
