import {
	type TileEntityCoordinates,
	type TileEntityParamsApi,
} from "@/types/tile";
import { TerrainType } from "../entities/config";
import BanditCampLargeTerrainTileEntity from "../entities/terrains/BanditCampLargeTerrainTileEntity";
import BanditCampMediumTerrainTileEntity from "../entities/terrains/BanditCampMediumTerrainTileEntity";
import BanditCampSmallTerrainTileEntity from "../entities/terrains/BanditCampSmallTerrainTileEntity";
import DeepSeaBigFishTerrainTileEntity from "../entities/terrains/DeepSeaBigFishTerrainTileEntity";
import DeepSeaMediumFishTerrainTileEntity from "../entities/terrains/DeepSeaMediumFishTerrainTileEntity";
import DeepSeaMediumPiratesTerrainTileEntity from "../entities/terrains/DeepSeaMediumPiratesTerrainTileEntity";
import DeepSeaSmallPiratesTerrainTileEntity from "../entities/terrains/DeepSeaSmallPiratesTerrainTileEntity";
import DeepSeaTerrainTileEntity from "../entities/terrains/DeepSeaTerrainTileEntity";
import DenseForestTerrainTileEntity from "../entities/terrains/DenseForestTerrainTileEntity";
import ForestTerrainTileEntity from "../entities/terrains/ForestTerrainTileEntity";
import GemsVeinTerrainTileEntity from "../entities/terrains/GemsVeinTerrainTileEntity";
import GoldVeinTerrainTileEntity from "../entities/terrains/GoldVeinTerrainTileEntity";
import GrasslandTerrainTileEntity from "../entities/terrains/GrasslandTerrainTileEntity";
import HillsTerrainTileEntity from "../entities/terrains/HillsTerrainTileEntity";
import MountainsTerrainTileEntity from "../entities/terrains/MountainsTerrainTileEntity";
import OldForestTerrainTileEntity from "../entities/terrains/OldForestTerrainTileEntity";
import River10TerrainTileEntity from "../entities/terrains/River10TerrainTileEntity";
import River11TerrainTileEntity from "../entities/terrains/River11TerrainTileEntity";
import River12TerrainTileEntity from "../entities/terrains/River12TerrainTileEntity";
import River13TerrainTileEntity from "../entities/terrains/River13TerrainTileEntity";
import River14TerrainTileEntity from "../entities/terrains/River14TerrainTileEntity";
import River15TerrainTileEntity from "../entities/terrains/River15TerrainTileEntity";
import River3TerrainTileEntity from "../entities/terrains/River3TerrainTileEntity";
import River5TerrainTileEntity from "../entities/terrains/River5TerrainTileEntity";
import River6TerrainTileEntity from "../entities/terrains/River6TerrainTileEntity";
import River7TerrainTileEntity from "../entities/terrains/River7TerrainTileEntity";
import River9TerrainTileEntity from "../entities/terrains/River9TerrainTileEntity";
import RiverDelta1TerrainTileEntity from "../entities/terrains/RiverDelta1TerrainTileEntity";
import RiverDelta2TerrainTileEntity from "../entities/terrains/RiverDelta2TerrainTileEntity";
import RiverDelta4TerrainTileEntity from "../entities/terrains/RiverDelta4TerrainTileEntity";
import RiverDelta8TerrainTileEntity from "../entities/terrains/RiverDelta8TerrainTileEntity";
import RiverSpring1TerrainTileEntity from "../entities/terrains/RiverSpring1TerrainTileEntity";
import RiverSpring2TerrainTileEntity from "../entities/terrains/RiverSpring2TerrainTileEntity";
import RiverSpring4TerrainTileEntity from "../entities/terrains/RiverSpring4TerrainTileEntity";
import RiverSpring8TerrainTileEntity from "../entities/terrains/RiverSpring8TerrainTileEntity";
import SettlementCastleLevel1TerrainTileEntity from "../entities/terrains/SettlementCastleLevel1TerrainTileEntity";
import SettlementCastleLevel2TerrainTileEntity from "../entities/terrains/SettlementCastleLevel2TerrainTileEntity";
import SettlementCastleLevel3TerrainTileEntity from "../entities/terrains/SettlementCastleLevel3TerrainTileEntity";
import SettlementCastleLevel4TerrainTileEntity from "../entities/terrains/SettlementCastleLevel4TerrainTileEntity";
import SettlementCastleLevel5TerrainTileEntity from "../entities/terrains/SettlementCastleLevel5TerrainTileEntity";
import SettlementEmptyTerrainTileEntity from "../entities/terrains/SettlementEmptyTerrainTileEntity";
import ShallowSeaMediumFishTerrainTileEntity from "../entities/terrains/ShallowSeaMediumFishTerrainTileEntity";
import ShallowSeaRocksTerrainTileEntity from "../entities/terrains/ShallowSeaRocksTerrainTileEntity";
import ShallowSeaSmallFishTerrainTileEntity from "../entities/terrains/ShallowSeaSmallFishTerrainTileEntity";
import ShallowSeaSmallPiratesTerrainTileEntity from "../entities/terrains/ShallowSeaSmallPiratesTerrainTileEntity";
import ShallowSeaTerrainTileEntity from "../entities/terrains/ShallowSeaTerrainTileEntity";
import SwampTerrainTileEntity from "../entities/terrains/SwampTerrainTileEntity";
import type TileEntity from "../entities/TileEntity";

