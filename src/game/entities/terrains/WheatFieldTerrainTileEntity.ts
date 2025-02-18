import { TerrainType } from "../config";
import TileEntity from "../TileEntity";

class WheatFieldTerrainTileEntity extends TileEntity {
	public static readonly terrainType = TerrainType.WHEAT_FIELD;
}

export default WheatFieldTerrainTileEntity;
