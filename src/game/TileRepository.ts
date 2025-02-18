import tiledConfig from "@/assets/tiled/Map1024_Version6.json";
import useEmitter, {
	EmitterEvents,
	type TileRepositoryUpgradePayload,
} from "@/hooks/useEmitter";
import { type Tuple } from "@/types";
import {
	type TileEntityCoordinates,
	type TileEntityParams,
	type TileEntityParams1,
	type TileEntityParams3,
	type TileEntityParams5,
	type TileEntityParamsApi,
} from "@/types/tile";
import { type TiledConfig } from "@/types/tiled";
import { TerrainType, tilerepoLayer1TerrainTypes } from "./entities/config";
import TileEntity from "./entities/TileEntity";
import { createSalvageableTileEntity } from "./utils/salvageables";
import { createTerrainTileEntity } from "./utils/terrain";

// 4 - 8 MB na 1 uint32 udaj (0 - 4294967295) pre kazdy tile
// 2 - 4 MB na 1 uint16 udaj (0 - 65535) pre kazdy tile
// 1 - 2 MB na 1 uint8 udaj (0 - 255) pre kazdy tile

// TODO: start indexing from 0 instead of 1

export type TileRepositoryLayerIndex = 1 | 2 | 3 | 4 | 5;

class TileRepository {
	public readonly MAP_SIZE: number = 1024;

	public readonly TILE_SIZE: number = 256;

	public readonly TILE_SIZE_TALL: number = 310;

	public readonly MIN_X: number = -1;

	public readonly MAX_X: number = -1;

	public readonly MIN_Y: number = -1;

	public readonly MAX_Y: number = -1;

	private readonly emitter: ReturnType<typeof useEmitter>;

	private readonly tiledConfig: TiledConfig | null;

	// Terrain
	private readonly tiles1: Uint16Array; // => Array<TileEntity['tileId']>;

	private readonly params1: TileEntityParams1;

	// Beaches / Palisades (visual only layer - no params)
	private readonly tiles2: Uint16Array; // => Array<TileEntity['tileId']>;

	// private readonly params2: TileEntityParams2; // dont need params, is only visual layer

	// Buildings
	private readonly tiles3: Uint16Array; // => Array<TileEntity['tileId']>;

	private readonly params3: TileEntityParams3;

	// Palisades (visual only layer - no params)
	private readonly tiles4: Uint16Array; // => Array<TileEntity['tileId']>;

	// private readonly params4: TileEntityParams4; // dont need params, is only visual layer

	// Objects
	private readonly tiles5: Uint16Array; // => Array<TileEntity['tileId']>;

	private readonly params5: TileEntityParams5;

	private readonly tileIdToFrameNameMap = new Map<number, TerrainType>([
		[0, TerrainType.NOT_SET],
	]);

	private readonly frameNameToTileIdMap = new Map<TerrainType, number>([
		[TerrainType.NOT_SET, 0],
	]);

	// TODO: public readonly mainSettelement: TileEntity | null = null;

