import { Module } from '@nestjs/common';
import { XdPrismaModule } from 'common-backend-prisma';

import { PumpService } from './services/pump.service';

/*
interface IXdPumpModuleOptions {
    import?: ModuleMetadata['imports'];

    dataFetcher: Partial<any>
}
 */

@Module({
	controllers: [],
	imports: [XdPrismaModule],
	providers: [PumpService],
	exports: [PumpService],
})
export class XdPumpModule {
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
