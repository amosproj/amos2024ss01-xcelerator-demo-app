import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { XdAssetsService } from 'common-backend-insight-hub';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class XdFacilitesService {
	constructor(
		@Inject(forwardRef(() => XdAssetsService))
		private readonly assetService: XdAssetsService,
	) {}

	public getAllPumps() {
		return this.assetService.getAssetsData().pipe(
			map((response) => {
				const onlyPumps = response._embedded.assets.filter(
					(asset) => asset.typeId === 'castidev.Pump',
				);

				return onlyPumps;
			}),
		);
	}

	public getAspect() {
		return this.assetService.getAssetAspectsData('d743a8d8a2784132ba95deeace41efa8');
	}

	public async seedTheDB() {
		const pumps = await firstValueFrom(this.getAllPumps());

		return this.getAspect();
	}
}
