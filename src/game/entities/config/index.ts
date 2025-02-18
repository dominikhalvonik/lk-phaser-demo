// TODO: rename to TileType
export enum TerrainType {
	// internal
	NOT_SET = "internal_empty",

	GRASSLAND = "Grassland.png",
	SETTLEMENT_EMPTY = "Settlement_Empty.png",
	SETTLEMENT_CASTLE_LEVEL1 = "Settlement_Castle_lvl_1.png",
	SETTLEMENT_CASTLE_LEVEL2 = "Settlement_Castle_lvl_2.png",
	SETTLEMENT_CASTLE_LEVEL3 = "Settlement_Castle_lvl_3.png",
	SETTLEMENT_CASTLE_LEVEL4 = "Settlement_Castle_lvl_4.png",
	SETTLEMENT_CASTLE_LEVEL5 = "Settlement_Castle_lvl_5.png",
	FOREST = "Forest.png",
	DENSE_FOREST = "Forest_Dense.png",
	OLD_FOREST = "Forest_Old.png",
	HILLS = "Hills.png",
	MOUNTAINS = "Mountains.png",
	SWAMP = "Swamp.png",
	BANDIT_CAMP_SMALL = "Bandit_Camp_Small.png",
	BANDIT_CAMP_MEDIUM = "Bandit_Camp_Medium.png",
	BANDIT_CAMP_LARGE = "Bandit_Camp_Large.png",
	WHEAT_FIELD = "Field_Wheat.png",
	HOPS_FIELD = "Field_Hops.png",
	GOLD_VEIN = "Vein_Gold.png",
	GEMS_VEIN = "Vein_Gem.png",

	RIVER_DELTA2 = "River_Delta_R.png",
	RIVER_DELTA4 = "River_Delta_D.png",
	RIVER_DELTA8 = "River_Delta_L.png",
	RIVER_DELTA1 = "River_Delta_U.png",
	SHALLOW_SEA = "Sea_Shallow.png",
	DEEP_SEA = "Sea_Deep.png",
	SHALLOW_SEA_ROCKS = "Sea_Rocks.png",
	SHALLOW_SEA_SMALL_FISH = "Fish_Small.png",
	SHALLOW_SEA_MEDIUM_FISH = "Fish_Medium_Shallow.png",
	DEEP_SEA_MEDIUM_FISH = "Fish_Medium_Deep.png",
	DEEP_SEA_BIG_FISH = "Fish_Big.png",
	SHALLOW_SEA_SMALL_PIRATES = "Pirates_Small_Shallow.png",
	DEEP_SEA_SMALL_PIRATES = "Pirates_Small_Deep.png",
	SHALLOW_SEA_MEDIUM_PIRATES = "Pirates_Medium_Shallow.png",
	DEEP_SEA_MEDIUM_PIRATES = "Pirates_Medium_Deep.png",
	__EMPTY16__ = 16,

	RIVER10 = "River_L_R.png",
	RIVER5 = "River_U_D.png",
	RIVER12 = "River_L_D.png",
	RIVER9 = "River_U_L.png",
	RIVER3 = "River_U_R.png",
	RIVER6 = "River_R_D.png",
	RIVER14 = "River_T_D.png",
	RIVER13 = "River_T_L.png",
	RIVER11 = "River_T_U.png",
	RIVER7 = "River_T_R.png",
	RIVER15 = "River_X.png",
	RIVER_SPRING2 = "River_Spring_R.png",
	RIVER_SPRING4 = "River_Spring_D.png",
	RIVER_SPRING8 = "River_Spring_L.png",
	RIVER_SPRING1 = "River_Spring_U.png",
	__EMPTY32__ = 32,

	DEPLETED_FIELD = "Field_Depleted.png",
	ABANDONED_HUT = "Abandoned_Hut.png",
	BURNED_HOUSE = "Burned_House.png",
	OLD_BATTLEFIELD = "Old_Battlefield.png",
	GRASSLAND_CASTLE_RUINS = "Castle_Ruins_Grassland.png",
	HILLS_CASTLE_RUINS = "Castle_Ruins_Hills.png",
	MERCENARY_CAMP = "Mercenary_Camp.png",
	MERCHANT_SHIP = "Ship_Merchant.png",
	SHALLOW_SEA_SHIPWRECK = "Shipwreck_Shallow.png",
	SHALLOW_SEA_ROCKS_SHIPWRECK = "Shipwreck_Rocks.png",
	MERCENARY_SHIP = "Ship_Mercenary.png",
	TRAVELLING_MERCHANT = "Merchant_Travelling.png",
	WOLFS_DEN = "Den_Wolf.png",
	BEARS_DEN = "Den_Bear.png",
	__EMPTY63__ = 63,
	__EMPTY64__ = 64,

