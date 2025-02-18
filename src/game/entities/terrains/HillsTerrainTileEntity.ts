import { TerrainType } from "../config";
import TileEntity from "../TileEntity";

class HillsTerrainTileEntity extends TileEntity {
	public static readonly terrainType = TerrainType.HILLS;
}

export default HillsTerrainTileEntity;
