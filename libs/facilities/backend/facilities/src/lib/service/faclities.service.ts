import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Aspect, XdAssetsService } from 'common-backend-insight-hub';
import { Asset } from 'common-backend-insight-hub';
import { PrismaService } from 'common-backend-prisma';
import { filter, forkJoin, from, map, mergeMap, Observable, of, switchMap, toArray } from 'rxjs';

@Injectable()
export class XdFacilitesService {
	constructor(
		@Inject(forwardRef(() => XdAssetsService))
		private readonly assetService: XdAssetsService,

		@Inject(forwardRef(() => PrismaService))
		private readonly prismaService: PrismaService,
	) {}

	public getAllPumps(): Observable<Asset[]> {
		return this.assetService.getAssetsData().pipe(
			map((response) => {
				const onlyPumps = response._embedded.assets.filter(
					(asset) => asset.typeId === 'castidev.Pump',
				);

				return onlyPumps;
			}),
		);
	}

	public getAspectsForAssets(assets: Observable<Asset[]>): Observable<
		{
			asset: Asset;
			aspects: Aspect[];
		}[]
	> {
		return assets.pipe(
			switchMap((assets) => {
				if (assets.length === 0) {
					return of([]);
				}

				return forkJoin(
					assets.map((asset) =>
						this.assetService.getAssetAspectsData(asset.assetId).pipe(
							switchMap((response) =>
								of({
									asset: asset,
									aspects: response._embedded.aspects,
								}),
							),
						),
					),
				);
			}),
		);
	}

	private upsertAsset(asset: Asset, aspects: Aspect[]) {
		return this.prismaService.asset.upsert({
			where: {
				id: asset.assetId,
			},
			update: {},
			create: {
				id: asset.assetId,
				name: asset.name,
				typeId: asset.typeId,
				description: asset.description,
				timeSeriesItems: {
					createMany: {
						data: aspects.map((aspect) => {
							return {
								propertySetName: aspect.name,
								Variables: aspect.variables.map((variable) => {
									return {
										name: variable.name,
										unit: variable.unit,
									};
								}),
							};
						}),
					},
				},
			},
		});
	}
	private filterExistingAssets(assets: Observable<Asset[]>) {
		return assets.pipe(
			switchMap((assets) => {
				if (assets.length === 0) {
					return of([] as Asset[]);
				}

				return from(assets).pipe(
					mergeMap((asset) =>
						from(
							this.prismaService.asset.findUnique({
								where: {
									id: asset.assetId,
								},
							}),
						).pipe(map((existingAsset) => !existingAsset)),
					),
					filter((value) => value),
					map((_, index) => assets[index]),
					toArray(),
				);
			}),
		);
	}

	public seedTheDB() {
		const assets = this.getAllPumps();
		const filteredAssets = this.filterExistingAssets(assets);
		return this.getAspectsForAssets(filteredAssets).pipe(
			switchMap((assetsWithAspects) => {
				return this.prismaService.$transaction(
					assetsWithAspects.map((assetWithAspects) => {
						return this.upsertAsset(assetWithAspects.asset, assetWithAspects.aspects);
					}),
				);
			}),
		);
	}

	public getAllFacilitiesFromDB() {
		return this.prismaService.asset.findMany();
	}

	public getFacilityById(id: string) {
		return this.prismaService.asset.findUnique({
			where: {
				id,
			},
		});
	}
}
