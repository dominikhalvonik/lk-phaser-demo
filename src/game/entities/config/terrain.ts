import {
	ProductionType,
	RequirementType,
	ResourceType,
	TerrainType,
	type UpgradeParams,
} from ".";

// TODO: rename and externalize
export type TerrainConfigItem = {
	tileId: TerrainType;
	isPermanent: boolean;
	requirements: Map<RequirementType, number>;
	production: Map<ProductionType, number>;
	storage: Map<ResourceType, number>;
	upgrades: Map<TerrainType, UpgradeParams>;

	// only for terrain
	exploreCoefficient?: number;

	// only for salvageables
	isVisible?: boolean;
	onReveal?: () => void;
};

export type TerrainConfig = Partial<Record<TerrainType, TerrainConfigItem>>;

const config: TerrainConfig = {
	[TerrainType.BANDIT_CAMP_SMALL]: {
		tileId: TerrainType.BANDIT_CAMP_SMALL,
		isPermanent: false,
		exploreCoefficient: 2.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.ARMY]: 100,
					},
					reward: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Vanquish",
				},
			],
		]),
	},
	[TerrainType.BANDIT_CAMP_MEDIUM]: {
		tileId: TerrainType.BANDIT_CAMP_MEDIUM,
		isPermanent: false,
		exploreCoefficient: 2.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.ARMY]: 100,
					},
					reward: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Vanquish",
				},
			],
		]),
	},
	[TerrainType.BANDIT_CAMP_LARGE]: {
		tileId: TerrainType.BANDIT_CAMP_LARGE,
		isPermanent: false,
		exploreCoefficient: 2.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.ARMY]: 100,
					},
					reward: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Vanquish",
				},
			],
		]),
	},
	[TerrainType.DEEP_SEA_BIG_FISH]: {
		tileId: TerrainType.DEEP_SEA_BIG_FISH,
		isPermanent: true,
		exploreCoefficient: 1.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>([
			[ProductionType.FISH_COEFFICIENT, 20],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.DEEP_SEA_MEDIUM_FISH]: {
		tileId: TerrainType.DEEP_SEA_MEDIUM_FISH,
		isPermanent: true,
		exploreCoefficient: 1.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>([
			[ProductionType.FISH_COEFFICIENT, 4],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.DEEP_SEA_SMALL_PIRATES]: {
		tileId: TerrainType.DEEP_SEA_SMALL_PIRATES,
		isPermanent: false,
		exploreCoefficient: 2.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.DEEP_SEA,
				{
					price: {
						[ResourceType.ARMY]: 100,
					},
					reward: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Defeat",
				},
			],
		]),
	},
	[TerrainType.DEEP_SEA_MEDIUM_PIRATES]: {
		tileId: TerrainType.DEEP_SEA_MEDIUM_PIRATES,
		isPermanent: false,
		exploreCoefficient: 2.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.DEEP_SEA,
				{
					price: {
						[ResourceType.ARMY]: 100,
					},
					reward: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Defeat",
				},
			],
		]),
	},
	[TerrainType.DEEP_SEA]: {
		tileId: TerrainType.DEEP_SEA,
		isPermanent: true,
		exploreCoefficient: 1.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.DENSE_FOREST]: {
		tileId: TerrainType.DENSE_FOREST,
		isPermanent: false,
		exploreCoefficient: 1.2,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 8],
			[RequirementType.POPULATION, 0],
		]),
		production: new Map<ProductionType, number>([
			[ProductionType.LUMBER_COEFFICIENT, 2],
			[ProductionType.HIDES_COEFFICIENT, 2],
			[ProductionType.VENISON_COEFFICIENT, 2],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 30_000,
					},
					reward: {
						[ResourceType.LUMBER]: 3_000,
					},
					name: "Cut",
				},
			],
		]),
	},
	[TerrainType.FOREST]: {
		tileId: TerrainType.FOREST,
		isPermanent: false,
		exploreCoefficient: 1.1,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 1],
			[RequirementType.POPULATION, 0],
		]),
		production: new Map<ProductionType, number>([
			[ProductionType.LUMBER_COEFFICIENT, 1],
			[ProductionType.HIDES_COEFFICIENT, 1],
			[ProductionType.VENISON_COEFFICIENT, 1],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 25_000,
					},
					reward: {
						[ResourceType.LUMBER]: 2_000,
					},
					name: "Cut",
				},
			],
			[
				TerrainType.DENSE_FOREST,
				{
					price: {
						[ResourceType.COINS]: 1_200,
					},
				},
			],
		]),
	},
	[TerrainType.GEMS_VEIN]: {
		tileId: TerrainType.GEMS_VEIN,
		isPermanent: true,
		exploreCoefficient: 2,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				// TODO:
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 25_000,
					},
				},
			],
		]),
	},
	[TerrainType.GOLD_VEIN]: {
		tileId: TerrainType.GOLD_VEIN,
		isPermanent: true,
		exploreCoefficient: 2,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				// TODO:
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 25_000,
					},
				},
			],
		]),
	},
	[TerrainType.GRASSLAND]: {
		tileId: TerrainType.GRASSLAND,
		isPermanent: false,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 0],
			[RequirementType.POPULATION, 0],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.FOREST,
				{
					price: {
						[ResourceType.COINS]: 300,
					},
				},
			],
			[
				TerrainType.DENSE_FOREST,
				{
					price: {
						[ResourceType.COINS]: 1500,
					},
				},
			],
		]),
	},
	[TerrainType.HILLS]: {
		tileId: TerrainType.HILLS,
		isPermanent: true,
		exploreCoefficient: 1.1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.HOPS_FIELD]: {
		tileId: TerrainType.HOPS_FIELD,
		isPermanent: false,
		exploreCoefficient: 0,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>([
			[ProductionType.HOPS_COEFFICIENT, 1],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Destroy",
				},
			],
		]),
	},
	[TerrainType.MOUNTAINS]: {
		tileId: TerrainType.MOUNTAINS,
		isPermanent: true,
		exploreCoefficient: 2,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.OLD_FOREST]: {
		tileId: TerrainType.OLD_FOREST,
		isPermanent: false,
		exploreCoefficient: 1.4,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>([
			[ProductionType.LUMBER_COEFFICIENT, 4],
			[ProductionType.HIDES_COEFFICIENT, 4],
			[ProductionType.VENISON_COEFFICIENT, 4],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 35_000,
					},
					reward: {
						[ResourceType.LUMBER]: 6_000,
					},
					name: "Cut",
				},
			],
		]),
	},
	[TerrainType.RIVER3]: {
		tileId: TerrainType.RIVER3,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER5]: {
		tileId: TerrainType.RIVER5,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER6]: {
		tileId: TerrainType.RIVER6,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER7]: {
		tileId: TerrainType.RIVER7,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER9]: {
		tileId: TerrainType.RIVER9,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER10]: {
		tileId: TerrainType.RIVER10,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER11]: {
		tileId: TerrainType.RIVER11,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER12]: {
		tileId: TerrainType.RIVER12,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER13]: {
		tileId: TerrainType.RIVER13,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER14]: {
		tileId: TerrainType.RIVER14,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER15]: {
		tileId: TerrainType.RIVER15,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_DELTA1]: {
		tileId: TerrainType.RIVER_DELTA1,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_DELTA2]: {
		tileId: TerrainType.RIVER_DELTA2,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_DELTA4]: {
		tileId: TerrainType.RIVER_DELTA4,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_DELTA8]: {
		tileId: TerrainType.RIVER_DELTA8,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_SPRING1]: {
		tileId: TerrainType.RIVER_SPRING1,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_SPRING2]: {
		tileId: TerrainType.RIVER_SPRING2,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_SPRING4]: {
		tileId: TerrainType.RIVER_SPRING4,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.RIVER_SPRING8]: {
		tileId: TerrainType.RIVER_SPRING8,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.SETTLEMENT_EMPTY]: {
		tileId: TerrainType.SETTLEMENT_EMPTY,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.SETTLEMENT_CASTLE_LEVEL1]: {
		tileId: TerrainType.SETTLEMENT_CASTLE_LEVEL1,
		isPermanent: true,
		exploreCoefficient: 1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.SHALLOW_SEA_MEDIUM_FISH]: {
		tileId: TerrainType.SHALLOW_SEA_MEDIUM_FISH,
		isPermanent: true,
		exploreCoefficient: 1.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>([
			[ProductionType.FISH_COEFFICIENT, 4],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.SHALLOW_SEA_ROCKS]: {
		tileId: TerrainType.SHALLOW_SEA_ROCKS,
		isPermanent: true,
		exploreCoefficient: 2,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.SHALLOW_SEA_SMALL_FISH]: {
		tileId: TerrainType.SHALLOW_SEA_SMALL_FISH,
		isPermanent: true,
		exploreCoefficient: 1.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.SHALLOW_SEA]: {
		tileId: TerrainType.SHALLOW_SEA,
		isPermanent: true,
		exploreCoefficient: 1.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>(),
	},
	[TerrainType.SHALLOW_SEA_SMALL_PIRATES]: {
		tileId: TerrainType.SHALLOW_SEA_SMALL_PIRATES,
		isPermanent: false,
		exploreCoefficient: 2.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.SHALLOW_SEA,
				{
					price: {
						[ResourceType.ARMY]: 100,
					},
					reward: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Defeat",
				},
			],
		]),
	},
	[TerrainType.SHALLOW_SEA_MEDIUM_PIRATES]: {
		tileId: TerrainType.SHALLOW_SEA_MEDIUM_PIRATES,
		isPermanent: false,
		exploreCoefficient: 2.5,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.SHALLOW_SEA,
				{
					price: {
						[ResourceType.ARMY]: 100,
					},
					reward: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Defeat",
				},
			],
		]),
	},
	[TerrainType.SWAMP]: {
		tileId: TerrainType.SWAMP,
		isPermanent: false,
		exploreCoefficient: 1.1,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 50_000,
					},
					name: "Land Reclamation",
				},
			],
		]),
	},
	[TerrainType.WHEAT_FIELD]: {
		tileId: TerrainType.WHEAT_FIELD,
		isPermanent: false,
		exploreCoefficient: 0,
		requirements: new Map<RequirementType, number>(),
		production: new Map<ProductionType, number>([
			[ProductionType.WHEAT_COEFFICIENT, 1],
		]),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 1_000,
					},
					name: "Destroy",
				},
			],
		]),
	},
};

export const getTerrainConfig = (
	terrainType: TerrainType,
): TerrainConfigItem => {
	const terrainConfig = config?.[terrainType];

	if (!terrainConfig) {
		throw new Error(`Terrain config not found for type: ${terrainType}!`);
	}

	return terrainConfig;
};
