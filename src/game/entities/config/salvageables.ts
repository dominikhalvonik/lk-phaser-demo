import { random } from "lodash";
import {
	ProductionType,
	RequirementType,
	ResourceType,
	TerrainType,
	type UpgradeParams,
} from ".";
import { type TerrainConfig } from "./terrain";

const config: TerrainConfig = {
	[TerrainType.DEPLETED_FIELD]: {
		tileId: TerrainType.DEPLETED_FIELD,
		isPermanent: false,
		isVisible: true,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 2],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 10_000,
					},
					reward: {
						[ResourceType.LUMBER]: (): number => random(300, 600),
					},
				},
			],
		]),
	},
	[TerrainType.ABANDONED_HUT]: {
		tileId: TerrainType.ABANDONED_HUT,
		isPermanent: false,
		isVisible: true,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 2],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 15_000,
					},
					reward: {
						[ResourceType.LUMBER]: (): number => random(500, 1_000),
					},
				},
			],
		]),
		onReveal: (): void => {
			if (random() <= 0.1) {
				// TODO: emit add chest location event
			}
		},
	},
	[TerrainType.BURNED_HOUSE]: {
		tileId: TerrainType.BURNED_HOUSE,
		isPermanent: false,
		isVisible: true,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 9],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 25_000,
					},
					reward: {
						[ResourceType.LUMBER]: (): number => random(500, 1_000),
						[ResourceType.STONE]: (): number => random(500, 1_000),
					},
				},
			],
		]),
		onReveal: (): void => {
			if (random() <= 0.25) {
				// TODO: emit add chest location event
			}
		},
	},
	[TerrainType.OLD_BATTLEFIELD]: {
		tileId: TerrainType.OLD_BATTLEFIELD,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 21],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 50_000,
					},
					reward: {
						[ResourceType.IRON]: (): number => random(1_000, 2_000),
						[ResourceType.STEEL]: (): number =>
							random(1_000, 2_000),
					},
				},
			],
		]),
		onReveal: (): void => {
			if (random() <= 0.9) {
				// TODO: emit add chest location event
			}

			if (random() <= 0.1) {
				// TODO: emit add special location event
			}
		},
	},
	[TerrainType.GRASSLAND_CASTLE_RUINS]: {
		tileId: TerrainType.GRASSLAND_CASTLE_RUINS,
		isPermanent: false,
		isVisible: true,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 1],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 200_000,
					},
					reward: {
						[ResourceType.GEMS]: 5,
					},
				},
			],
		]),
		onReveal: (): void => {
			if (random() <= 0.8) {
				// TODO: emit add chest location event
			}

			if (random() <= 0.2) {
				// TODO: emit add special location event
			}
		},
	},
	[TerrainType.HILLS_CASTLE_RUINS]: {
		tileId: TerrainType.HILLS_CASTLE_RUINS,
		isPermanent: false,
		isVisible: true,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 1],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.HILLS,
				{
					price: {
						[ResourceType.COINS]: 200_000,
					},
					reward: {
						[ResourceType.GEMS]: 5,
					},
				},
			],
		]),
		onReveal: (): void => {
			if (random() <= 0.8) {
				// TODO: emit add chest location event
			}

			if (random() <= 0.2) {
				// TODO: emit add special location event
			}
		},
	},
	[TerrainType.MERCENARY_CAMP]: {
		tileId: TerrainType.MERCENARY_CAMP,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 25],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.COINS]: 300_000,
					},
					reward: {
						[ResourceType.ARMY]: (): number => random(25, 30),
					},
				},
			],
		]),
		onReveal: (): void => {
			if (random() <= 0.75) {
				// TODO: emit add chest location event
			}

			if (random() <= 0.25) {
				// TODO: emit add special location event
			}
		},
	},
	[TerrainType.MERCHANT_SHIP]: {
		tileId: TerrainType.MERCHANT_SHIP,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 18],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.SHALLOW_SEA,
				{
					price: {
						[ResourceType.COINS]: 100_000,
					},
					reward: {
						[ResourceType.GOODS]: (): number =>
							random(2_000, 3_000),
					},
				},
			],
		]),
	},
	[TerrainType.SHALLOW_SEA_SHIPWRECK]: {
		tileId: TerrainType.SHALLOW_SEA_SHIPWRECK,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 21],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.SHALLOW_SEA,
				{
					price: {
						[ResourceType.COINS]: 150_000,
					},
					reward: {
						[ResourceType.GOODS]: (): number =>
							random(2_000, 3_000),
						[ResourceType.STEEL]: (): number =>
							random(2_000, 3_000),
					},
				},
			],
		]),
	},
	[TerrainType.SHALLOW_SEA_ROCKS_SHIPWRECK]: {
		tileId: TerrainType.SHALLOW_SEA_ROCKS_SHIPWRECK,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 21],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.SHALLOW_SEA_ROCKS,
				{
					price: {
						[ResourceType.COINS]: 150_000,
					},
					reward: {
						[ResourceType.GOODS]: (): number =>
							random(2_000, 3_000),
						[ResourceType.STEEL]: (): number =>
							random(2_000, 3_000),
					},
				},
			],
		]),
	},
	[TerrainType.MERCENARY_SHIP]: {
		tileId: TerrainType.MERCENARY_SHIP,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 25],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.DEEP_SEA,
				{
					price: {
						[ResourceType.COINS]: 500_000,
					},
					reward: {
						[ResourceType.ARMY]: (): number => random(25, 45),
					},
				},
			],
		]),
	},
	[TerrainType.TRAVELLING_MERCHANT]: {
		tileId: TerrainType.TRAVELLING_MERCHANT,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 18],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.GOODS]: 1_000,
					},
					reward: {
						[ResourceType.SUPER_CLICKER]: 30,
					},
				},
			],
		]),
	},
	[TerrainType.WOLFS_DEN]: {
		tileId: TerrainType.WOLFS_DEN,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 25],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.GRASSLAND,
				{
					price: {
						[ResourceType.ARMY]: 10,
					},
					reward: {
						[ResourceType.COINS]: (): number =>
							random(10_000, 15_000),
					},
				},
			],
		]),
	},
	[TerrainType.BEARS_DEN]: {
		tileId: TerrainType.BEARS_DEN,
		isPermanent: false,
		isVisible: false,
		requirements: new Map<RequirementType, number>([
			[RequirementType.LEVEL, 25],
		]),
		production: new Map<ProductionType, number>(),
		storage: new Map<ResourceType, number>(),
		upgrades: new Map<TerrainType, UpgradeParams>([
			[
				TerrainType.HILLS,
				{
					price: {
						[ResourceType.ARMY]: 25,
					},
					reward: {
						[ResourceType.COINS]: (): number =>
							random(30_000, 35_000),
					},
				},
			],
		]),
	},
};

export default config;
