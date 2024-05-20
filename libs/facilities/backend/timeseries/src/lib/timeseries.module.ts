import { Module } from '@nestjs/common';
import { XdPrismaModule } from 'common-backend-prisma';

import { XdTimeseriesController } from './controller/timeseries.controller';
import { TimeseriesService } from './services/timeseries.service';

/*
interface IXdPumpModuleOptions {
    import?: ModuleMetadata['imports'];

    dataFetcher: Partial<any>
}
 */

@Module({
	controllers: [XdTimeseriesController],
	imports: [XdPrismaModule],
	providers: [TimeseriesService],
	exports: [TimeseriesService],
})
export class XdTimeseriesModule {
	/*
     * TODO need to integrate with different data providers
     * @param options
    static register(options: IXdPumpModuleOptions): ModuleMetadata {
        return {
            module: XdPumpModule,
            imports: options.import,
            providers: [
                {
                    provide: 'dataFetcher',
                    useValue: options.dataFetcher,
                }
            ],
            exports: [ 'dataFetcher' ],
        };
    }
     */
}
