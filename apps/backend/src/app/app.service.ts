import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	a = 'awdawd';

	getData(): { message: string } {
		return { message: 'Hello API' };
	}
}
