import { Test } from '@nestjs/testing';
import { Observable, of } from 'rxjs';

import { XdTimeseriesController } from './controller/timeseries.controller';
import {
	ITimeSeriesDataItemResponse,
	ITimeSeriesItemResponse,
} from './interfaces/respons.interface';
import { XdTimeseriesService } from './services/timeseries.service';
describe('TimeseriesController ', () => {
	let controller: XdTimeseriesController;
	let service: XdTimeseriesService;
	beforeAll(async () => {
		const serviceMock = {
			getAllTimeSeries: jest.fn().mockReturnValue(
				of([
					{
						entityId: 'test',
						propertySetName: 'test',
					} as ITimeSeriesItemResponse,
				]) as Observable<ITimeSeriesItemResponse[]>,
			),
			getTimeSeriesFromDB: jest.fn().mockReturnValue(
				of([
					{ time: new Date(), test: 'test' },
					{ time: new Date(), test: 'test' },
				] as ITimeSeriesDataItemResponse[]) as Observable<ITimeSeriesDataItemResponse[]>,
			),
		};

		const module = await Test.createTestingModule({
			controllers: [XdTimeseriesController],
			providers: [
				{
					provide: XdTimeseriesService,
					useValue: serviceMock,
				},
			],
		}).compile();

		controller = module.get<XdTimeseriesController>(XdTimeseriesController);
		service = module.get<XdTimeseriesService>(XdTimeseriesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return timeseries data', () => {
		expect(controller).toBeDefined();
	});

	it('should call getAllTimeseries', async () => {
		const result = await controller.getAllTimeseries();
		expect(service.getAllTimeSeries).toHaveBeenCalled();
	});
});
