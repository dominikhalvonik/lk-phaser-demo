import { TerrainType } from "../config";
import TileEntity from "../TileEntity";

class ShallowSeaTerrainTileEntity extends TileEntity {
	public static readonly terrainType = TerrainType.SHALLOW_SEA;
}

export default ShallowSeaTerrainTileEntity;
