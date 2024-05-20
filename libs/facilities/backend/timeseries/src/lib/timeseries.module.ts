import { Module } from '@nestjs/common';
import { XdPrismaModule } from 'common-backend-prisma';

import { XdTimeseriesController } from './controller/timeseries.controller';
import { XdTimeseriesService } from './services/timeseries.service';

/*
interface IXdPumpModuleOptions {
    import?: ModuleMetadata['imports'];

    dataFetcher: Partial<any>
}
 */

@Module({
	controllers: [XdTimeseriesController],
	imports: [XdPrismaModule],
	providers: [XdTimeseriesService],
	exports: [XdTimeseriesService],
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
