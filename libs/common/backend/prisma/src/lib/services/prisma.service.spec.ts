import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
	let service: PrismaService;

	beforeEach(() => {
		service = new PrismaService();
		jest.spyOn(service, '$connect');
	});

	it('should call $connect on module init', async () => {
		await service.onModuleInit();
		expect(service.$connect).toHaveBeenCalled();
	});
});
