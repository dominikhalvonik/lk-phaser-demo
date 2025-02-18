import {
	type TileEntityCoordinates,
	type TileEntityParamsApi,
} from "@/types/tile";
import { translate } from "@/utils/translate";
import {
	ProductionType,
	RequirementType,
	ResourceType,
	TerrainType,
	UpgradeParams,
} from "./config";
import { getTerrainConfig, TerrainConfigItem } from "./config/terrain";

// Flags:
// set: (2 ** 0) | (2 ** 1) | (2 ** 2)
// get: (7 & (2 ** 0)) !== 0
// enum Flags {
// 	IS_RIVER = 2 ** 0,
// 	IS_ROAD = 2 ** 1,
// }

// TODO: move to config
// const TILE_ENTITY_CAN_BUILD_ROAD = new Set<TerrainType>([
// 	TerrainType.GRASSLAND,
// 	TerrainType.RIVER5,
// 	TerrainType.RIVER10,
// ]);

class TileEntity {
	public readonly id: number;

	public readonly x: TileEntityCoordinates["x"];

	public readonly y: TileEntityCoordinates["y"];

	public readonly api: TileEntityParamsApi;

	// TODO: Rename to tileType.
	public static readonly terrainType: TerrainType = TerrainType.NOT_SET;

	// Set this after initial render.
	public static isMounted: boolean = false;

	// public readonly flags = new Set<Flags>([Flags.IS_RIVER | Flags.IS_ROAD]);

	public constructor(
		{ x, y }: TileEntityCoordinates,
		api: TileEntityParamsApi,
	) {
		this.x = x;

		this.y = y;

		this.id = x * 1024 + (y % 1024);

		this.api = api;

		if (this.constructor.name === "TileEntity")
			throw new Error("Cannot instantiate TileEntity directly!");
	}

	// public static get terrainType(): TerrainType {
	//  const CLASS_NAME_REGEXP = /TerrainEntity$/;
	//  const UPPERCASE_CHARACTER_REGEXP = /([A-Z])/g;
	// 	if (this.name === "TileEntity") return TerrainType.NOT_SET;
	// 	const terrainType = this.name
	// 		.replace(CLASS_NAME_REGEXP, "")
	// 		.replace(UPPERCASE_CHARACTER_REGEXP, "_$1")
	// 		.toUpperCase();
	// 	return TerrainType[terrainType as keyof typeof TerrainType];
	// }

	// public get terrainType(): TerrainType {
	// 	return (this.constructor as typeof TileEntity).terrainType;
	// }

	// TODO: rename to tileType (frameName).
	public get terrainType(): TerrainType {
		// Returns static property.
		return (this.constructor as typeof TileEntity).terrainType;
	}

	// alias
	public get frameName(): TerrainType {
		return this.terrainType;
	}

	public get name(): string {
		return translate(`${this.terrainType}.name`);
	}

	public get description(): string {
		return translate(`${this.terrainType}.description`);
	}

	public get action(): string {
		return translate(`${this.terrainType}.action`);
	}

	private get config(): TerrainConfigItem {
		return getTerrainConfig(this.terrainType);
	}

	public get tileId(): TerrainType {
		return this.config.tileId;
	}

	public get isPermanent(): boolean {
		return this.config.isPermanent;
	}

	public get isVisible(): boolean | null {
		return this.config.isVisible ?? null;
	}

	public get exploreCoefficient(): number | null {
		return this.config.exploreCoefficient ?? null;
	}

	public get requirements(): Map<RequirementType, number> {
		return this.config.requirements;
	}

	public get production(): Map<ProductionType, number> {
		return this.config.production;
	}

	public get storage(): Map<ResourceType, number> {
		return this.config.storage;
	}

	public get upgrades(): Map<TerrainType, UpgradeParams> {
		return this.config.upgrades;
	}

	public get onReveal(): (() => void) | null {
		return this.config.onReveal ?? null;
	}

	// TODO: pri budovach tam moze mat aj null
	public get canUpgradeTo(): Set<TerrainType> {
		const upgrades = new Set<TerrainType>();
		if (!this.upgrades) return upgrades;

		const keys = this.upgrades.keys();
		for (const key of keys) {
			upgrades.add(key);
		}

		return upgrades;
	}
}

export default TileEntity;