const map = new Map<TerrainType, typeof TileEntity>();

// Terrain entities
map.set(
	BanditCampLargeTerrainTileEntity.terrainType,
	BanditCampLargeTerrainTileEntity,
);
map.set(
	BanditCampMediumTerrainTileEntity.terrainType,
	BanditCampMediumTerrainTileEntity,
);
map.set(
	BanditCampSmallTerrainTileEntity.terrainType,
	BanditCampSmallTerrainTileEntity,
);
map.set(
	DeepSeaBigFishTerrainTileEntity.terrainType,
	DeepSeaBigFishTerrainTileEntity,
);
map.set(
	DeepSeaMediumFishTerrainTileEntity.terrainType,
	DeepSeaMediumFishTerrainTileEntity,
);
map.set(
	DeepSeaMediumPiratesTerrainTileEntity.terrainType,
	DeepSeaMediumPiratesTerrainTileEntity,
);
map.set(
	DeepSeaMediumPiratesTerrainTileEntity.terrainType,
	DeepSeaMediumPiratesTerrainTileEntity,
);
map.set(
	DeepSeaSmallPiratesTerrainTileEntity.terrainType,
	DeepSeaSmallPiratesTerrainTileEntity,
);
map.set(DeepSeaTerrainTileEntity.terrainType, DeepSeaTerrainTileEntity);
map.set(DenseForestTerrainTileEntity.terrainType, DenseForestTerrainTileEntity);
map.set(ForestTerrainTileEntity.terrainType, ForestTerrainTileEntity);
map.set(GemsVeinTerrainTileEntity.terrainType, GemsVeinTerrainTileEntity);
map.set(GoldVeinTerrainTileEntity.terrainType, GoldVeinTerrainTileEntity);
map.set(GrasslandTerrainTileEntity.terrainType, GrasslandTerrainTileEntity);
map.set(HillsTerrainTileEntity.terrainType, HillsTerrainTileEntity);
map.set(MountainsTerrainTileEntity.terrainType, MountainsTerrainTileEntity);
map.set(OldForestTerrainTileEntity.terrainType, OldForestTerrainTileEntity);
map.set(River10TerrainTileEntity.terrainType, River10TerrainTileEntity);
map.set(River11TerrainTileEntity.terrainType, River11TerrainTileEntity);
map.set(River12TerrainTileEntity.terrainType, River12TerrainTileEntity);
map.set(River13TerrainTileEntity.terrainType, River13TerrainTileEntity);
map.set(River14TerrainTileEntity.terrainType, River14TerrainTileEntity);
map.set(River15TerrainTileEntity.terrainType, River15TerrainTileEntity);
map.set(River3TerrainTileEntity.terrainType, River3TerrainTileEntity);
map.set(River5TerrainTileEntity.terrainType, River5TerrainTileEntity);
map.set(River6TerrainTileEntity.terrainType, River6TerrainTileEntity);
map.set(River7TerrainTileEntity.terrainType, River7TerrainTileEntity);
map.set(River9TerrainTileEntity.terrainType, River9TerrainTileEntity);
map.set(RiverDelta1TerrainTileEntity.terrainType, RiverDelta1TerrainTileEntity);
map.set(RiverDelta2TerrainTileEntity.terrainType, RiverDelta2TerrainTileEntity);
map.set(RiverDelta4TerrainTileEntity.terrainType, RiverDelta4TerrainTileEntity);
map.set(RiverDelta8TerrainTileEntity.terrainType, RiverDelta8TerrainTileEntity);
map.set(
	RiverSpring1TerrainTileEntity.terrainType,
	RiverSpring1TerrainTileEntity,
);
map.set(
	RiverSpring2TerrainTileEntity.terrainType,
	RiverSpring2TerrainTileEntity,
);
map.set(
	RiverSpring4TerrainTileEntity.terrainType,
	RiverSpring4TerrainTileEntity,
);
map.set(
	RiverSpring8TerrainTileEntity.terrainType,
	RiverSpring8TerrainTileEntity,
);
map.set(
	SettlementCastleLevel1TerrainTileEntity.terrainType,
	SettlementCastleLevel1TerrainTileEntity,
);
map.set(
	SettlementCastleLevel2TerrainTileEntity.terrainType,
	SettlementCastleLevel2TerrainTileEntity,
);
map.set(
	SettlementCastleLevel3TerrainTileEntity.terrainType,
	SettlementCastleLevel3TerrainTileEntity,
);
map.set(
	SettlementCastleLevel4TerrainTileEntity.terrainType,
	SettlementCastleLevel4TerrainTileEntity,
);
map.set(
	SettlementCastleLevel5TerrainTileEntity.terrainType,
	SettlementCastleLevel5TerrainTileEntity,
);
map.set(
	SettlementEmptyTerrainTileEntity.terrainType,
	SettlementEmptyTerrainTileEntity,
);
map.set(
	ShallowSeaMediumFishTerrainTileEntity.terrainType,
	ShallowSeaMediumFishTerrainTileEntity,
);
map.set(
	ShallowSeaRocksTerrainTileEntity.terrainType,
	ShallowSeaRocksTerrainTileEntity,
);
map.set(
	ShallowSeaSmallFishTerrainTileEntity.terrainType,
	ShallowSeaSmallFishTerrainTileEntity,
);
map.set(
	ShallowSeaSmallPiratesTerrainTileEntity.terrainType,
	ShallowSeaSmallPiratesTerrainTileEntity,
);
map.set(ShallowSeaTerrainTileEntity.terrainType, ShallowSeaTerrainTileEntity);
map.set(SwampTerrainTileEntity.terrainType, SwampTerrainTileEntity);

// POI entities

// TODO: rename + rename file
export const getTerrainTileEntity = (
	type: TerrainType,
): typeof TileEntity | null => (map.has(type) ? map.get(type)! : null);

// TODO: rename + rename file
export const createTerrainTileEntity = (
	type: TerrainType,
	coordinates: TileEntityCoordinates,
	api: TileEntityParamsApi,
): TileEntity | null => {
	const entity = getTerrainTileEntity(type);
	return entity ? new entity(coordinates, api) : null;
};