	public constructor() {
		this.emitter = useEmitter();

		this.tiledConfig = tiledConfig as unknown as TiledConfig;

		if (this.tiledConfig.width !== this.tiledConfig.height)
			throw new Error(
				"TileRepository: width and height must be the same",
			);

		if (this.tiledConfig.tilewidth !== this.tiledConfig.tileheight)
			throw new Error(
				"TileRepository: tilewidth and tileheight must be the same",
			);

		// this.MAP_SIZE = this.tiledConfig.width;
		// this.TILE_SIZE = this.tiledConfig.tilewidth;

		// Terrain
		this.tiles1 = new Uint16Array(this.size);
		// Beaches / Palisades
		this.tiles2 = new Uint16Array(this.size);
		// Buildings
		this.tiles3 = new Uint16Array(this.size);
		// Palisades
		this.tiles4 = new Uint16Array(this.size);
		// Objects
		this.tiles5 = new Uint16Array(this.size);

		this.params1 = {
			clicks: new Uint32Array(this.size),
			durability: new Uint16Array(this.size),
			visibility: new Uint8Array(this.size),
			distanceFromMainSettlement: new Uint16Array(this.size),
		};

		this.params3 = {
			currentAnimationIndex: new Uint8Array(this.size),
			clicks: new Uint32Array(this.size),
		};

		this.params5 = {
			clicks: new Uint32Array(this.size),
		};

		for (let i = 0; i < this.tiledConfig.layers[0].data.length; i++) {
			const { x, y } = this.getTileCoordinatesByIndex(i);

			this.tiles1[i] = this.tiledConfig.layers[0].data[i];
			this.params1.clicks[i] = Math.trunc(Math.random() * 65535);
			if (this.params1.visibility)
				this.params1.visibility[i] = this.getTileVisibility({ x, y });

			this.tiles2[i] = this.tiledConfig.layers[1].data[i];

			this.tiles3[i] = this.tiledConfig.layers[2].data[i];
			this.params3.clicks[i] = Math.trunc(Math.random() * 65535);

			this.tiles4[i] = this.tiledConfig.layers[3].data[i];

			this.tiles5[i] = 0; // TODO: implement objects tiles
			this.params5.clicks[i] = Math.trunc(Math.random() * 65535);

			if (this.tiledConfig.layers[0].data[i] !== 0) {
				if (this.MIN_X === -1 || x < this.MIN_X) this.MIN_X = x;
				if (this.MAX_X === -1 || x > this.MAX_X) this.MAX_X = x;
				if (this.MIN_Y === -1 || y < this.MIN_Y) this.MIN_Y = y;
				if (this.MAX_Y === -1 || y > this.MAX_Y) this.MAX_Y = y;
			}
		}

		for (const tileset of this.tiledConfig.tilesets) {
			for (let i = 0; i < tileset.tilecount; i++) {
				const id = tileset.firstgid + i;
				const tile = tileset.tiles[i];

				// tile is not used in tileset (Kubo)
				if (!tile) continue;

				if (!tile.properties?.length)
					throw new Error(
						`Tile properties not found for tile ${id}!`,
					);

				this.tileIdToFrameNameMap.set(
					id,
					(tile.properties[0].value + ".png") as TerrainType,
				);
				this.frameNameToTileIdMap.set(
					(tile.properties[0].value + ".png") as TerrainType,
					id,
				);
			}
		}

		this.tiledConfig = null;

		this.emitter.on(
			EmitterEvents.TileRepositoryUpgrade,
			({
				coordinates,
				terrainType,
			}: TileRepositoryUpgradePayload): void => {
				this.setTileByCoordinates(coordinates, terrainType);
			},
		);

		// eslint-disable-next-line no-console
		console.log(this);
	}

	public get size(): number {
		return this.MAP_SIZE ** 2;
	}

	public getLayerSize(layerIndex: TileRepositoryLayerIndex): number {
		let length = 0;
		for (let i = 0; i < this[`tiles${layerIndex}`].length; i++) {
			if (this.tiles1[i] !== 0) length++;
		}
		return length;
	}

	public getLayerSizeByFrameNamesForPhaser(
		// @ts-expect-error - TS6133
		tilerepoLayerIndex: TileRepositoryLayerIndex,
		phaserFrameNameSet: Set<TerrainType>,
	): number {
		let length = 0;
		[
			this.tiles1,
			this.tiles2,
			this.tiles3,
			this.tiles4,
			this.tiles5,
		].forEach((tiles: Uint16Array): void => {
			for (let i = 0; i < tiles.length; i++) {
				if (
					phaserFrameNameSet.has(
						this.getFrameNameByTileId(tiles[i]) as TerrainType,
					)
				)
					length++;
			}
		});
		return length;
	}

	public getFrameNameByTileId(id: number): TerrainType | null {
		return this.tileIdToFrameNameMap.has(id)
			? (this.tileIdToFrameNameMap.get(id) as TerrainType)
			: null;
	}

	public getTileIdByFrameName(name: TerrainType): number | null {
		return this.frameNameToTileIdMap.has(name)
			? (this.frameNameToTileIdMap.get(name) as number)
			: null;
	}

	public getTileVisibility({ x, y }: TileEntityCoordinates): number {
		const center = Math.floor(this.MAP_SIZE / 2);
		// TODO premysliet ako fungovat ak ma hrac custom preskumanu plochu
		const exploredRadius = 10; // Init radius
		const fogRadius = 2; // TODO dynamic by Lvl

		const distanceToCenter = Math.sqrt(
			(x - center) ** 2 + (y - center) ** 2,
		);

		if (distanceToCenter <= exploredRadius) {
			return 2; // EXPLORED
		} else if (distanceToCenter <= exploredRadius + fogRadius) {
			return 1; // FOG
		} else {
			return 0; // BLACK
		}
	}

	public getNonBlackTileCount(): number {
		let count = 0;
		for (let i = 0; i < this.size; i++) {
			const visibility = this.getTileVisibility(
				this.getTileCoordinatesByIndex(i),
			);
			if (visibility > 0) count++;
		}
		return count;
	}

	public getTileIdsByIndex(idx: number): Tuple<number, 5> {
		return [
			this.tiles1[idx],
			this.tiles2[idx],
			this.tiles3[idx],
			this.tiles4[idx],
			this.tiles5[idx],
		];
	}

