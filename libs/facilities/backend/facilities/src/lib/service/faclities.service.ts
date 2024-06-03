import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { XdAssetsService } from 'common-backend-insight-hub';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class XdFacilitesService {
	constructor(
		@Inject(forwardRef(() => XdAssetsService))
		private readonly assetService: XdAssetsService,
	) {}

	public seedTheDB() {
		const allASsets = this.assetService.getAssetsData().pipe(
			map((response) => {
				console.log(response._embedded.assets.length);

				const onlyPumps = response._embedded.assets.filter(
					(asset) => asset.typeId === 'castidev.Pump',
				);


				return onlyPumps.map((pump) => {
					return firstValueFrom(this.assetService.getAssetAspectsData(pump.assetId));
				});
			}),
		);



		return firstValueFrom(allASsets);
	}
}