	//TODO TMP budovy - bez korektnych nazvov od grafikou
	GATHERERS_HUT = "Getherers_hut.png",
}

export const tilerepoLayer1TerrainTypes = new Set<TerrainType>([
	TerrainType.GRASSLAND,
	TerrainType.SETTLEMENT_EMPTY,
	TerrainType.SETTLEMENT_CASTLE_LEVEL1, // TODO: layer 3
	TerrainType.SETTLEMENT_CASTLE_LEVEL2, // TODO: layer 3
	TerrainType.SETTLEMENT_CASTLE_LEVEL3, // TODO: layer 3
	TerrainType.SETTLEMENT_CASTLE_LEVEL4, // TODO: layer 3
	TerrainType.SETTLEMENT_CASTLE_LEVEL5, // TODO: layer 3
	TerrainType.FOREST,
	TerrainType.DENSE_FOREST,
	TerrainType.OLD_FOREST,
	TerrainType.HILLS,
	TerrainType.MOUNTAINS,
	TerrainType.SWAMP,
	TerrainType.BANDIT_CAMP_SMALL, // TODO: layer 3
	TerrainType.BANDIT_CAMP_MEDIUM, // TODO: layer 3
	TerrainType.BANDIT_CAMP_LARGE, // TODO: layer 3
	TerrainType.WHEAT_FIELD,
	TerrainType.HOPS_FIELD,
	TerrainType.GOLD_VEIN,
	TerrainType.GEMS_VEIN,
	TerrainType.RIVER10,
	TerrainType.RIVER5,
	TerrainType.RIVER12,
	TerrainType.RIVER9,
	TerrainType.RIVER3,
	TerrainType.RIVER6,
	TerrainType.RIVER14,
	TerrainType.RIVER13,
	TerrainType.RIVER11,
	TerrainType.RIVER7,
	TerrainType.RIVER15,
	TerrainType.RIVER_SPRING2,
	TerrainType.RIVER_SPRING4,
	TerrainType.RIVER_SPRING8,
	TerrainType.RIVER_SPRING1,
	TerrainType.__EMPTY32__,
	TerrainType.RIVER_DELTA2,
	TerrainType.RIVER_DELTA4,
	TerrainType.RIVER_DELTA8,
	TerrainType.RIVER_DELTA1,
	TerrainType.SHALLOW_SEA,
	TerrainType.DEEP_SEA,
	TerrainType.SHALLOW_SEA_ROCKS,
	TerrainType.SHALLOW_SEA_SMALL_FISH,
	TerrainType.SHALLOW_SEA_MEDIUM_FISH,
	TerrainType.DEEP_SEA_MEDIUM_FISH,
	TerrainType.DEEP_SEA_BIG_FISH,
	TerrainType.SHALLOW_SEA_SMALL_PIRATES, // TODO: layer 3
	TerrainType.DEEP_SEA_SMALL_PIRATES, // TODO: layer 3
	TerrainType.SHALLOW_SEA_MEDIUM_PIRATES, // TODO: layer 3
	TerrainType.DEEP_SEA_MEDIUM_PIRATES, // TODO: layer 3
	TerrainType.__EMPTY16__,
]);

export const tilerepoLayer3TerrainTypes = new Set<TerrainType>([
	TerrainType.DEPLETED_FIELD,
	TerrainType.ABANDONED_HUT,
	TerrainType.BURNED_HOUSE,
	TerrainType.OLD_BATTLEFIELD,
	TerrainType.GRASSLAND_CASTLE_RUINS,
	TerrainType.HILLS_CASTLE_RUINS,
	TerrainType.MERCENARY_CAMP,
	TerrainType.MERCHANT_SHIP,
	TerrainType.SHALLOW_SEA_ROCKS_SHIPWRECK,
	TerrainType.TRAVELLING_MERCHANT,
	TerrainType.WOLFS_DEN,
	TerrainType.BEARS_DEN,
	TerrainType.__EMPTY63__,
	TerrainType.__EMPTY64__,
]);

export enum RequirementType {
	LEVEL,
	POPULATION,
}

export enum ResourceType {
	GEMS,
	COINS,
	LUMBER,
	STONE,
	CLAY,
	IRON,
	GOODS,
	STEEL,
	ARMY,
	FOOD,
	ALE,
	SUPER_CLICKER,
}

export enum ProductionType {
	LUMBER_COEFFICIENT,
	HIDES_COEFFICIENT,
	VENISON_COEFFICIENT, // produces FOOD
	FISH_COEFFICIENT, // produces FOOD
	WHEAT_COEFFICIENT, // produces FOOD
	HOPS_COEFFICIENT, // produces ALE
}

export enum ConsumptionType {
	FOOD,
}

export type UpgradeParams = {
	price: Partial<Record<ResourceType, number>>;
	reward?: Partial<Record<ResourceType, number | (() => number)>>;
	name?: string;
};
