import { TerrainType } from "../config";
import TileEntity from "../TileEntity";

class SettlementEmptyTerrainTileEntity extends TileEntity {
	public static readonly terrainType = TerrainType.SETTLEMENT_EMPTY;
}

export default SettlementEmptyTerrainTileEntity;
