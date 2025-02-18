import {
	type TileEntityCoordinates,
	type TileEntityParamsApi,
} from "@/types/tile";
import { TerrainType } from "../entities/config";
import AbandonedHutSalvageableTileEntity from "../entities/salvagables/AbandonedHutSalvageableTileEntity";
import BearsDenSalvageableTileEntity from "../entities/salvagables/BearsDenSalvageableTileEntity";
import BurnedHouseSalvageableTileEntity from "../entities/salvagables/BurnedHouseSalvageableTileEntity";
import DepletedFieldSalvageableTileEntity from "../entities/salvagables/DepletedFieldSalvageableTileEntity";
import GrasslandCastleRuinsSalvageableTileEntity from "../entities/salvagables/GrasslandCastleRuinsSalvageableTileEntity";
import HillsCastleRuinsSalvageableTileEntity from "../entities/salvagables/HillsCastleRuinsSalvageableTileEntity";
import MercenaryCampSalvageableTileEntity from "../entities/salvagables/MercenaryCampSalvageableTileEntity";
import MercenaryShipSalvageableTileEntity from "../entities/salvagables/MercenaryShipSalvageableTileEntity";
import MerchantShipSalvageableTileEntity from "../entities/salvagables/MerchantShipSalvageableTileEntity";
import OldBattlefieldSalvageableTileEntity from "../entities/salvagables/OldBattlefieldSalvageableTileEntity";
import ShallowSeaRocksShipwreckSalvageableTileEntity from "../entities/salvagables/ShallowSeaRocksShipwreckSalvageableTileEntity";
import ShallowSeaShipwreckSalvageableTileEntity from "../entities/salvagables/ShallowSeaShipwreckSalvageableTileEntity";
import TravellingMerchantSalvageableTileEntity from "../entities/salvagables/TravellingMerchantSalvageableTileEntity";
import WolfsDenSalvageableTileEntity from "../entities/salvagables/WolfsDenSalvageableTileEntity";
import type TileEntity from "../entities/TileEntity";

const map = new Map<TerrainType, typeof TileEntity>();

// Salvageable entities
map.set(
	AbandonedHutSalvageableTileEntity.terrainType,
	AbandonedHutSalvageableTileEntity,
);
map.set(
	BearsDenSalvageableTileEntity.terrainType,
	BearsDenSalvageableTileEntity,
);
map.set(
	BurnedHouseSalvageableTileEntity.terrainType,
	BurnedHouseSalvageableTileEntity,
);
map.set(
	DepletedFieldSalvageableTileEntity.terrainType,
	DepletedFieldSalvageableTileEntity,
);
map.set(
	GrasslandCastleRuinsSalvageableTileEntity.terrainType,
	GrasslandCastleRuinsSalvageableTileEntity,
);
map.set(
	HillsCastleRuinsSalvageableTileEntity.terrainType,
	HillsCastleRuinsSalvageableTileEntity,
);
map.set(
	MercenaryCampSalvageableTileEntity.terrainType,
	MercenaryCampSalvageableTileEntity,
);
map.set(
	MercenaryShipSalvageableTileEntity.terrainType,
	MercenaryShipSalvageableTileEntity,
);
map.set(
	MerchantShipSalvageableTileEntity.terrainType,
	MerchantShipSalvageableTileEntity,
);
map.set(
	OldBattlefieldSalvageableTileEntity.terrainType,
	OldBattlefieldSalvageableTileEntity,
);
map.set(
	ShallowSeaRocksShipwreckSalvageableTileEntity.terrainType,
	ShallowSeaRocksShipwreckSalvageableTileEntity,
);
map.set(
	ShallowSeaShipwreckSalvageableTileEntity.terrainType,
	ShallowSeaShipwreckSalvageableTileEntity,
);
map.set(
	TravellingMerchantSalvageableTileEntity.terrainType,
	TravellingMerchantSalvageableTileEntity,
);
map.set(
	WolfsDenSalvageableTileEntity.terrainType,
	WolfsDenSalvageableTileEntity,
);

// TODO: rename + rename file
export const getSalvageableTileEntity = (
	type: TerrainType,
): typeof TileEntity | null => (map.has(type) ? map.get(type)! : null);

// TODO: rename + rename file
export const createSalvageableTileEntity = (
	type: TerrainType,
	coordinates: TileEntityCoordinates,
	api: TileEntityParamsApi,
): TileEntity | null => {
	const entity = getSalvageableTileEntity(type);
	return entity ? new entity(coordinates, api) : null;
};