	public getTileIdsByCoordinates({
		x,
		y,
	}: TileEntityCoordinates): Tuple<number, 5> {
		const idx = this.getTileIndexByCoordinates({ x, y });
		return this.getTileIdsByIndex(idx);
	}

	public getTileEntityFactoriesByIndex(
		idx: number,
	): Tuple<() => TileEntity | null, 5> {
		const coordinates = this.getTileCoordinatesByIndex(idx);

		// Tato funkcia je definovana vnutri tejto funkcie, pretoze potrebujeme pristup k indexu idx.
		const apiFactory = <
			T extends Partial<TileEntityParams> = Partial<TileEntityParams>,
		>(
			layerIndex: 1 | 3,
		): TileEntityParamsApi => {
			if (![1, 3].includes(layerIndex))
				throw new Error("Invalid layer index!");

			return {
				getParamByName: (name: keyof T): number => {
					// @ts-expect-error - TS2536
					return this[`params${layerIndex}`][name][idx];
				},
				setParamByName: (name: keyof T, value: number): void => {
					// @ts-expect-error - TS2536
					this[`params${layerIndex}`][name][idx] = value;
				},
			};
		};

		// da sa pouzit toto getTileIdsByIndex
		return [
			(): TileEntity | null =>
				this.tileIdToFrameNameMap.has(this.tiles1[idx])
					? createTerrainTileEntity(
							this.tileIdToFrameNameMap.get(
								this.tiles1[idx],
							) as TerrainType,
							coordinates,
							apiFactory<TileEntityParams1>(1),
						)
					: null,
			(): TileEntity | null => null, // TODO:
			(): TileEntity | null =>
				this.tileIdToFrameNameMap.has(this.tiles3[idx])
					? createSalvageableTileEntity(
							this.tileIdToFrameNameMap.get(
								this.tiles3[idx],
							) as TerrainType,
							coordinates,
							apiFactory<TileEntityParams3>(3),
						)
					: null,
			(): TileEntity | null => null, // TODO:
			(): TileEntity | null => null, // TODO:
		];
	}

	public getTileEntitiesByIndex(idx: number): Tuple<TileEntity | null, 5> {
		const factories = this.getTileEntityFactoriesByIndex(idx);
		return factories.map(
			(factory: () => TileEntity | null): TileEntity | null => factory(),
		) as Tuple<TileEntity | null, 5>;
	}

	public getTileEntitiesByCoordinates({
		x,
		y,
	}: TileEntityCoordinates): Tuple<TileEntity | null, 5> {
		const idx = this.getTileIndexByCoordinates({ x, y });
		return this.getTileEntitiesByIndex(idx);
	}

	public setTileByCoordinates(
		{ x, y }: TileEntityCoordinates,
		terrainType: TerrainType | null,
	): void {
		const idx = this.getTileIndexByCoordinates({ x, y });

		if (!terrainType) {
			this.tiles1[idx] = 0;

			// TODO: reset params

			if (TileEntity.isMounted)
				this.emitter.emit(EmitterEvents.PhaserPutTileAt, {
					coordinates: { x, y },
				});

			return;
		}

		if (tilerepoLayer1TerrainTypes.has(terrainType)) {
			const tileId = this.getTileIdByFrameName(terrainType);
			if (!tileId)
				throw new Error(
					`TileId not found for frame name: ${terrainType}`,
				);

			this.tiles1[idx] = tileId;

			// reset clicks, maybe...
			this.params1.clicks[idx] = 0;

			if (TileEntity.isMounted)
				this.emitter.emit(EmitterEvents.PhaserPutTileAt, {
					coordinates: { x, y },
				});
		}
	}

	// Temporary, delete later.
	public getTileAt({ x, y }: TileEntityCoordinates): TileEntity | null {
		return this.getTileEntitiesByCoordinates({ x, y })[0];
	}

	public getNeighbourTilesByCoordinates(
		{ x, y }: TileEntityCoordinates,
		radius: number = 1,
	): Array<Tuple<number, 5>> {
		const neighbours: Array<Tuple<number, 5>> = [];
		for (let i = -radius; i <= radius; i++) {
			for (let j = -radius; j <= radius; j++) {
				const tiles = this.getTileIdsByCoordinates({
					x: x + i,
					y: y + j,
				});
				neighbours.push(tiles);
			}
		}
		return neighbours;
	}

	public getTileCoordinatesByIndex(idx: number): TileEntityCoordinates {
		return {
			x: idx % this.MAP_SIZE,
			y: Math.trunc(idx / this.MAP_SIZE),
		};
	}

	public getTileIndexByCoordinates({ x, y }: TileEntityCoordinates): number {
		return y * this.MAP_SIZE + x;
	}
}

export default TileRepository;
