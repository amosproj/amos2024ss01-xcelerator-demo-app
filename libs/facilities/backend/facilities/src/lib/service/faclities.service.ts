import { IFacilitiesResponse } from '@frontend/facilities/shared/models';
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

	/**
	 * This method gets all the pumps from the Asset Management API.
	 *
	 * @returns An observable of the assets.
	 */
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

	/**
	 * This method gets the aspects for the assets from the Asset Management API.
	 *
	 * @param assets An observable of the assets, for which the aspects are to be fetched.
	 * @returns An observable of the assets with their aspects.
	 */
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

	/**
	 * This method upserts a single asset and its aspects in the database.
	 *
	 * @param asset the asset to be upserted
	 * @param aspects the aspects of the asset
	 * @returns the upserted asset
	 */
	private upsertAsset(asset: Asset, aspects: Aspect[]) {
		return this.prismaService.asset.upsert({
			where: {
				assetId: asset.assetId,
			},
			update: {},
			create: {
				assetId: asset.assetId,
				name: asset.name,
				typeId: asset.typeId,
				description: asset.description,
				timeSeriesItems: {
					createMany: {
						data: aspects.map((aspect) => {
							return {
								propertySetName: aspect.name,
								variables: aspect.variables.map((variable) => {
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

	/**
	 * This method filters the existing assets from the assets. An asset is considered existing if it is already present in the database.
	 *
	 *
	 * @param assets the assets to be filtered
	 * @returns The assets that are not present in the database.
	 */
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
									assetId: asset.assetId,
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

	/**
	 * This method seeds the database with the pumps from the Asset Management API.
	 */
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

	/**
	 * This method gets all the facilities from the database.
	 *
	 * @returns All the facilities from the database.
	 */
	public getAllFacilitiesFromDB() {
		return this.prismaService.asset.findMany();
	}

	/**
	 * This method gets a facility by its id.
	 */
	public getFacilityById(assetId: string): Observable<IFacilitiesResponse | null> {
		return from(
			this.prismaService.asset.findUnique({
				where: {
					assetId,
				},
				include: {
					location: true,
				},
			}),
		).pipe(
			map((asset) => {
				if (asset === null) {
					return null;
				}

				return {
					assetId: asset.assetId,
					name: asset.name,
					typeId: asset.typeId,
					description: asset.description,
					variables: asset.variables,
					location: asset.location && {
						country: asset.location.country,
						latitude: asset.location.latitude,
						longitude: asset.location.longitude,
						locality: asset.location.locality,
						postalCode: asset.location.postalCode,
						region: asset.location.region,
						streetAddress: asset.location.streetAddress,
					},
					createdAt: asset.createdAt.toISOString(),
					updatedAt: asset.updatedAt.toISOString(),
				} as IFacilitiesResponse;
			}),
		);
	}
}
