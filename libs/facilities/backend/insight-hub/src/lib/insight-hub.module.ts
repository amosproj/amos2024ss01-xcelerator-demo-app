import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';

import { IotTimeSeriesService } from './services';
import { INSIGHT_HUB_OPTIONS } from './tokens';

/**
 * The options for the InsightHubModule
 */
interface IXdInsightHubModuleOptions {
	/**
	 * The URL of the API to use for the IotTimeSeriesService
	 */
	apiUrl?: string;

	/**
	 * The API key to use for the IotTimeSeriesService
	 */
	apiKey?: string;
}

interface IXdInsightHubModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (
		...args: any[]
	) => Promise<IXdInsightHubModuleOptions> | IXdInsightHubModuleOptions;
	inject?: any[];
}

@Module({
	providers: [IotTimeSeriesService],
	imports: [HttpModule],
	exports: [IotTimeSeriesService],
})
export class XdInsightHubModule {
	static register(options: IXdInsightHubModuleOptions): DynamicModule {
		return {
			module: XdInsightHubModule,
			global: true,
			providers: [
				{
					provide: INSIGHT_HUB_OPTIONS,
					useValue: options,
				},
			],
			exports: [INSIGHT_HUB_OPTIONS],
		};
	}

	static registerAsync(options: IXdInsightHubModuleAsyncOptions): DynamicModule {
		return {
			module: XdInsightHubModule,
			imports: options.imports,
			global: true,
			providers: [
				{
					provide: INSIGHT_HUB_OPTIONS,
					useFactory: options.useFactory,
					inject: options.inject,
				},
			],
			exports: [INSIGHT_HUB_OPTIONS],
		};
	}
}
